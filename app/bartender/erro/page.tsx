'use client'

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Poppins } from 'next/font/google';
import { X } from "lucide-react"; // Importamos o X

const poppins = Poppins({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
});

function ConteudoErro() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Pega a mensagem de erro vinda do scanner ou usa um padrão
  const mensagemErro = searchParams.get('motivo') || "Esta ficha não é válida.";
  const detalheErro = searchParams.get('detalhe') || "Não entregue a bebida";

  const handleProximo = () => {
    router.replace("/bartender/ler-qr"); 
  };

  useEffect(() => {
    // Timer um pouco maior para erro (3.5s) para o bartender ler com calma
    const timer = setTimeout(() => {
      handleProximo();
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      onClick={handleProximo}
      className={`min-h-screen bg-[#DC2626] flex flex-col items-center justify-center relative cursor-pointer ${poppins.className}`}
    >
      
      {/* Barra de progresso visual (3.5s) */}
      <div 
        className="absolute top-0 left-0 h-2 bg-white/30 w-full animate-[shrink_3.5s_linear_forwards]" 
        style={{ animationDuration: '3500ms' }} 
      />

      <div className="flex flex-col items-center animate-in zoom-in duration-300 px-6 text-center">
        
        {/* Ícone X Gigante */}
        <div className="mb-6">
            <X size={140} strokeWidth={3} className="text-white drop-shadow-md" />
        </div>

        {/* Título Principal */}
        <h1 className="text-white text-[42px] font-extrabold tracking-wider uppercase mb-8 drop-shadow-sm leading-none">
          JÁ UTILIZADA
        </h1>

        {/* Mensagem secundária (Motivo exato) */}
        <h2 className="text-white text-[22px] font-medium tracking-tight mb-2 leading-tight max-w-md">
          {mensagemErro}
        </h2>

        {/* Comando final */}
        <p className="text-white/80 text-[20px] font-medium mt-4">
            {detalheErro}
        </p>

      </div>

      {/* Dica de usabilidade */}
      <div className="absolute bottom-8 text-white/60 text-sm font-medium">
        Toque para voltar
      </div>

      <style jsx global>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>

    </div>
  );
}

export default function ErroPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#DC2626] flex items-center justify-center text-white font-bold">CARREGANDO...</div>}>
      <ConteudoErro />
    </Suspense>
  )
}