// app/perfil/page.jsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Poppins } from 'next/font/google';
import { User, LogOut, Settings, HelpCircle, ChevronRight, UserPlus } from "lucide-react";

// Configuração da fonte
const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export default function PerfilPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Verifica se o usuário está logado ao carregar a página
  useEffect(() => {
    if (typeof window !== "undefined") {
      const dadosSalvos = localStorage.getItem("skipow_user_data");
      if (dadosSalvos) {
        setUsuario(JSON.parse(dadosSalvos));
      }
      setCarregando(false);
    }
  }, []);

  // Função de Sair (Logout)
  const handleLogout = () => {
    localStorage.removeItem("skipow_user_data");
    setUsuario(null);
    router.push("/"); // Volta para a home ou login
  };

  // Se estiver carregando (evita piscar a tela errada)
  if (carregando) return <div className="min-h-screen bg-white" />;

  return (
    <main className={`min-h-screen bg-white flex flex-col relative ${poppins.className}`}>
      
      {/* HEADER (Igual em ambas as telas) */}
      <header className="px-6 pt-8 pb-4 flex items-center justify-between">
        <div onClick={() => router.push('/cardapio')} className="cursor-pointer">
            <Image src="/logo-skipow.png" alt="Skipow" width={110} height={32} />
        </div>

        <div className="flex items-center gap-4">
            <button
            onClick={() => router.push("/fichas")}
            className="bg-white border border-gray-100 shadow-sm px-4 py-2 rounded-xl text-[12px] font-bold text-gray-900 transition-transform active:scale-95"
            >
            Minhas Fichas
            </button>
            <button onClick={() => router.push("/carrinho")} className="text-gray-900 hover:text-[#40BB43] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            </button>
        </div>
      </header>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <div className="flex-1 flex flex-col items-center px-6 pt-4 pb-32 z-10">
        
        <h1 className="text-[28px] font-extrabold text-gray-900 uppercase tracking-tight mb-8">
          Meu Perfil
        </h1>

        {/* LÓGICA CONDICIONAL: LOGADO vs NÃO LOGADO */}
        {usuario ? (
            // ================== USUÁRIO LOGADO ==================
            <>
                {/* Avatar */}
                <div className="relative w-40 h-40 mb-8 animate-in zoom-in duration-300">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 border-4 border-gray-50 shadow-inner relative">
                        {/* Como não temos upload real, usamos placeholder ou imagem padrão */}
                        <Image src="/avatar.png" alt="Perfil" fill className="object-cover" />
                    </div>
                    <button className="absolute bottom-2 right-2 bg-[#40BB43] text-white p-2 rounded-full shadow-lg hover:bg-[#36a539] transition-colors">
                        <Settings size={18} />
                    </button>
                </div>

                {/* Dados */}
                <div className="w-full max-w-sm space-y-6 mb-10 text-center">
                    <div>
                        <h2 className="text-[24px] font-bold text-gray-900">{usuario.nome || "Usuário Skipow"}</h2>
                        <p className="text-[16px] text-gray-500 font-medium">{usuario.email || "Sem e-mail cadastrado"}</p>
                        {usuario.telefone && <p className="text-[14px] text-gray-400 mt-1">{usuario.telefone}</p>}
                    </div>
                </div>

                {/* Menu de Ações */}
                <div className="w-full max-w-xs space-y-3">
                    <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-600 shadow-sm"><Settings size={16}/></div>
                            <span className="font-semibold text-gray-700">Editar Dados</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-400 group-hover:translate-x-1 transition-transform"/>
                    </button>
                    
                    <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-600 shadow-sm"><HelpCircle size={16}/></div>
                            <span className="font-semibold text-gray-700">Ajuda e Suporte</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-400 group-hover:translate-x-1 transition-transform"/>
                    </button>

                    <button 
                        onClick={handleLogout}
                        className="w-full mt-6 p-4 text-red-500 font-bold text-[16px] hover:bg-red-50 rounded-2xl transition-colors flex items-center justify-center gap-2"
                    >
                        <LogOut size={18} />
                        Sair da conta
                    </button>
                </div>
            </>
        ) : (
            // ================== USUÁRIO NÃO LOGADO (GUEST) ==================
            <div className="flex flex-col items-center justify-center w-full max-w-sm mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-100">
                    <User size={48} className="text-gray-300" />
                </div>
                
                <h2 className="text-[22px] font-bold text-gray-900 text-center leading-tight mb-3">
                    Você ainda não tem<br/>conta na Skipow
                </h2>
                <p className="text-center text-gray-500 mb-8 px-4 text-sm">
                    Crie sua conta para salvar suas fichas, agilizar o pagamento e ganhar segurança.
                </p>

                <button 
                    onClick={() => router.push('/cadastro')}
                    className="w-full bg-[#40BB43] hover:bg-[#36a539] text-white font-bold text-[18px] py-4 rounded-2xl shadow-[0_8px_20px_-5px_rgba(64,187,67,0.4)] flex items-center justify-center gap-2 transition-transform active:scale-[0.98] mb-4"
                >
                    <UserPlus size={20} />
                    Criar conta
                </button>

                <button 
                    onClick={() => router.push('/login')}
                    className="text-gray-500 font-semibold text-sm hover:text-gray-900 transition-colors"
                >
                    Já tenho conta, quero entrar
                </button>
            </div>
        )}

      </div>

      {/* RODAPÉ VERDE CURVO */}
      <div className="absolute bottom-0 w-full z-0 h-28 overflow-hidden pointer-events-none">
         <div className="absolute bottom-0 left-0 w-full h-full">
            <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                <path d="M0.00,49.98 Q250.00,150.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" className="fill-[#40BB43]"></path>
            </svg>
        </div>
        <div className="absolute bottom-2 w-full text-center z-10 pb-2">
            <p className="text-[10px] text-white/60">© Skipow — Plataforma de consumo para eventos</p>
        </div>
      </div>
    </main>
  );
}