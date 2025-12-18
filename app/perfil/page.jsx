// app/perfil/page.jsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Poppins } from 'next/font/google';

// Configuração da fonte
const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export default function PerfilPage() {
  const router = useRouter();

  // Dados mocados (Pode substituir por dados reais do banco depois)
  const usuario = {
    nome: "Ibrahim Neto",
    email: "ibrahim@email.com",
    avatar: "/avatar.png" // Certifique-se de ter essa imagem ou use um placeholder
  };

  return (
    <main className={`min-h-screen bg-white flex flex-col relative ${poppins.className}`}>
      
      {/* HEADER (Igual ao wireframe) */}
      <header className="px-6 pt-8 pb-4 flex items-center justify-between">
        {/* Logo */}
        <div 
            onClick={() => router.push('/cardapio')}
            className="cursor-pointer"
        >
            <Image
            src="/logo-skipow.png"
            alt="Skipow"
            width={110}
            height={32}
            />
        </div>

        <div className="flex items-center gap-4">
            {/* Botão Minhas Fichas */}
            <button
            onClick={() => router.push("/fichas")}
            className="bg-white border border-gray-100 shadow-sm px-4 py-2 rounded-xl text-[12px] font-bold text-gray-900 transition-transform active:scale-95"
            >
            Minhas Fichas
            </button>

            {/* Carrinho */}
            <button
            onClick={() => router.push("/carrinho")}
            className="text-gray-900 hover:text-[#40BB43] transition-colors"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            </button>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex-1 flex flex-col items-center px-6 pt-4 pb-32 z-10">
        
        {/* Título */}
        <h1 className="text-[28px] font-extrabold text-gray-900 uppercase tracking-tight mb-8">
          Meu Perfil
        </h1>

        {/* Avatar Grande */}
        <div className="relative w-40 h-40 mb-10">
          <div className="w-full h-full rounded-full overflow-hidden bg-gray-200 border-4 border-gray-50 shadow-inner relative">
             {/* Se não tiver avatar.png, isso serve de placeholder cinza igual da imagem */}
             {usuario.avatar ? (
                <Image 
                    src={usuario.avatar} 
                    alt="Perfil" 
                    fill 
                    className="object-cover"
                />
             ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </div>
             )}
          </div>
        </div>

        {/* Informações do Usuário */}
        <div className="w-full max-w-sm space-y-6 mb-12">
            
            {/* Nome */}
            <div className="flex items-center justify-center gap-2">
                <span className="text-[18px] font-bold text-gray-900">Nome:</span>
                <span className="text-[18px] text-gray-600 font-medium">{usuario.nome}</span>
                <button className="ml-2 text-gray-400 hover:text-gray-600">
                    {/* Ícone Lápis */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                </button>
            </div>

            {/* Email */}
            <div className="flex items-center justify-center gap-2">
                <span className="text-[18px] font-bold text-gray-900">E-mail:</span>
                <span className="text-[18px] text-gray-600 font-medium truncate max-w-[180px]">{usuario.email}</span>
                <button className="ml-2 text-gray-400 hover:text-gray-600">
                    {/* Ícone Lápis */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                </button>
            </div>

        </div>

        {/* Ações */}
        <div className="text-center space-y-4">
            <button 
                onClick={() => router.push('/login')}
                className="text-red-500 font-bold text-[18px] hover:underline"
            >
                Sair da conta
            </button>
            
            <div className="pt-2">
                <p className="text-gray-500 font-medium text-[15px]">Precisa de Ajuda?</p>
                <button className="text-gray-700 font-bold text-[15px] hover:underline">
                    Fale com o suporte
                </button>
            </div>
        </div>

      </div>

      {/* RODAPÉ VERDE CURVO */}
      <div className="absolute bottom-0 w-full z-0 h-28 overflow-hidden">
         {/* SVG da Curva */}
         <div className="absolute bottom-0 left-0 w-full h-full">
            <svg 
                className="w-full h-full"
                viewBox="0 0 500 150" 
                preserveAspectRatio="none"
            >
                <path 
                    d="M0.00,49.98 Q250.00,150.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" 
                    className="fill-[#40BB43]"
                ></path>
            </svg>
        </div>
        
        {/* Texto do Rodapé */}
        <div className="absolute bottom-2 w-full text-center z-10 pb-2">
            <button className="text-white/90 text-sm font-medium hover:underline mb-1 block mx-auto">
                Termos de Uso
            </button>
            <p className="text-[10px] text-white/60">
                © Skipow — Plataforma de consumo para eventos
            </p>
        </div>
      </div>
    </main>
  );
}