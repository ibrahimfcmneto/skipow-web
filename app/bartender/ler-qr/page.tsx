'use client'

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import jsQR from "jsqr"
import { validarFicha } from "@/app/actions/bartender"

export default function LerQRPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()
  
  // Usamos Ref para o bloqueio porque é INSTANTÂNEO (State tem delay)
  const scanningLock = useRef(false) 
  const [status, setStatus] = useState("Procurando fichas...")

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return

    // 1. Iniciar Câmera
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        video.srcObject = stream
        // O atributo playsInline é crucial para iOS
        video.setAttribute("playsinline", "true") 
        video.play()
        requestAnimationFrame(tick)
      })
      .catch((err) => console.error("Erro na câmera:", err))

    // 2. O Loop Infinito (Tick)
    function tick() {
      // Se o componente morreu ou se JÁ ESTAMOS PROCESSANDO, para tudo.
      if (!video || !canvas || !ctx) return
      
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.height = video.videoHeight
        canvas.width = video.videoWidth
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        
        // Só tenta ler se NÃO estivermos travados processando uma ficha
        if (!scanningLock.current) {
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
          })

          if (code && code.data) {
            // --- AQUI ESTA A CORREÇÃO ---
            // Trava IMEDIATAMENTE para não ler o próximo frame
            scanningLock.current = true 
            
            console.log("Código capturado:", code.data)
            verificarNoBanco(code.data)
          }
        }
      }
      
      // Continua o loop
      requestAnimationFrame(tick)
    }

    // 3. Função que conversa com o Servidor
    async function verificarNoBanco(codigoLido: string) {
      setStatus("Verificando...") // Feedback visual simples

      try {
        const resultado = await validarFicha(codigoLido)

        if (resultado.sucesso) {
          // SUCESSO: Redireciona
          // (Não destravamos o lock aqui, pois vamos sair da página)
          router.push(`/bartender/validado?produto=${resultado.produto}&hora=${resultado.hora}`)
        } else {
          // ERRO: Mostra alerta e DESTRAVA depois
          alert(`❌ NEGADO: ${resultado.erro}\n${resultado.detalhe || ''}`)
          
          // Espera um pouco antes de deixar ler de novo (para não virar metralhadora de alerta)
          setStatus("Aguardando...")
          setTimeout(() => {
            setStatus("Procurando fichas...")
            scanningLock.current = false // <--- LIBERA A TRAVA
          }, 2000)
        }
      } catch (error) {
        console.error(error)
        alert("Erro de conexão. Tente novamente.")
        scanningLock.current = false // Libera em caso de erro crítico
        setStatus("Procurando fichas...")
      }
    }

    // Cleanup: Para a câmera se sair da página
    return () => {
      scanningLock.current = true // Garante que pare de ler
      if (video.srcObject) {
        const stream = video.srcObject as MediaStream
        stream.getTracks().forEach(track => track.stop())
      }
    }

  }, [router]) 

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-xl font-bold mb-4">Aponte para o QR Code</h1>
      
      <div className="relative w-full max-w-sm aspect-square overflow-hidden rounded-xl border-4 border-emerald-500 shadow-2xl shadow-emerald-500/20">
        <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" muted playsInline />
        {/* O canvas fica escondido, ele é o cérebro visual, o vídeo é o que você vê */}
        <canvas ref={canvasRef} className="hidden" /> 
        
        {/* Mira Central (Cosmético) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-48 h-48 border-2 border-white/50 rounded-lg"></div>
        </div>
      </div>

      <p className="mt-6 text-emerald-400 font-mono animate-pulse">{status}</p>
    </div>
  )
}