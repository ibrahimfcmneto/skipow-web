"use client";

import { useState, FormEvent } from "react"; // Adicionei FormEvent
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Poppins } from 'next/font/google';
import { ChevronDown } from "lucide-react";

// Configuração da fonte
const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export default function BartenderLoginPage() {
  const router = useRouter();
  
  const [codigoEvento, setCodigoEvento] = useState("");
  const [pinBar, setPinBar] = useState("");
  const [local, setLocal] = useState("Bar de corote"); 

  // CORREÇÃO AQUI: Tipando o evento 'e' como FormEvent
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    
    // Simulação de validação
    console.log("Login realizado:", { codigoEvento, pinBar, local });
    
    router.push("/bartender/scanner"); 
  };

  return (
    <main className={`min-h-screen bg-white flex flex-col items-center relative ${poppins.className} text-[#1D1D1F]`}>
      
      <div className="w-full max-w-md px-8 pt-12 flex flex-col items-center text-center z-10">
        <div className="relative w-40 h-12 mb-6">
          <Image 
            src="/logo-skipow.png" 
            alt="Skipow" 
            fill 
            className="object-contain" 
            priority
          />
        </div>

        <h1 className="text-[42px] font-bold leading-tight mb-4 tracking-tight">
          Área do Bar
        </h1>

        <p className="text-[15px] text-gray-500 max-w-[280px] leading-relaxed">
          Acesse com o código do evento e o PIN do bar para validar fichas.
        </p>
      </div>

      <div className="w-full max-w-md px-8 mt-8 z-10 pb-40">
        <form onSubmit={handleLogin} className="space-y-5">
          
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">
              Codigo do evento
            </label>
            <input 
              type="text" 
              placeholder="Código do evento"
              value={codigoEvento}
              onChange={(e) => setCodigoEvento(e.target.value)}
              className="w-full h-14 bg-[#D9D9D9]/60 rounded-xl px-5 text-[16px] text-gray-700 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#40BB43]/50 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">
              Pin do bar
            </label>
            <input 
              type="password" 
              placeholder="Digite o pin do bar"
              value={pinBar}
              onChange={(e) => setPinBar(e.target.value)}
              className="w-full h-14 bg-[#D9D9D9]/60 rounded-xl px-5 text-[16px] text-gray-700 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#40BB43]/50 transition-all"
            />
          </div>

          <div className="space-y-1.5 relative">
            <div className="flex justify-between pl-1">
               <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                 Local
               </label>
               <span className="text-[11px] font-medium text-gray-400 italic">
                 *Opcional
               </span>
            </div>
            
            <div className="relative">
              <select 
                value={local}
                onChange={(e) => setLocal(e.target.value)}
                className="w-full h-14 bg-[#D9D9D9]/60 rounded-xl px-5 text-[16px] text-gray-700 outline-none appearance-none focus:ring-2 focus:ring-[#40BB43]/50 transition-all cursor-pointer"
              >
                <option value="Bar de corote">Bar de corote</option>
                <option value="Bar de latas">Bar de latas</option>
                <option value="Bar de copão">Bar de copão</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800 pointer-events-none">
                <ChevronDown size={24} strokeWidth={2.5} />
              </div>
            </div>
          </div>

          <p className="text-center text-[12px] text-gray-400 pt-2">
            Códigos fornecidos pelo organizador do evento.
          </p>

          <button 
            type="submit"
            className="w-full h-14 bg-[#40BB43] hover:bg-[#36a539] text-white font-bold text-[18px] rounded-xl shadow-lg shadow-green-200 transition-transform active:scale-[0.98] mt-2"
          >
            Entrar
          </button>

        </form>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-48 overflow-hidden z-0 flex items-end justify-center">
         <div className="absolute bottom-0 w-full h-full">
            <svg 
              viewBox="0 0 375 150" 
              preserveAspectRatio="none" 
              className="w-full h-full"
            >
              <path 
                d="M0,150 L0,120 Q187.5,0 375,120 L375,150 Z" 
                fill="#40BB43" 
              />
            </svg>
         </div>

         <div className="relative z-10 text-center pb-6 px-6">
            <p className="text-[#1D1D1F] font-semibold text-[14px] mb-1">
              Precisa de ajuda?
            </p>
            <p className="text-[#1D1D1F] font-semibold text-[14px]">
              Fale com o responsável pelo evento.
            </p>
            <p className="text-[#1D1D1F]/60 text-[10px] mt-3">
              © Skipow — Plataforma de consumo para eventos
            </p>
         </div>
      </div>

    </main>
  );
}