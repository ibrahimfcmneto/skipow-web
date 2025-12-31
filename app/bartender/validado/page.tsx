'use client'

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Poppins } from 'next/font/google';
import { Check } from "lucide-react";

const poppins = Poppins({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
});

function ConteudoValidado() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Pega o nome do produto da URL
  const produto = searchParams.get('produto') || "Produto Desconhecido";
  
  // Estado para guardar a hora
  const [horaExibida, setHoraExibida] = useState("");

  const handleProximo = () => {
    router.replace("/bartender/ler-qr"); 
  };

  useEffect(() => {
    // 1. CORREÇÃO DA HORA: Pega a hora do SEU celular/computador
    // Isso garante que o horário esteja sempre certo para quem está usando
    const now = new Date();
    const timeString = now.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    setHoraExibida(timeString);

    // 2. TEMPO DE TELA: Aumentado para 2.5 segundos (2500ms)
    const timer = setTimeout(() => {
      handleProximo();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      onClick={handleProximo} // Mantém o clique para pular
      className={`min-h-screen bg-[#40BB43] flex flex-col items-center justify-center relative cursor-pointer ${poppins.className}`}
    >
      
      {/* Barra de progresso visual (Ajustada para 2.5s) */}
      <div 
        className="absolute top-0 left-0 h-2 bg-white/30 w-full animate-[shrink_2.5s_linear_forwards]" 
        style={{ animationDuration: '2500ms' }} 
      />

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

        {/* Nome do Produto */}
        <h2 className="text-white text-[42px] font-medium tracking-tight mb-20 text-center leading-tight break-words max-w-md">
          {produto}
        </h2>

        {/* Detalhes */}
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

      {/* Animação CSS */}
      <style jsx global>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>

    </div>
  );
}

export default function ValidadoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#40BB43] flex items-center justify-center text-white text-2xl font-bold">CARREGANDO...</div>}>
      <ConteudoValidado />
    </Suspense>
  )
}