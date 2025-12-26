"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Poppins } from 'next/font/google';

// Configuração da fonte
const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export default function OrganizerLoginPage() {
  const router = useRouter();
  
  // Estados dos inputs
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    
    // Aqui entraria a autenticação real com o backend
    console.log("Login Organizador:", { email, senha });
    
    // Redireciona para o Dashboard do Organizador (futura página)
    router.push("/organizador/dashboard"); 
  };

  return (
    <main className={`min-h-screen bg-white flex flex-col items-center relative ${poppins.className} text-[#1D1D1F]`}>
      
      {/* 1. LOGO E TÍTULOS */}
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
          Área do<br/>Organizador
        </h1>

        <p className="text-[15px] text-gray-500 max-w-[280px] leading-relaxed">
          Acesse com seu email e senha do organizador!
        </p>
      </div>

      {/* 2. FORMULÁRIO */}
      <div className="w-full max-w-md px-8 mt-10 z-10 pb-48">
        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* Input: E-MAIL */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">
              E-mail
            </label>
            <input 
              type="email" 
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 bg-[#D9D9D9]/60 rounded-xl px-5 text-[16px] text-gray-700 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#40BB43]/50 transition-all"
            />
          </div>

          {/* Input: SENHA */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">
              Senha
            </label>
            <input 
              type="password" 
              placeholder="Digite sua senha de adm"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full h-14 bg-[#D9D9D9]/60 rounded-xl px-5 text-[16px] text-gray-700 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#40BB43]/50 transition-all"
            />
          </div>

          {/* Botão Entrar */}
          <button 
            type="submit"
            className="w-full h-14 bg-[#40BB43] hover:bg-[#36a539] text-white font-bold text-[18px] rounded-xl shadow-lg shadow-green-200 transition-transform active:scale-[0.98] mt-4"
          >
            Entrar
          </button>

          {/* --- NOVO: LINK DE CRIAR CONTA --- */}
          <div className="text-center pt-2">
            <span className="text-[13px] text-gray-500 font-medium">Não possui conta ainda? </span>
            <Link href="/organizador/cadastro" className="text-[13px] font-bold text-[#40BB43] hover:underline">
              Criar conta
            </Link>
          </div>

        </form>
      </div>

      {/* 3. RODAPÉ CURVO */}
      <div className="absolute bottom-0 left-0 w-full h-48 overflow-hidden z-0 flex items-end justify-center">
         {/* Forma Verde */}
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

         {/* Conteúdo do Rodapé */}
         <div className="relative z-10 text-center pb-6 px-6 flex flex-col gap-1">
            <Link href="/organizador/recuperar-senha" className="text-[#1D1D1F] font-semibold text-[14px] hover:underline">
              Esqueci minha senha
            </Link>
            
            <p className="text-[#1D1D1F]/60 text-[10px] mt-2">
              © Skipow — Plataforma de consumo para eventos
            </p>
         </div>
      </div>

    </main>
  );
}