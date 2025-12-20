// app/esqueci-senha/page.jsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Poppins } from 'next/font/google';
import { Mail } from "lucide-react";

// Configuração da fonte oficial
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export default function EsqueciSenhaPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação do envio de e-mail
    if (email) {
        alert(`Um link de redefinição foi enviado para: ${email}`);
        // Opcional: redirecionar de volta para o login após um tempo
        setTimeout(() => router.push('/login'), 1000);
    } else {
        alert("Por favor, insira seu e-mail.");
    }
  };

  return (
    <main className={`min-h-screen bg-white flex justify-center relative overflow-hidden ${poppins.className}`}>
      
      <div className="w-full max-w-md px-6 pt-10 pb-32 flex flex-col z-10">
        
        {/* LOGO */}
        <div className="flex justify-center mb-10">
          <Image 
            src="/logo-skipow.png" 
            alt="Skipow" 
            width={140} 
            height={42} 
            className="object-contain" 
            priority
          />
        </div>

        {/* TÍTULO E DESCRIÇÃO */}
        <div className="text-center mb-10">
          <h1 className="text-[32px] font-extrabold text-gray-900 leading-tight mb-4">
            Esqueceu sua senha?
          </h1>
          <p className="text-gray-500 text-[15px] leading-relaxed px-4">
            Insira o e-mail cadastrado para receber o link de redefinição de senha.
          </p>
        </div>

        {/* FORMULÁRIO */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* INPUT EMAIL */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                Email
            </label>
            <div className="relative">
                {/* Ícone */}
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400">
                    <Mail size={20} />
                </div>
                <input 
                    type="email" 
                    required
                    placeholder="Digite seu email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#D9D9D9] rounded-[10px] py-4 pl-14 pr-5 text-gray-700 font-medium placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#40BB43]/50 transition-all"
                />
            </div>
          </div>

          {/* BOTÃO ENVIAR */}
          <div className="pt-4">
            <button 
                type="submit"
                className="w-full bg-[#40BB43] hover:bg-[#36a539] text-white font-bold rounded-[10px] py-4 text-[18px] shadow-lg shadow-green-200 transition-transform active:scale-[0.98]"
            >
                Enviar
            </button>
          </div>

          {/* Botão Voltar (Opcional, mas útil) */}
          <button 
             type="button"
             onClick={() => router.back()}
             className="w-full text-center text-gray-500 text-sm font-bold hover:text-[#40BB43] transition-colors pt-2"
          >
             Voltar para o login
          </button>

        </form>
      </div>

      {/* RODAPÉ ONDA VERDE */}
      <div className="fixed bottom-0 left-0 w-full h-32 pointer-events-none z-0">
          <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
              <path d="M0.00,49.98 Q250.00,150.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" className="fill-[#40BB43]"></path>
          </svg>
          <div className="absolute bottom-2 w-full text-center">
             <p className="text-[10px] text-black/40">
                © Skipow — Plataforma de consumo para eventos
             </p>
          </div>
      </div>

    </main>
  );
}