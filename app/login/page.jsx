"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  // Estado que controla se a senha está visível ou não
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    router.push("/eventos");
  }

  return (
    <main className="min-h-screen flex flex-col bg-white relative overflow-hidden font-sans">
      
      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col items-center px-6 pt-16 z-10 w-full max-w-md mx-auto">
        
        {/* Logo */}
        <div className="mb-14 relative w-48 h-12">
            <Image
            src="/logo-skipow.png"
            alt="Skipow"
            fill
            className="object-contain"
            priority
            />
        </div>

        {/* Título + subtítulo */}
        <div className="w-full text-center mb-10">
          <h1 className="text-[42px] leading-none font-bold text-gray-900 mb-3 tracking-tight">
            Login
          </h1>
          <p className="text-[15px] text-gray-500 font-normal">
            Faça login para continuar.
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          
          {/* Email */}
          <div>
            <label className="block text-[11px] font-bold text-gray-400 mb-2 tracking-[0.15em] uppercase">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                {/* Ícone Envelope */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </div>
              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-[8px] bg-[#E0E0E0] pl-12 pr-4 py-4 text-gray-800 placeholder:text-gray-500 outline-none border-none text-[15px]"
              />
            </div>
          </div>

          {/* Senha */}
          <div>
            <label className="block text-[11px] font-bold text-gray-400 mb-2 tracking-[0.15em] uppercase">
              Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                {/* Ícone Cadeado */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <input
                // Alterna entre "text" (visível) e "password" (escondido)
                type={showPassword ? "text" : "password"}
                placeholder="******"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full rounded-[8px] bg-[#E0E0E0] pl-12 pr-12 py-4 text-gray-800 placeholder:text-gray-500 outline-none border-none text-[15px]"
              />
              
              {/* Botão para alternar visibilidade da senha */}
              <button
                type="button"
                // Ao clicar, inverte o estado de showPassword
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
              >
                {showPassword ? (
                  // Se a senha está VISÍVEL, mostra o ícone de OLHO FECHADO (para esconder)
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7c.44 0 .87-.02 1.28-.05"></path>
                    <line x1="2" x2="22" y1="2" y2="22"></line>
                  </svg>
                ) : (
                  // Se a senha está ESCONDIDA, mostra o ícone de OLHO ABERTO (para ver)
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Botão Entrar */}
          <button
            type="submit"
            className="w-full bg-[#40BB43] hover:bg-[#36a339] text-white font-bold py-4 rounded-[8px] mt-8 text-[16px] transition-colors shadow-sm"
          >
            Entrar
          </button>
        </form>
      </div>

      {/* Rodapé Curvo Verde */}
      <div className="relative w-full h-32 mt-auto">
         {/* SVG da Curva */}
        <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden leading-[0]">
            <svg 
                className="relative block w-[calc(138%+1.3px)] h-[130px] left-[-19%]" 
                data-name="Layer 1" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 1200 120" 
                preserveAspectRatio="none"
            >
                <path 
                    d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z" 
                    className="fill-[#40BB43]"
                ></path>
            </svg>
        </div>
        
        {/* Conteúdo dentro da parte verde */}
        <div className="absolute bottom-0 w-full text-center pb-4 z-20 flex flex-col items-center justify-center h-full pt-10">
            <button 
                type="button" 
                className="text-[15px] text-black font-medium hover:underline mb-8"
            >
                Esqueci minha senha
            </button>
            
            <p className="text-[10px] text-black/40 absolute bottom-2">
                © Skipow — Plataforma de consumo para eventos
            </p>
        </div>
      </div>
    </main>
  );
}