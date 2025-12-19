// app/login/page.jsx
"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { Poppins } from 'next/font/google';

// Fonte oficial
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Lógica de Redirecionamento: Se vier do carrinho, vai para /pagamento
  const callbackUrl = searchParams.get("callbackUrl") || "/eventos";

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    
    // Simula login e salva sessão
    localStorage.setItem("skipow_user_data", JSON.stringify({ nome: "Cliente Logado", logado: true }));
    
    // Redireciona para o fluxo correto (Pagamento ou Eventos)
    router.push(callbackUrl);
  }

  return (
    <div className="w-full max-w-md px-6 py-10 flex flex-col z-10">
      
      {/* LOGO */}
      <div className="flex justify-center mb-8">
        <Image 
          src="/logo-skipow.png" 
          alt="Skipow" 
          width={140} 
          height={42} 
          className="object-contain" 
          priority
        />
      </div>

      {/* TÍTULO */}
      <div className="text-center mb-8">
        <h1 className="text-[28px] font-extrabold text-gray-900">Bem-vindo de volta!</h1>
        <p className="text-gray-500 mt-1 text-sm">
          {callbackUrl.includes('pagamento') 
            ? "Faça login para finalizar sua compra." 
            : "Acesse sua conta para continuar."}
        </p>
      </div>

      {/* FORMULÁRIO (Estilo idêntico ao Cadastro) */}
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* EMAIL */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Email</label>
          <div className="relative">
            <input 
              type="email" 
              required
              placeholder="Digite seu email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F3F4F6] rounded-xl py-4 px-5 text-gray-700 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#40BB43]/50 focus:bg-white transition-all"
            />
            {/* Ícone opcional (se quiser igual ao wireframe antigo, pode remover ou manter clean como o cadastro novo) */}
          </div>
        </div>

        {/* SENHA */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Senha</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              required
              placeholder="******" 
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full bg-[#F3F4F6] rounded-xl py-4 px-5 pr-12 text-gray-700 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#40BB43]/50 focus:bg-white transition-all"
            />
            
            {/* Ícone de Olho (Visualizar Senha) */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7c.44 0 .87-.02 1.28-.05"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </button>
          </div>
          
          <div className="text-right mt-2">
            <span className="text-xs text-gray-400 hover:text-[#40BB43] cursor-pointer font-bold transition-colors">Esqueceu a senha?</span>
          </div>
        </div>

        {/* BOTÃO ENTRAR */}
        <div className="pt-2">
          <button 
              type="submit"
              className="w-full bg-[#40BB43] hover:bg-[#36a539] text-white font-bold rounded-[20px] py-4 text-[18px] shadow-lg shadow-green-200 transition-transform active:scale-[0.98]"
          >
              {callbackUrl.includes('pagamento') ? "Entrar e Pagar" : "Entrar"}
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Não tem conta? <span className="text-[#40BB43] font-bold cursor-pointer hover:underline" onClick={() => router.push('/cadastro')}>Cadastre-se</span>
        </p>

      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className={`min-h-screen bg-white flex justify-center relative overflow-hidden ${poppins.className}`}>
      
      {/* O Suspense é necessário no Next.js para usar useSearchParams */}
      <Suspense fallback={<div className="flex items-center justify-center h-screen text-[#40BB43]">Carregando...</div>}>
        <LoginForm />
      </Suspense>

      {/* RODAPÉ ONDA VERDE (Igual ao Cadastro) */}
      <div className="fixed bottom-0 left-0 w-full h-24 overflow-hidden pointer-events-none z-0">
          <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
              <path d="M0.00,49.98 Q250.00,150.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" className="fill-[#40BB43]"></path>
          </svg>
      </div>
      
      {/* Gradiente sutil no fundo para unir com a onda */}
      <div className="fixed bottom-0 left-0 w-full h-32 pointer-events-none -z-10 bg-gradient-to-t from-green-50/50 to-transparent"></div>

    </main>
  );
}