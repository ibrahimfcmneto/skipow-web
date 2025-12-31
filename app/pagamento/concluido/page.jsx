"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
});

export default function ConcluidoPage() {
  const router = useRouter();
  const [status, setStatus] = useState("processando"); // Visual apenas

  useEffect(() => {
    // A compra JÁ FOI processada no Backend na tela anterior.
    // Esse timer serve apenas para dar um feedback visual de "Confirmação final"
    const timer = setTimeout(() => {
      setStatus("aprovado");
    }, 1500); // 1.5 segundos de charme

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className={`min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden ${poppins.className}`}>
      
      {status === "processando" ? (
        // --- TELA 1: FINALIZANDO ---
        <div className="flex flex-col items-center animate-in fade-in duration-500">
            {/* Logo */}
            <div className="mb-12 relative w-40 h-10">
                <Image src="/logo-skipow.png" alt="Skipow" fill className="object-contain" />
            </div>

            {/* Spinner Animado Customizado */}
            <div className="relative mb-10">
                <div className="w-20 h-20 border-4 border-gray-100 rounded-full"></div>
                <div className="w-20 h-20 border-4 border-[#40BB43] rounded-full border-t-transparent absolute top-0 left-0 animate-spin"></div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Validando...</h2>
            <p className="text-gray-500 text-sm">Confirmando transação</p>
        </div>
      ) : (
        // --- TELA 2: APROVADO ---
        <div className="w-full max-w-md px-8 flex flex-col items-center animate-in zoom-in-95 duration-500 z-10">
            
            {/* Logo */}
            <div className="mb-16 relative w-40 h-10">
                <Image src="/logo-skipow.png" alt="Skipow" fill className="object-contain" />
            </div>

            <h2 className="text-[28px] font-bold text-[#40BB43] mb-6 text-center leading-tight">
                Pagamento Aprovado!
            </h2>

            <p className="text-gray-600 text-center mb-12 leading-relaxed">
                Sua compra foi confirmada com sucesso. As fichas já estão disponíveis na sua carteira.
            </p>

            <button 
                onClick={() => router.push('/fichas')}
                className="w-full bg-[#40BB43] hover:bg-[#36a539] text-white font-bold rounded-[16px] py-4 text-[16px] shadow-lg shadow-green-200 transition-transform active:scale-[0.98] uppercase tracking-wide"
            >
                Ver Minhas Fichas
            </button>

            <p className="mt-16 text-center text-[18px] text-gray-900 font-medium">
                “Menos fila. <span className="text-[#40BB43] font-bold">Mais festa.</span>”
            </p>

        </div>
      )}

      {/* RODAPÉ ONDA VERDE */}
      <div className="fixed bottom-0 left-0 w-full h-32 pointer-events-none z-0">
          <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
              <path d="M0.00,49.98 Q250.00,150.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" className="fill-[#40BB43]"></path>
          </svg>
          <div className="absolute bottom-2 w-full text-center">
             <p className="text-[10px] text-white/40 mix-blend-plus-lighter">
               © Skipow — Plataforma de consumo
             </p>
          </div>
      </div>

    </main>
  );
}