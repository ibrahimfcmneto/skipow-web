'use client'

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import jsQR from "jsqr"
import { ArrowLeft, ScanLine } from "lucide-react"
import { validarFicha } from "@/app/actions/bartender"

export default function LerQRPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()
  
  const scanningLock = useRef(false) 
  const [status, setStatus] = useState("Posicione o código no centro")

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

    // 2. Loop de Leitura
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
            if (navigator.vibrate) navigator.vibrate(50);
            
            console.log("Código capturado:", code.data)
            verificarNoBanco(code.data)
          }
        }
      }
      requestAnimationFrame(tick)
    }

    // 3. Conversa com o Servidor
    async function verificarNoBanco(codigoLido: string) {
      setStatus("Processando...") 

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
        alert("Erro de conexão.")
        scanningLock.current = false 
        setStatus("Posicione o código no centro")
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
    <div className="relative h-screen w-screen bg-black overflow-hidden flex flex-col">
      
      {/* VÍDEO DE FUNDO */}
      <video 
        ref={videoRef} 
        className="absolute inset-0 w-full h-full object-cover z-0" 
        muted 
        playsInline 
      />
      <canvas ref={canvasRef} className="hidden" /> 

      {/* INTERFACE (Z-INDEX SUPERIOR) */}
      <div className="relative z-10 w-full h-full flex flex-col">
        
        {/* TOPO: Botão Voltar e Título */}
        <div className="pt-12 px-6 pb-4 flex items-center w-full bg-gradient-to-b from-black/80 to-transparent">
          
          {/* BOTÃO DE VOLTAR - ATUALIZADO */}
          <button 
            onClick={() => router.push('/bartender/scanner')} 
            className="p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/30 active:scale-95 transition-all mr-5 hover:bg-black/80 shadow-lg"
          >
            {/* Seta branca e mais grossa */}
            <ArrowLeft className="text-white w-7 h-7" strokeWidth={2.5} />
          </button>

          <div className="flex flex-col">
            <h1 className="text-white font-bold text-lg leading-none drop-shadow-md">Scanner</h1>
            <p className="text-white/80 text-xs font-medium drop-shadow-md">Ler Ficha Skipow</p>
          </div>
        </div>

        {/* CENTRO: Área de Foco */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-10">
            
            {/* Quadrado de Leitura */}
            <div className="relative w-80 h-80 rounded-[30px] shadow-[0_0_0_9999px_rgba(0,0,0,0.85)] flex items-center justify-center overflow-hidden">
                
                {/* Cantos Verdes Neon */}
                <div className="absolute top-0 left-0 w-12 h-12 border-l-[3px] border-t-[3px] border-[#40BB43] rounded-tl-[20px] m-1"></div>
                <div className="absolute top-0 right-0 w-12 h-12 border-r-[3px] border-t-[3px] border-[#40BB43] rounded-tr-[20px] m-1"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-l-[3px] border-b-[3px] border-[#40BB43] rounded-bl-[20px] m-1"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-r-[3px] border-b-[3px] border-[#40BB43] rounded-br-[20px] m-1"></div>

                {/* Laser de Escaneamento */}
                <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#40BB43] to-transparent animate-[scan_2s_ease-in-out_infinite] shadow-[0_0_15px_#40BB43]"></div>

                {/* Ícone Central Sutil */}
                <ScanLine className="text-white/20 w-16 h-16 animate-pulse" strokeWidth={1} />
            </div>

            {/* Texto de Status */}
            <div className="mt-8 px-5 py-2.5 bg-neutral-900/80 backdrop-blur-md rounded-full border border-white/5 shadow-lg">
                <p className="text-[#40BB43] font-mono text-sm font-semibold tracking-wide flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-[#40BB43] animate-pulse"></span>
                   {status}
                </p>
            </div>

        </div>

        {/* RODAPÉ */}
        <div className="pb-8 text-center px-10">
            <p className="text-white/40 text-xs">
                Mantenha a câmera estável e garanta boa iluminação.
            </p>
        </div>
      
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { top: 10%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }
      `}</style>
    </div>
  )
}