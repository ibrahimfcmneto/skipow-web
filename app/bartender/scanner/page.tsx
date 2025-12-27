"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Poppins } from 'next/font/google';
import { Camera, ScanLine, History } from "lucide-react";

// Configuração da fonte
const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export default function BartenderScannerPage() {
  const router = useRouter();

  // Dados do evento
  const eventoNome = "De férias com a FACECA";

  // Função de Logout
  const handleLogout = () => {
    // Limparia sessão aqui
    router.push("/bartender/login");
  };

  return (
    <main className={`min-h-screen bg-white flex flex-col relative ${poppins.className} text-[#1D1D1F]`}>
      
      {/* 1. HEADER */}
      <header className="px-6 pt-8 pb-4 flex items-center justify-between">
        {/* Spacer esquerdo */}
        <div className="w-10"></div> 
        
        <div className="relative w-32 h-10">
          <Image 
            src="/logo_skipow_oficial_sem_fundo-removebg-preview.png" // Certifique-se que o nome do arquivo está correto na pasta public
            alt="Skipow" 
            fill 
            className="object-contain" 
            priority
          />
        </div>

        {/* Botão Sair */}
        <button 
          onClick={handleLogout}
          className="text-gray-400 font-medium text-[16px] hover:text-red-500 transition-colors w-10 text-right"
        >
          Sair
        </button>
      </header>

      {/* 2. CONTEÚDO PRINCIPAL */}
      <div className="flex-1 flex flex-col items-center px-6 pt-2 pb-32">
        
        {/* Títulos */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-[32px] font-extrabold tracking-tight mb-1 leading-tight">
            Área do Bar
          </h1>
          <p className="text-[16px] text-gray-600 font-medium">
            Evento: <span className="font-bold text-[#1D1D1F]">{eventoNome}</span>
          </p>
        </div>

        {/* Ícone QR Code (Ilustração Central) */}
        <div 
          className="flex-1 flex items-center justify-center w-full max-w-[280px] aspect-square mb-8 relative group cursor-pointer transition-transform active:scale-95"
          onClick={() => router.push("/bartender/ler-qr")}
        >
           {/* Efeito de "scan" decorativo */}
           <div className="absolute inset-0 border-2 border-[#40BB43]/20 rounded-[30px] animate-pulse"></div>
           
           <ScanLine 
             size={180} 
             strokeWidth={1.5} 
             className="text-[#40BB43] drop-shadow-sm" 
           />
        </div>

        {/* Botões de Ação */}
        <div className="w-full max-w-sm flex flex-col items-center gap-4">
          
          {/* Botão Principal: Validar */}
          <button 
            className="w-full bg-[#40BB43] hover:bg-[#36a539] text-white rounded-2xl h-16 flex items-center justify-center gap-3 text-[20px] font-bold shadow-[0_8px_20px_-5px_rgba(64,187,67,0.4)] transition-all active:scale-[0.98]"
            onClick={() => router.push("/bartender/ler-qr")}
          >
            <Camera size={26} strokeWidth={2.5} />
            Validar fichas
          </button>

          {/* Botão Secundário: Histórico (CORRIGIDO) */}
          <button 
            className="w-full bg-white hover:bg-gray-50 text-[#1D1D1F] border border-gray-200 rounded-xl h-12 flex items-center justify-center gap-2 text-[16px] font-semibold transition-all active:scale-[0.98] shadow-sm"
            onClick={() => router.push("/bartender/historico")} 
          >
            <History size={20} className="text-gray-400" />
            Ver histórico
          </button>

        </div>
      </div>

      {/* 3. RODAPÉ INFORMATIVO (Cinza) */}
      <div className="absolute bottom-0 w-full bg-[#F5F5F7] border-t border-gray-200 rounded-t-[30px] py-6 px-8 text-center pb-8">
        <p className="text-[#86868B] text-[13px] font-medium leading-relaxed max-w-xs mx-auto">
          Aponte a câmera para o QR Code do cliente para validar a ficha.
        </p>
      </div>

    </main>
  );
}