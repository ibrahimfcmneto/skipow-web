"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Poppins } from 'next/font/google';
import { Check } from "lucide-react";

const poppins = Poppins({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
});

export default function ValidadoPage() {
  const router = useRouter();
  const [horaAtual, setHoraAtual] = useState("");

  // Pega a hora real do momento da validação
  useEffect(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setHoraAtual(`${hours}:${minutes}`);
  }, []);

  // Função para voltar ao scanner e ler o próximo
  const handleProximo = () => {
    router.replace("/bartender/scanner"); // ou /bartender/ler-qr se quiser abrir a camera direto
  };

  return (
    <main 
      onClick={handleProximo}
      className={`min-h-screen bg-[#40BB43] flex flex-col items-center justify-center relative cursor-pointer ${poppins.className}`}
    >
      
      {/* Conteúdo Centralizado */}
      <div className="flex flex-col items-center animate-in zoom-in duration-300">
        
        {/* Ícone Check Gigante */}
        <div className="mb-6">
            <Check size={140} strokeWidth={3} className="text-white" />
        </div>

        {/* Texto VÁLIDO */}
        <h1 className="text-white text-[48px] font-extrabold tracking-wider uppercase mb-8 drop-shadow-sm">
          VÁLIDO!
        </h1>

        {/* Nome do Produto */}
        <h2 className="text-white text-[42px] font-medium tracking-tight mb-20 text-center leading-tight">
          Red Bull
        </h2>

        {/* Detalhes (Fundo Inferior) */}
        <div className="text-center space-y-1">
            <p className="text-[#1D1D1F] text-[18px] font-medium">
                Código: SKP-82A1
            </p>
            <p className="text-[#1D1D1F] text-[18px] font-medium">
                Horário validado: {horaAtual}
            </p>
        </div>

      </div>

      {/* Dica de usabilidade (Opcional, mas bom para o bartender saber) */}
      <div className="absolute bottom-8 text-white/60 text-sm font-medium">
        Toque na tela para validar o próximo
      </div>

    </main>
  );
}