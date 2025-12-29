'use client'

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import jsQR from "jsqr"
import { validarFicha } from "@/app/actions/bartender" // Importamos o cérebro!

export default function LerQRPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [lendo, setLendo] = useState(true) // Para não ler o mesmo código 10x seguidas
  const router = useRouter()

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return

    // Iniciar Câmera
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        video.srcObject = stream
        video.play()
        requestAnimationFrame(tick)
      })
      .catch((err) => console.error("Erro na câmera:", err))

    function tick() {
      if (!video || !canvas || !ctx) return

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.height = video.videoHeight
        canvas.width = video.videoWidth
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        })

        if (code && code.data && lendo) {
          // --- AQUI ESTA A MÁGICA ---
          console.log("Código encontrado:", code.data)
          verificarNoBanco(code.data) // Chama a função que fala com o banco
        }
      }
      if (lendo) requestAnimationFrame(tick)
    }

    // Função que conversa com a Server Action
    async function verificarNoBanco(codigoLido: string) {
      setLendo(false) // Pausa a leitura para não validar 2 vezes

      try {
        // Chama o servidor (Bartender Action)
        const resultado = await validarFicha(codigoLido)

        if (resultado.sucesso) {
          // SE O BANCO DISSE OK -> Vai para a tela verde
          router.push(`/bartender/validado?produto=${resultado.produto}&hora=${resultado.hora}`)
        } else {
          // SE O BANCO DISSE ERRO -> Mostra alerta e volta a ler
          alert(`❌ NEGADO: ${resultado.erro}\n${resultado.detalhe || ''}`)
          setTimeout(() => setLendo(true), 2000) // Espera 2s para tentar de novo
        }
      } catch (error) {
        alert("Erro de conexão. Tente novamente.")
        setLendo(true)
      }
    }

  }, [lendo, router]) // Dependências do useEffect

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-xl font-bold mb-4">Aponte para o QR Code</h1>
      
      {/* O vídeo fica escondido, o canvas mostra a imagem processada (opcional) ou vice-versa */}
      <div className="relative w-full max-w-sm aspect-square overflow-hidden rounded-xl border-2 border-emerald-500">
        <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" muted playsInline />
        <canvas ref={canvasRef} className="hidden" /> {/* Canvas escondido, usado só pra leitura */}
      </div>

      <p className="mt-4 text-gray-400 text-sm">Procurando fichas...</p>
    </div>
  )
}