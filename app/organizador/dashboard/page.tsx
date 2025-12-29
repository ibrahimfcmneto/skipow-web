"use client";

import Image from "next/image";
import Link from "next/link";
import { Poppins } from 'next/font/google';
import { User, Menu, Plus } from "lucide-react";

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

// DADOS REAIS COM SUAS IMAGENS
const eventos = [
  {
    id: 1,
    titulo: "De férias com a FACECA",
    data: "20/12/25",
    status: "ATIVO",
    statusColor: "text-[#40BB43]",
    imagem: "/De_ferias_com_a_faceca.png" 
  },
  {
    id: 2,
    titulo: "BAILE FUNK COM DJ SAMUCA + DJ GUETO",
    data: "15/12/25",
    status: "PAUSADO",
    statusColor: "text-gray-400",
    imagem: "/evento-bailefunk.jpg"
  },
  {
    id: 3,
    titulo: "Pagode do Dodô – Último do Ano",
    data: "15/12/25",
    status: "ENCERRADO",
    statusColor: "text-gray-400",
    imagem: "/evento-pagode.jpg"
  }
];

export default function OrganizerDashboardPage() {
  return (
    <main className={`min-h-screen bg-[#F8F9FA] ${poppins.className} text-[#1D1D1F]`}>
      
      {/* 1. HEADER */}
      <header className="bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50 border-b border-gray-100">
        {/* Espaço vazio para equilibrar o logo centralizado */}
        <div className="w-20"></div>

        {/* Logo Central Atualizado */}
        <div className="relative w-32 h-10">
          <Image 
            src="/logo_skipow_oficial_sem_fundo-removebg-preview.png" 
            alt="Skipow" 
            fill 
            className="object-contain" 
            priority
          />
        </div>

        {/* Ações do Usuário (Direita) */}
        <div className="flex items-center justify-end gap-3 w-20">
            <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors cursor-pointer border border-gray-200">
                <User size={18} strokeWidth={2.5} />
            </div>
            <button className="text-[#1D1D1F] hover:text-[#40BB43] transition-colors">
                <Menu size={30} strokeWidth={2.5} />
            </button>
        </div>
      </header>

      {/* 2. CONTEÚDO */}
      <div className="max-w-md mx-auto px-6 pt-10 pb-20 flex flex-col items-center">
        
        {/* Seção de Boas Vindas */}
        <div className="text-center w-full mb-10">
            <h1 className="text-[34px] font-extrabold tracking-tight text-[#1D1D1F] mb-3 leading-tight">
                Olá, João
            </h1>
            
            <Link href="/organizador/novo-evento" className="inline-flex items-center gap-1.5 text-[#40BB43] font-bold text-[15px] hover:text-[#36a539] transition-colors group">
                Criar novo evento 
                <Plus size={18} strokeWidth={4} className="group-hover:translate-x-0.5 transition-transform"/>
            </Link>

            <p className="text-[#8E8E93] text-[14px] mt-8 font-medium tracking-wide">
                Gerencie seus eventos abaixo
            </p>
        </div>

        {/* Lista de Cards */}
        <div className="w-full space-y-5">
            {eventos.map((evento) => (
                <div 
                    key={evento.id} 
                    className="bg-white p-4 rounded-[24px] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] border border-gray-100 flex gap-5 items-stretch hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                    {/* Imagem Quadrada */}
                    <div className="relative w-24 h-24 shrink-0 rounded-[18px] overflow-hidden bg-gray-200 shadow-inner">
                        <Image 
                            src={evento.imagem} 
                            alt={evento.titulo}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Conteúdo */}
                    <div className="flex flex-col justify-between flex-1 py-0.5 min-w-0">
                        <div>
                            {/* Título com limite de 2 linhas */}
                            <h3 className="text-[14px] font-bold leading-[1.3] text-[#1D1D1F] uppercase mb-1 line-clamp-2">
                                {evento.titulo}
                            </h3>
                            
                            {/* Metadados */}
                            <div className="flex flex-col gap-0.5">
                                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                                    DATA: <span className="text-gray-600">{evento.data}</span>
                                </p>
                                <p className={`text-[10px] font-extrabold uppercase tracking-wider ${evento.statusColor}`}>
                                    STATUS: {evento.status}
                                </p>
                            </div>
                        </div>

                        {/* Botão de Ação (ALTERADO AQUI) */}
                        <Link href="/organizador/painel-evento" className="mt-2">
                            <button className="w-full bg-[#40BB43] hover:bg-[#36a539] text-white text-[11px] font-bold py-2 px-4 rounded-full shadow-sm shadow-green-100 uppercase tracking-wide active:scale-95 transition-all">
                                Entrar no evento
                            </button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>

        {/* Feedback visual se não houver eventos */}
        {eventos.length === 0 && (
            <div className="text-center py-10 opacity-50">
                <p className="text-sm">Você ainda não tem eventos.</p>
            </div>
        )}

      </div>
    </main>
  );
}