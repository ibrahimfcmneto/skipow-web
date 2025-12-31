'use client'

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import jsQR from "jsqr"
import { ArrowLeft } from "lucide-react" // Ícone da seta
import { validarFicha } from "@/app/actions/bartender"

export default function LerQRPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()
  
  // Usamos Ref para o bloqueio porque é INSTANTÂNEO (State tem delay)
  const scanningLock = useRef(false) 
  const [status, setStatus] = useState("Aponte para o QR Code")

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
        video.setAttribute("playsinline", "true") 
        video.play()
        requestAnimationFrame(tick)
      })
      .catch((err) => console.error("Erro na câmera:", err))

    // 2. O Loop Infinito (Tick)
    function tick() {
      if (!video || !canvas || !ctx) return
      
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.height = video.videoHeight
        canvas.width = video.videoWidth
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        
        if (!scanningLock.current) {
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
          })

          if (code && code.data) {
            scanningLock.current = true 
            console.log("Código capturado:", code.data)
            verificarNoBanco(code.data)
          }
        }
      }
      requestAnimationFrame(tick)
    }

    // 3. Função que conversa com o Servidor
    async function verificarNoBanco(codigoLido: string) {
      setStatus("Verificando...") 

      try {
        const resultado = await validarFicha(codigoLido)

        if (resultado.sucesso) {
          router.push(`/bartender/validado?produto=${resultado.produto}&hora=${resultado.hora}`)
        } else {
          const motivo = encodeURIComponent(resultado.erro || "Erro desconhecido")
          const detalhe = encodeURIComponent("Não entregue a bebida")
          router.push(`/bartender/erro?motivo=${motivo}&detalhe=${detalhe}`)
        }
      } catch (error) {
        console.error(error)
        alert("Erro de conexão. Tente novamente.")
        scanningLock.current = false 
        setStatus("Aponte para o QR Code")
      }
    }

    return () => {
      scanningLock.current = true 
      if (video.srcObject) {
        const stream = video.srcObject as MediaStream
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [router]) 

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      
      {/* CAMADA 1: O Vídeo de Fundo (Ocupa tudo) */}
      <video 
        ref={videoRef} 
        className="absolute inset-0 w-full h-full object-cover z-0" 
        muted 
        playsInline 
      />
      <canvas ref={canvasRef} className="hidden" /> 

      {/* CAMADA 2: Interface e Máscara Escura */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        
        {/* Botão Voltar (Topo Esquerda) */}
        <div className="absolute top-6 left-6 z-50">
          <button 
            onClick={() => router.push('/bartender')} // Ajuste a rota se necessário
            className="bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/10 active:scale-95 transition-all"
          >
            <ArrowLeft className="text-white w-6 h-6" />
          </button>
        </div>

        {/* Texto Instrução */}
        <p className="text-white font-medium text-lg mb-8 drop-shadow-md tracking-wide">
            Escaneie a ficha
        </p>

        {/* ÁREA DE ESCANEAMENTO */}
        {/* O boxShadow aqui cria a máscara escura ao redor do quadrado transparente */}
        <div 
            className="relative w-72 h-72 rounded-3xl shadow-[0_0_0_9999px_rgba(0,0,0,0.8)]"
        >
            {/* Cantos Verdes (Brackets) */}
            
            {/* Canto Superior Esquerdo */}
            <div className="absolute top-0 left-0 w-10 h-10 border-l-[4px] border-t-[4px] border-[#40BB43] rounded-tl-xl -translate-x-1 -translate-y-1"></div>
            
            {/* Canto Superior Direito */}
            <div className="absolute top-0 right-0 w-10 h-10 border-r-[4px] border-t-[4px] border-[#40BB43] rounded-tr-xl translate-x-1 -translate-y-1"></div>
            
            {/* Canto Inferior Esquerdo */}
            <div className="absolute bottom-0 left-0 w-10 h-10 border-l-[4px] border-b-[4px] border-[#40BB43] rounded-bl-xl -translate-x-1 translate-y-1"></div>
            
            {/* Canto Inferior Direito */}
            <div className="absolute bottom-0 right-0 w-10 h-10 border-r-[4px] border-b-[4px] border-[#40BB43] rounded-br-xl translate-x-1 translate-y-1"></div>

            {/* Linha de Scanner (Animação opcional para dar vida) */}
            <div className="absolute w-full h-[2px] bg-[#40BB43]/50 animate-[scan_2s_infinite] top-0 shadow-[0_0_10px_#40BB43]"></div>
        </div>

        {/* Status Text (Abaixo) */}
        <div className="absolute bottom-20 px-6 py-2 bg-black/60 backdrop-blur-sm rounded-full">
             <p className="text-emerald-400 font-mono text-sm animate-pulse">{status}</p>
        </div>
      
      </div>

      {/* Animação da linha do scanner */}
      <style jsx>{`
        @keyframes scan {
          0% { top: 10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }
      `}</style>
    </div>
  )
}