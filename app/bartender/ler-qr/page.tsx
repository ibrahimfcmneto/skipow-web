'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Scanner } from "@yudiel/react-qr-scanner" // O motor novo e rápido
import { ArrowLeft, ScanLine } from "lucide-react"
import { validarFicha } from "@/app/actions/bartender"

export default function LerQRPage() {
  const router = useRouter()
  const [bloqueado, setBloqueado] = useState(false) // Trava para não ler 2x
  const [status, setStatus] = useState("Posicione o código no centro")

  // Função que roda quando detecta um QR Code
  const handleScan = async (codigos) => {
    if (!codigos || codigos.length === 0 || bloqueado) return
    
    const codigoLido = codigos[0].rawValue
    setBloqueado(true) // Trava leitura
    
    // Feedback tátil
    if (navigator.vibrate) navigator.vibrate(50)
    
    setStatus("Processando...")

    try {
      const resultado = await validarFicha(codigoLido)

      if (resultado.sucesso) {
        if (navigator.vibrate) navigator.vibrate([50, 50, 50]); // Vibração de sucesso
        router.push(`/bartender/validado?produto=${resultado.produto}&hora=${resultado.hora}`)
      } else {
        if (navigator.vibrate) navigator.vibrate(200); // Vibração de erro
        const motivo = encodeURIComponent(resultado.erro || "Erro desconhecido")
        const detalhe = encodeURIComponent("Não entregue a bebida")
        router.push(`/bartender/erro?motivo=${motivo}&detalhe=${detalhe}`)
      }
    } catch (error) {
      console.error(error)
      alert("Erro de conexão.")
      setStatus("Posicione o código no centro")
      setBloqueado(false) // Destrava para tentar de novo
    }
  }

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden flex flex-col">
      
      {/* --- O NOVO MOTOR DE LEITURA (FICA NO FUNDO) --- */}
      <div className="absolute inset-0 w-full h-full z-0">
         <Scanner 
            onScan={handleScan}
            scanDelay={500} // O SEGREDO: Lê a cada 500ms (super leve)
            allowMultiple={true}
            components={{ 
                audio: false, // Desliga som nativo
                finder: false // Desliga a borda vermelha nativa (vamos usar a sua verde)
            }}
            styles={{
                container: { width: '100%', height: '100%' },
                video: { objectFit: 'cover' }
            }}
         />
      </div>

      {/* --- A SUA INTERFACE (FICA POR CIMA / Z-INDEX 10) --- */}
      <div className="relative z-10 w-full h-full flex flex-col pointer-events-none">
        {/* pointer-events-none deixa clicar no scanner se precisar, mas habilitamos pointer-events-auto nos botões */}
        
        {/* TOPO: Botão Voltar e Título */}
        <div className="pt-12 px-6 pb-4 flex items-center w-full bg-gradient-to-b from-black/80 to-transparent pointer-events-auto">
          <button 
            onClick={() => router.push('/bartender/scanner')} 
            className="p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/30 active:scale-95 transition-all mr-5 hover:bg-black/80 shadow-lg cursor-pointer"
          >
            <ArrowLeft className="text-white w-7 h-7" strokeWidth={2.5} />
          </button>

          <div className="flex flex-col">
            <h1 className="text-white font-bold text-lg leading-none drop-shadow-md">Scanner</h1>
            <p className="text-white/80 text-xs font-medium drop-shadow-md">Ler Ficha Skipow</p>
          </div>
        </div>

        {/* CENTRO: Área de Foco */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-10">
            
            {/* Quadrado de Leitura (Seu design original) */}
            <div className="relative w-80 h-80 rounded-[30px] shadow-[0_0_0_9999px_rgba(0,0,0,0.85)] flex items-center justify-center overflow-hidden">
                
                {/* Cantos Verdes Neon */}
                <div className="absolute top-0 left-0 w-12 h-12 border-l-[3px] border-t-[3px] border-[#40BB43] rounded-tl-[20px] m-1"></div>
                <div className="absolute top-0 right-0 w-12 h-12 border-r-[3px] border-t-[3px] border-[#40BB43] rounded-tr-[20px] m-1"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-l-[3px] border-b-[3px] border-[#40BB43] rounded-bl-[20px] m-1"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-r-[3px] border-b-[3px] border-[#40BB43] rounded-br-[20px] m-1"></div>

                {/* Laser de Escaneamento */}
                <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#40BB43] to-transparent animate-[scan_2s_ease-in-out_infinite] shadow-[0_0_15px_#40BB43]"></div>

                {/* Ícone Central Sutil */}
                <div className="opacity-50">
                    <ScanLine className="text-white/20 w-16 h-16 animate-pulse" strokeWidth={1} />
                </div>
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