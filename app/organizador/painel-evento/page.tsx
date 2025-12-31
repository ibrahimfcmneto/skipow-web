"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Poppins } from 'next/font/google';
import { 
  ChevronLeft, 
  User, 
  Menu, 
  Copy,
  MoreHorizontal,
  Search // <--- Adicionei o ícone de busca
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  LabelList
} from 'recharts';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

// --- DADOS ---
const dadosProdutos = [
  { name: 'copao', valor: 200, color: '#86EFAC' },     
  { name: 'cerveja', valor: 450, color: '#4ADE80' },   
  { name: 'skol beats', valor: 1300, color: '#22C55E' }, 
  { name: 'corote', valor: 1600, color: '#15803D' },   
];

const dadosHorario = [
  { hora: '22h', vendas: 15 },
  { hora: '23h', vendas: 290 },
  { hora: '00h', vendas: 350 },
  { hora: '01h', vendas: 160 },
  { hora: '02h', vendas: 210 },
  { hora: '03h', vendas: 40 },
  { hora: '04h', vendas: 5 },
];

export default function PainelEventoPage() {
  const router = useRouter();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`Copiado!`); 
  };

  return (
    <main className={`min-h-screen bg-[#F2F2F7] pb-32 ${poppins.className} antialiased selection:bg-green-100 selection:text-green-900`}>
      
      {/* --- HEADER --- */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-black/[0.03] transition-all">
        <div className="max-w-md mx-auto px-5 py-3 flex items-center justify-between">
            
            <button 
              onClick={() => router.back()} 
              className="bg-white w-10 h-10 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-50 flex items-center justify-center text-[#1D1D1F] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <ChevronLeft size={22} className="relative -ml-0.5" strokeWidth={2.5} />
            </button>
            
            <div className="relative w-24 h-6 opacity-90">
                <Image 
                  src="/logo_skipow_oficial_sem_fundo-removebg-preview.png"
                  alt="Skipow"
                  fill
                  className="object-contain"
                  priority
                />
            </div>

            <div className="flex items-center gap-5">
              <User size={22} className="text-gray-400 hover:text-gray-600 transition-colors" strokeWidth={2.5} />
              <Menu size={24} className="text-[#1D1D1F]" strokeWidth={2.5} />
            </div>
        </div>
      </header>

      {/* --- BANNER IMERSIVO --- */}
      <div className="relative w-full h-[320px]">
        <Image 
          src="/De_ferias_com_a_faceca.png" 
          alt="Banner Evento"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20"></div>
      </div>

      {/* --- CONTEÚDO ELEVADO (Layering) --- */}
      <div className="max-w-md mx-auto -mt-10 relative z-10 px-5">
        
        {/* Card Principal: Status & Ações */}
        <div className="bg-white rounded-[32px] p-6 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.06)] ring-1 ring-black/5 mb-6">
           
           {/* Header do Card */}
           <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-[0.1em] text-gray-400 uppercase">Evento Atual</span>
                  <h1 className="text-xl font-bold text-[#1D1D1F] leading-tight tracking-tight w-4/5">
                    De férias com a FACECA
                  </h1>
              </div>
              
              <div className="bg-[#F0FDF4] pl-2 pr-3 py-1.5 rounded-full border border-green-100 flex items-center gap-2 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#40BB43]"></span>
                  </span>
                  <span className="text-[#15803D] text-[10px] font-bold tracking-wide">ATIVO</span>
              </div>
           </div>

           {/* Botões de Ação Principais */}
           <div className="grid grid-cols-2 gap-3 mb-3">
              <button className="bg-[#40BB43] text-white font-semibold py-4 rounded-2xl text-sm shadow-[0_8px_20px_-6px_rgba(64,187,67,0.4)] hover:shadow-lg active:scale-[0.97] transition-all duration-300 flex items-center justify-center gap-2">
                Pausar vendas
              </button>
              <button className="bg-white border border-gray-100 text-[#FF3B30] font-medium py-4 rounded-2xl text-sm hover:bg-red-50 active:scale-[0.97] transition-all duration-300">
                Encerrar evento
              </button>
           </div>

           {/* --- NOVO BOTÃO: BUSCAR FICHAS --- */}
           <button 
             onClick={() => router.push('/organizador/resgate')}
             className="w-full bg-gray-50 border border-gray-100 text-[#1D1D1F] font-semibold py-4 rounded-2xl text-sm hover:bg-gray-100 active:scale-[0.97] transition-all duration-300 flex items-center justify-center gap-2"
           >
             <Search size={18} className="text-gray-500" />
             Buscar Fichas
           </button>

        </div>

        {/* --- LISTA DE CÓDIGOS --- */}
        <div className="bg-white rounded-[24px] overflow-hidden shadow-sm ring-1 ring-black/[0.04] mb-4">
          
          {/* Item 1 */}
          <div 
            onClick={() => handleCopy('CDE130225')}
            className="flex items-center justify-between p-5 border-b border-gray-100 active:bg-gray-50 transition-colors cursor-pointer group"
          >
              <span className="text-[#1D1D1F] font-medium text-sm">Código do evento</span>
              <div className="flex items-center gap-2">
                  <span className="text-gray-500 font-mono text-sm group-hover:text-[#40BB43] transition-colors">CDE130225</span>
                  <Copy size={16} className="text-gray-300 group-hover:text-[#40BB43]" />
              </div>
          </div>

          {/* Item 2 */}
          <div 
            onClick={() => handleCopy('PB131225')}
            className="flex items-center justify-between p-5 active:bg-gray-50 transition-colors cursor-pointer group"
          >
              <span className="text-[#1D1D1F] font-medium text-sm">PIN do Bar</span>
              <div className="flex items-center gap-2">
                  <span className="text-gray-500 font-mono text-sm group-hover:text-[#40BB43] transition-colors">PB131225</span>
                  <Copy size={16} className="text-gray-300 group-hover:text-[#40BB43]" />
              </div>
          </div>
        </div>

        {/* Botão Secundário */}
        <button className="w-full text-[#40BB43] font-semibold text-sm py-3 mb-8 hover:bg-[#40BB43]/5 rounded-xl transition-colors flex items-center justify-center gap-1">
            Gerar novo PIN do bar
        </button>

        {/* --- KPI CARDS --- */}
        <div className="space-y-3 mb-10">
           
           {/* Card Destaque */}
           <div className="bg-[#2E8B30] rounded-[28px] p-7 text-center text-white shadow-xl shadow-green-900/10 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/15 transition-all duration-700"></div>
              <p className="text-green-100 text-sm font-medium tracking-wide mb-1">Valor total vendido</p>
              <p className="text-[42px] font-bold tracking-tight leading-none">R$ 18.450,00</p>
           </div>

           {/* Grid de Cards Menores */}
           <div className="grid gap-3">
              <MetricRow label="Total fichas vendidas" value="1.650" />
              <MetricRow label="Fichas validadas" value="1.238" />
              <MetricRow label="Fichas não consumidas" value="412" />
           </div>
        </div>

        {/* --- GRÁFICOS --- */}
        
        {/* Gráfico 1 */}
        <div className="bg-white p-6 rounded-[28px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100/50 mb-4">
          <div className="flex justify-between items-center mb-6 px-1">
            <h3 className="text-base font-bold text-[#1D1D1F]">Produtos mais vendidos</h3>
            <MoreHorizontal size={20} className="text-gray-300" />
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
              {dadosProdutos.map((p) => (
                  <span key={p.name} className="px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100 text-[10px] font-semibold uppercase text-gray-500 tracking-wide flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: p.color}}></span>
                      {p.name}
                  </span>
              ))}
          </div>

          <div className="h-[240px] w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={dadosProdutos} margin={{ top: 0, right: 35, left: 0, bottom: 0 }}>
                      <XAxis type="number" hide />
                      <YAxis type="category" dataKey="name" width={70} tick={{fill: '#9CA3AF', fontSize: 11, fontWeight: 500}} axisLine={false} tickLine={false} />
                      <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', fontSize: '12px'}} />
                      <Bar dataKey="valor" radius={[0, 6, 6, 0]} barSize={24}>
                          {dadosProdutos.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                          <LabelList dataKey="valor" position="right" fill="#1D1D1F" fontSize={12} fontWeight={600} offset={8} />
                      </Bar>
                  </BarChart>
              </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 2 */}
        <div className="bg-white p-6 rounded-[28px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100/50">
          <div className="flex justify-between items-center mb-6 px-1">
            <h3 className="text-base font-bold text-[#1D1D1F]">Horário das vendas</h3>
            <span className="text-[10px] text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-md">HOJE</span>
          </div>
          
          <div className="h-[240px] w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dadosHorario} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                      <XAxis dataKey="hora" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11}} dy={10} />
                      <YAxis hide />
                      <Tooltip cursor={{fill: '#F3F4F6', radius: 6}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', fontSize: '12px'}} />
                      <Bar dataKey="vendas" fill="#40BB43" radius={[6, 6, 0, 0]} barSize={28}>
                          <LabelList dataKey="vendas" position="top" fill="#374151" fontSize={11} fontWeight={600} offset={5} />
                      </Bar>
                  </BarChart>
              </ResponsiveContainer>
          </div>
        </div>

      </div>
    </main>
  );
}

function MetricRow({ label, value }: { label: string, value: string }) {
    return (
        <div className="bg-[#2E8B30] rounded-2xl py-4 px-6 text-center text-white shadow-lg relative overflow-hidden flex items-center justify-between">
            <span className="text-sm font-medium text-green-100/90">{label}</span>
            <span className="text-2xl font-bold tracking-tight">{value}</span>
        </div>
    )
}