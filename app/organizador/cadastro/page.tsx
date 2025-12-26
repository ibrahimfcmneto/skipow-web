"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Poppins } from 'next/font/google';
import { CheckCircle2, Loader2 } from "lucide-react"; // Importei ícones novos

// Configuração da fonte
const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export default function OrganizerSignUpPage() {
  const router = useRouter();
  
  // Estados
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    documento: "", 
    senha: "",
    confirmarSenha: "",
    nomeOrganizacao: ""
  });
  
  // Novo estado para controlar a tela de sucesso
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validação simples
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    setIsLoading(true);

    // Simula uma chamada de API (delay de 1.5s)
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSuccess(true); // Ativa a tela de sucesso

    // Espera 2 segundos mostrando a mensagem e redireciona
    setTimeout(() => {
        router.push("/organizador/login");
    }, 2000);
  };

  // --- RENDERIZAÇÃO CONDICIONAL: TELA DE SUCESSO ---
  if (isSuccess) {
    return (
      <main className={`min-h-screen bg-white flex flex-col items-center justify-center p-8 ${poppins.className} text-[#1D1D1F]`}>
        <div className="flex flex-col items-center text-center animate-in zoom-in duration-300">
            <div className="w-24 h-24 bg-[#40BB43]/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={60} className="text-[#40BB43]" strokeWidth={3} />
            </div>
            <h2 className="text-[32px] font-bold text-[#40BB43] mb-2 leading-tight">
                Conta criada<br/>com sucesso!
            </h2>
            <p className="text-gray-500 text-[16px] max-w-xs">
                Você será redirecionado para o login em instantes...
            </p>
        </div>
      </main>
    );
  }

  // --- RENDERIZAÇÃO PADRÃO: FORMULÁRIO ---
  return (
    <main className={`min-h-screen bg-white flex flex-col items-center relative ${poppins.className} text-[#1D1D1F]`}>
      
      {/* 1. HEADER E LOGO */}
      <div className="w-full max-w-md px-8 pt-10 flex flex-col items-center text-center z-10">
        <div className="relative w-36 h-10 mb-2">
          <Image 
            src="/logo-skipow.png" 
            alt="Skipow" 
            fill 
            className="object-contain" 
            priority
          />
        </div>

        <p className="text-[14px] font-medium text-gray-500 mb-6">
          “Menos fila. <span className="text-[#40BB43]">Mais festa.</span>”
        </p>

        <h1 className="text-[40px] font-bold leading-[1.1] mb-2 tracking-tight">
          Criar conta<br/>organizador
        </h1>

        <div className="text-[14px] text-gray-500 mb-8">
          Já possui conta?{' '}
          <Link href="/organizador/login" className="text-[#1D1D1F] font-bold hover:underline">
            Entre aqui!
          </Link>
        </div>
      </div>

      {/* 2. FORMULÁRIO */}
      <div className="w-full max-w-md px-8 z-10 pb-48">
        <form onSubmit={handleRegister} className="space-y-5">
          
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">
              Nome Completo
            </label>
            <input 
              name="nome"
              type="text" 
              required
              placeholder="Digite seu nome completo"
              value={formData.nome}
              onChange={handleChange}
              className="w-full h-14 bg-[#D9D9D9]/60 rounded-xl px-5 text-[16px] text-gray-700 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#40BB43]/50 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">
              Email
            </label>
            <input 
              name="email"
              type="email" 
              required
              placeholder="Digite seu email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-14 bg-[#D9D9D9]/60 rounded-xl px-5 text-[16px] text-gray-700 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#40BB43]/50 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">
              CPF ou CNPJ
            </label>
            <input 
              name="documento"
              type="text" 
              required
              placeholder="000.000.000-00"
              value={formData.documento}
              onChange={handleChange}
              className="w-full h-14 bg-[#D9D9D9]/60 rounded-xl px-5 text-[16px] text-gray-700 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#40BB43]/50 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">
              Senha
            </label>
            <input 
              name="senha"
              type="password" 
              required
              placeholder="Crie uma senha segura"
              value={formData.senha}
              onChange={handleChange}
              className="w-full h-14 bg-[#D9D9D9]/60 rounded-xl px-5 text-[16px] text-gray-700 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#40BB43]/50 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">
              Confirmar Senha
            </label>
            <input 
              name="confirmarSenha"
              type="password" 
              required
              placeholder="Repita sua senha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              className="w-full h-14 bg-[#D9D9D9]/60 rounded-xl px-5 text-[16px] text-gray-700 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#40BB43]/50 transition-all"
            />
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1 leading-tight block">
              Nome da Organização / Evento Principal
            </label>
            <input 
              name="nomeOrganizacao"
              type="text" 
              required
              placeholder="Ex: Atlética X"
              value={formData.nomeOrganizacao}
              onChange={handleChange}
              className="w-full h-14 bg-[#D9D9D9]/60 rounded-xl px-5 text-[16px] text-gray-700 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#40BB43]/50 transition-all"
            />
          </div>

          {/* Botão Criar Conta com Loading */}
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full h-14 bg-[#40BB43] hover:bg-[#36a539] text-white font-bold text-[18px] rounded-xl shadow-lg shadow-green-200 transition-all active:scale-[0.98] mt-6 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
                <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin" /> Processando...
                </div>
            ) : "Criar conta"}
          </button>

        </form>
      </div>

      {/* 3. RODAPÉ CURVO DE PRIVACIDADE */}
      <div className="absolute bottom-0 left-0 w-full h-40 overflow-hidden z-0 flex items-end justify-center pointer-events-none">
         <div className="absolute bottom-0 w-full h-full">
            <svg 
              viewBox="0 0 375 150" 
              preserveAspectRatio="none" 
              className="w-full h-full"
            >
              <path 
                d="M0,150 L0,80 L50,40 Q187.5,-40 325,40 L375,80 L375,150 Z" 
                fill="#40BB43" 
              />
            </svg>
         </div>

         <div className="relative z-10 text-center pb-6 px-10">
            <p className="text-[#1D1D1F]/40 font-medium text-[12px] leading-tight">
              Seus dados estão protegidos.<br/>
              A Skipow não compartilha informações com terceiros.
            </p>
         </div>
      </div>

    </main>
  );
}