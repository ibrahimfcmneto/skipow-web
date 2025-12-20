// app/cadastro/page.jsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Poppins } from 'next/font/google';
import { ArrowLeft } from "lucide-react";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export default function CadastroPage() {
  const router = useRouter();

  const handleCadastro = (e) => {
    e.preventDefault();
    // Simula cadastro e login automático
    localStorage.setItem("skipow_user_data", JSON.stringify({ nome: "Novo Cliente", logado: true }));
    router.push("/pagamento");
  };

  return (
    <main className={`min-h-screen bg-white flex justify-center ${poppins.className}`}>
      <div className="w-full max-w-md px-6 py-8 flex flex-col relative">
        
        {/* --- BOTÃO VOLTAR (Agora leva para o Carrinho) --- */}
        <div className="absolute top-8 left-6 z-20">
            <button 
                onClick={() => router.push('/carrinho')} 
                className="w-10 h-10 bg-white rounded-full shadow-md border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
                <ArrowLeft size={20} className="text-gray-900" strokeWidth={2.5} />
            </button>
        </div>

        {/* LOGO */}
        <div className="flex justify-center mb-8 mt-2">
          <Image src="/logo-skipow.png" alt="Skipow" width={140} height={42} className="object-contain" />
        </div>

        {/* TÍTULO */}
        <div className="text-center mb-8">
          <h1 className="text-[26px] font-extrabold text-gray-900 leading-tight">
            Crie uma conta rápida para guardar suas fichas
          </h1>
          <p className="text-gray-500 mt-2 text-sm leading-relaxed px-2">
            A conta garante que suas fichas fiquem protegidas e acessíveis após a compra.
          </p>
        </div>

        {/* FORMULÁRIO */}
        <form onSubmit={handleCadastro} className="space-y-5">
          
          {/* Inputs */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Nome</label>
            <input type="text" required placeholder="Digite seu nome" className="w-full bg-[#F3F4F6] rounded-xl py-4 px-5 text-gray-700 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#40BB43]/50 focus:bg-white transition-all" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Email</label>
            <input type="email" required placeholder="Digite seu email" className="w-full bg-[#F3F4F6] rounded-xl py-4 px-5 text-gray-700 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#40BB43]/50 focus:bg-white transition-all" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Senha</label>
            <input type="password" required placeholder="******" className="w-full bg-[#F3F4F6] rounded-xl py-4 px-5 text-gray-700 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#40BB43]/50 focus:bg-white transition-all" />
          </div>

          {/* BOTÃO CRIAR */}
          <div className="pt-4">
            <button 
                type="submit"
                className="w-full bg-[#40BB43] hover:bg-[#36a539] text-white font-bold rounded-[20px] py-4 text-[18px] shadow-lg shadow-green-200 transition-transform active:scale-[0.98]"
            >
                Continuar para pagamento
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Já possui conta? <span className="text-[#40BB43] font-bold cursor-pointer hover:underline" onClick={() => router.push('/login?callbackUrl=/pagamento')}>Entre aqui</span>
          </p>

        </form>

        <div className="fixed bottom-0 left-0 w-full h-16 pointer-events-none -z-10 bg-gradient-to-t from-green-50 to-transparent opacity-50"></div>
      </div>
    </main>
  );
}