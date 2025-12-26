"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Poppins } from 'next/font/google';
import { ArrowLeft, User, Menu, Copy, Check } from "lucide-react";

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export default function EventCreatedPage() {
  // Mock de dados (Em produção, viria do contexto ou parâmetros da URL)
  const evento = {
    nome: "Balão infernal LEP",
    data: "12/02/26",
    codigo: "CDE130225",
    pin: "PB131225"
  };

  // Estado para feedback visual de cópia
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedPin, setCopiedPin] = useState(false);

  const copyToClipboard = (text: string, type: 'code' | 'pin') => {
    navigator.clipboard.writeText(text);
    if (type === 'code') {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedPin(true);
      setTimeout(() => setCopiedPin(false), 2000);
    }
  };

  return (
    <main className={`min-h-screen bg-white ${poppins.className} text-[#1D1D1F]`}>
      
      {/* HEADER */}
      <header className="px-6 py-6 flex items-center justify-between sticky top-0 bg-white z-20 border-b border-gray-100">
        <div className="flex items-center gap-4">
            <Link href="/organizador/dashboard">
                <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                    <ArrowLeft size={20} strokeWidth={2.5} />
                </button>
            </Link>
            <div className="relative w-28 h-8">
                <Image src="/logo-skipow-verde.png" alt="Skipow" fill className="object-contain" priority />
                <Image src="/logo-skipow.png" alt="Skipow" fill className="object-contain" />
            </div>
        </div>
        <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                <User size={18} strokeWidth={2.5} />
            </div>
            <Menu size={28} strokeWidth={2.5} className="text-[#1D1D1F]" />
        </div>
      </header>

      {/* CONTEÚDO */}
      <div className="max-w-md mx-auto px-6 pt-10 pb-20 flex flex-col items-center text-center animate-in fade-in duration-500">
        
        <h1 className="text-[32px] font-extrabold leading-[1.1] mb-8">
            Evento criado com<br/>sucesso!
        </h1>

        {/* Resumo do Evento */}
        <div className="w-full mb-8">
            <h2 className="text-[20px] font-medium text-[#1D1D1F] mb-1">
                {evento.nome}
            </h2>
            <div className="flex items-center justify-center gap-8 mt-2">
                <span className="text-[18px] font-medium text-[#1D1D1F]">{evento.data}</span>
                <span className="text-[18px] font-bold text-[#40BB43] uppercase">ATIVO</span>
            </div>
        </div>

        <hr className="w-full border-dashed border-gray-300 mb-8" />

        {/* Código do Evento */}
        <div className="mb-8 w-full">
            <p className="text-[18px] font-extrabold text-[#1D1D1F] mb-1">
                Código do evento:
            </p>
            <div className="flex items-center justify-center gap-3">
                <span className="text-[24px] font-medium text-[#1D1D1F] tracking-wide">
                    {evento.codigo}
                </span>
                <button 
                    onClick={() => copyToClipboard(evento.codigo, 'code')}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    {copiedCode ? (
                        <Check size={24} className="text-[#40BB43]" />
                    ) : (
                        <Copy size={24} className="text-gray-600" />
                    )}
                </button>
            </div>
        </div>

        <hr className="w-full border-dashed border-gray-300 mb-8" />

        {/* PIN do Bar */}
        <div className="mb-12 w-full">
            <p className="text-[18px] font-extrabold text-[#1D1D1F] mb-1">
                PIN do Bar
            </p>
            <div className="flex items-center justify-center gap-3">
                <span className="text-[24px] font-medium text-[#1D1D1F] tracking-wide">
                    {evento.pin}
                </span>
                <button 
                    onClick={() => copyToClipboard(evento.pin, 'pin')}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    {copiedPin ? (
                        <Check size={24} className="text-[#40BB43]" />
                    ) : (
                        <Copy size={24} className="text-gray-600" />
                    )}
                </button>
            </div>
        </div>

        {/* Botão Final */}
        <Link href="/organizador/painel-evento" className="w-full">
            <button className="w-full h-14 bg-[#40BB43] hover:bg-[#36a539] text-white font-bold text-[16px] rounded-lg shadow-lg shadow-green-200 transition-transform active:scale-[0.98]">
                Entrar no painel do evento
            </button>
        </Link>

      </div>
    </main>
  );
}