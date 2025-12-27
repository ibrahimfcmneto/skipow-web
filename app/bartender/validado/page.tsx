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

  // Função para voltar ao scanner
  const handleProximo = () => {
    // Certifique-se de que este é o caminho correto da sua página de câmera
    router.replace("/bartender/scanner"); 
  };

  useEffect(() => {
    // 1. Define a hora atual
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setHoraAtual(`${hours}:${minutes}`);

    // 2. Cria o temporizador para voltar automaticamente
    // 1500ms (1.5 segundos) é um bom tempo: dá para ler e não demora muito
    const timer = setTimeout(() => {
      handleProximo();
    }, 1500);

    // Limpa o timer se o usuário sair da tela ou clicar antes do tempo (evita erros)
    return () => clearTimeout(timer);
  }, []); // Array vazio garante que rode apenas ao montar a tela

  return (
    <main 
      onClick={handleProximo}
      className={`min-h-screen bg-[#40BB43] flex flex-col items-center justify-center relative cursor-pointer ${poppins.className}`}
    >
      
      {/* Barra de progresso visual (Opcional - dá a sensação de agilidade) */}
      <div className="absolute top-0 left-0 h-2 bg-white/30 w-full animate-[shrink_1.5s_linear_forwards]" style={{ animationDuration: '1500ms' }} />

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
          Nome Produto
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

      {/* Dica atualizada */}
      <div className="absolute bottom-8 text-white/60 text-sm font-medium">
        Redirecionando... (ou toque para acelerar)
      </div>

      {/* Adicione isso no seu globals.css para a barra de progresso funcionar, ou remova a div da barra se não quiser */}
      <style jsx global>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>

    </main>
  );
}