'use client'

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Poppins } from 'next/font/google';
import { Check } from "lucide-react";

const poppins = Poppins({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
});

// Criamos um componente interno para lidar com a busca de dados
function ConteudoValidado() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // 1. Pega os dados da URL (enviados pelo scanner)
  const produto = searchParams.get('produto') || "Produto Desconhecido";
  const horaURL = searchParams.get('hora'); // Pega a hora exata da validação

  const [horaExibida, setHoraExibida] = useState("");

  const handleProximo = () => {
    router.replace("/bartender/ler-qr"); 
  };

  useEffect(() => {
    // Se veio hora na URL usa ela, senão pega a hora de agora
    if (horaURL) {
      setHoraExibida(horaURL);
    } else {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setHoraExibida(`${hours}:${minutes}`);
    }

    // Timer automático: espera 1.5s e volta
    const timer = setTimeout(() => {
      handleProximo();
    }, 1500);

    return () => clearTimeout(timer);
  }, [horaURL]); // Executa quando carregar

  return (
    <div 
      onClick={handleProximo}
      className={`min-h-screen bg-[#40BB43] flex flex-col items-center justify-center relative cursor-pointer ${poppins.className}`}
    >
      
      {/* Barra de progresso visual */}
      <div className="absolute top-0 left-0 h-2 bg-white/30 w-full animate-[shrink_1.5s_linear_forwards]" style={{ animationDuration: '1500ms' }} />

      {/* Conteúdo Centralizado */}
      <div className="flex flex-col items-center animate-in zoom-in duration-300 px-4">
        
        {/* Ícone Check Gigante */}
        <div className="mb-6">
            <Check size={140} strokeWidth={3} className="text-white drop-shadow-md" />
        </div>

        {/* Texto VÁLIDO */}
        <h1 className="text-white text-[48px] font-extrabold tracking-wider uppercase mb-8 drop-shadow-sm">
          VÁLIDO!
        </h1>

        {/* Nome do Produto (DINÂMICO AGORA) */}
        <h2 className="text-white text-[42px] font-medium tracking-tight mb-20 text-center leading-tight break-words max-w-md">
          {produto}
        </h2>

        {/* Detalhes (Fundo Inferior) */}
        <div className="text-center space-y-1 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
            <p className="text-[#1D1D1F] text-[18px] font-medium">
               Horário validado: {horaExibida}
            </p>
        </div>

      </div>

      {/* Dica de usabilidade */}
      <div className="absolute bottom-8 text-white/60 text-sm font-medium">
        Voltando para a câmera... (toque para pular)
      </div>

      {/* Estilo local para a animação da barra */}
      <style jsx global>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>

    </div>
  );
}

// Exportação Principal com Suspense (Obrigatório para usar useSearchParams)
export default function ValidadoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#40BB43] flex items-center justify-center text-white text-2xl font-bold">CARREGANDO...</div>}>
      <ConteudoValidado />
    </Suspense>
  )
}