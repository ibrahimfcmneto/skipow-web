"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Poppins } from 'next/font/google';
import { ChevronLeft } from "lucide-react";

// Configuração da fonte
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

// --- DADOS LOCAIS ---
const HISTORICO_DATA = [
  { 
    id: 1, 
    produto: 'Red Bull', 
    codigo: 'SKP-82A1', 
    status: 'valid', 
    horario: '23:14', 
    img: '/redbull.png' 
  },
  { 
    id: 2, 
    produto: 'Red Bull', 
    codigo: 'SKP-93A1', 
    status: 'valid', 
    horario: '23:14', 
    img: '/redbull.png' 
  },
  { 
    id: 3, 
    produto: 'Cerveja Amstel', 
    codigo: 'SKP-72B1', 
    status: 'invalid', 
    horario: '23:14', 
    img: '/cerveja.png' 
  },
  { 
    id: 4, 
    produto: 'Licor 43', 
    codigo: 'SKP-46C1', 
    status: 'valid', 
    horario: '23:13', 
    img: '/licor43.png' 
  },
  { 
    id: 5, 
    produto: 'Corote Sabores', 
    codigo: 'SKP-83B1', 
    status: 'valid', 
    horario: '23:13', 
    img: '/corote.png' 
  },
  { 
    id: 6, 
    produto: 'Corote Sabores', 
    codigo: 'SKP-99X1', 
    status: 'valid', 
    horario: '23:10', 
    img: '/corote.png' 
  },
];

export default function HistoricoPage() {
  const router = useRouter();
  const [filtro, setFiltro] = useState<'todos' | 'valid' | 'invalid'>('todos');

  // Lógica de Filtragem
  const dadosFiltrados = HISTORICO_DATA.filter(item => {
    if (filtro === 'todos') return true;
    return item.status === filtro;
  });

  return (
    <main className={`min-h-screen bg-white pb-10 ${poppins.className}`}>
      
      {/* --- HEADER --- */}
      <header className="px-6 py-6 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-10">
         
         {/* Botão Voltar (Estilo da foto) */}
         <button 
            onClick={() => router.back()}
            className="w-10 h-10 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-100"
         >
            <ChevronLeft size={24} className="text-[#1D1D1F] -ml-0.5" strokeWidth={2.5} />
         </button>

         {/* Logo Centralizada */}
         <div className="relative w-32 h-10">
            <Image 
                src="/logo_skipow_oficial_sem_fundo-removebg-preview.png"
                alt="Skipow"
                fill
                className="object-contain"
                priority
            />
         </div>

         {/* Elemento vazio para equilibrar o layout e manter a logo no centro */}
         <div className="w-10"></div>
      </header>

      <div className="max-w-md mx-auto px-5">
        
        {/* Título e Subtítulo */}
        <div className="text-center mb-6">
            <h1 className="text-[26px] font-bold text-[#1D1D1F] leading-tight">
                Histórico de Validações
            </h1>
            <p className="text-[#6B7280] text-base font-medium mt-1">
                Últimas fichas validadas
            </p>
        </div>

        {/* --- FILTROS --- */}
        <div className="flex justify-center gap-3 mb-8">
            <button 
                onClick={() => setFiltro('todos')}
                className={`px-6 py-2 rounded-md text-sm font-semibold transition-all ${
                    filtro === 'todos' 
                    ? 'bg-black text-white shadow-md' 
                    : 'bg-[#F3F4F6] text-[#1D1D1F] hover:bg-gray-200'
                }`}
            >
                Todos
            </button>
            
            <button 
                onClick={() => setFiltro('valid')}
                className={`px-6 py-2 rounded-md text-sm font-semibold transition-all ${
                    filtro === 'valid' 
                    ? 'bg-black text-white shadow-md' 
                    : 'bg-[#F3F4F6] text-[#1D1D1F] hover:bg-gray-200'
                }`}
            >
                Válidos
            </button>

            <button 
                onClick={() => setFiltro('invalid')}
                className={`px-6 py-2 rounded-md text-sm font-semibold transition-all ${
                    filtro === 'invalid' 
                    ? 'bg-black text-white shadow-md' 
                    : 'bg-[#F3F4F6] text-[#1D1D1F] hover:bg-gray-200'
                }`}
            >
                Inválidos
            </button>
        </div>

        {/* --- LISTA DE CARDS --- */}
        <div className="space-y-4">
            {dadosFiltrados.map((item) => (
                <div 
                    key={item.id} 
                    className="bg-white rounded-[20px] p-4 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-50"
                >
                    {/* Lado Esquerdo: Imagem e Texto */}
                    <div className="flex items-center gap-4">
                        <div className="relative w-10 h-16 flex-shrink-0">
                            <Image 
                                src={item.img} 
                                alt={item.produto}
                                fill
                                className="object-contain"
                            />
                        </div>

                        <div className="flex flex-col">
                            <h3 className="text-[18px] font-medium text-[#1D1D1F] leading-tight">
                                {item.produto}
                            </h3>
                            <p className="text-[#1D1D1F] text-sm mt-1">
                                {item.codigo}
                            </p>
                        </div>
                    </div>

                    {/* Lado Direito: Status e Horário */}
                    <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-2">
                            <div 
                                className={`w-3.5 h-3.5 rounded-full ${
                                    item.status === 'valid' ? 'bg-[#40BB43]' : 'bg-[#EF4444]'
                                }`}
                            />
                            <span className="text-[16px] font-medium text-[#1D1D1F]">
                                {item.status === 'valid' ? 'Validado' : 'Inválido'}
                            </span>
                        </div>
                        
                        <p className="text-sm text-[#1D1D1F]">
                            Validado às {item.horario}
                        </p>
                    </div>
                </div>
            ))}

            {dadosFiltrados.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                    <p>Nenhum registro encontrado nesta categoria.</p>
                </div>
            )}
        </div>

      </div>
    </main>
  );
}