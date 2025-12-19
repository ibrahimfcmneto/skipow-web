"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from 'next/font/google';
import { motion } from "framer-motion";
import { ArrowRight, Smartphone, CreditCard, QrCode, UserCog, Martini } from "lucide-react";

// Configuração da tipografia
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

// Componente de Card de Recurso (Micro) - CORRIGIDO PARA TYPESCRIPT
// Adicionei ": any" aqui para corrigir o erro de build
const FeatureCard = ({ icon: Icon, title, desc, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className="flex flex-col items-center text-center p-4 bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100"
  >
    <div className="w-10 h-10 rounded-2xl bg-[#40BB43]/10 text-[#40BB43] flex items-center justify-center mb-3">
      <Icon size={20} strokeWidth={2.5} />
    </div>
    <h3 className="text-[13px] font-bold text-gray-900 mb-1 leading-tight">{title}</h3>
    <p className="text-[11px] text-gray-500 leading-snug">{desc}</p>
  </motion.div>
);

export default function LandingPage() {
  return (
    <div className={`${poppins.className} min-h-screen bg-[#F5F5F7] flex flex-col items-center relative overflow-x-hidden selection:bg-[#40BB43] selection:text-white`}>
      
      {/* BACKGROUND PREMIUM (Gradientes Suaves) */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="fixed -top-[20%] -right-[20%] w-[600px] h-[600px] bg-[#40BB43]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <main className="w-full max-w-lg px-6 pt-12 pb-10 flex flex-col z-10">
        
        {/* 1. HERO SECTION */}
        <header className="flex flex-col items-center text-center mb-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-40 h-12 mb-8"
          >
            <Image 
                src="/logo-skipow.png" 
                alt="Skipow" 
                fill 
                className="object-contain"
                priority
            />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-[36px] leading-[1.1] font-bold text-[#1D1D1F] tracking-tight mb-4"
          >
            A festa começa <br/>
            <span className="text-[#40BB43]">quando a fila acaba.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-[16px] text-gray-500 font-medium leading-relaxed max-w-[280px]"
          >
            Peça bebidas pelo celular, pague com Pix e retire no balcão em segundos.
          </motion.p>
        </header>

        {/* 2. HOW IT WORKS (Grid estilo Apple) */}
        <section className="grid grid-cols-3 gap-3 mb-10">
          <FeatureCard 
            icon={Smartphone} 
            title="Peça" 
            desc="Selecione no app" 
            delay={0.3} 
          />
          <FeatureCard 
            icon={CreditCard} 
            title="Pague" 
            desc="Pix ou Cartão" 
            delay={0.4} 
          />
          <FeatureCard 
            icon={QrCode} 
            title="Retire" 
            desc="Mostre o QR Code" 
            delay={0.5} 
          />
        </section>

        {/* 3. PRIMARY CTA (Para o Cliente) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-12"
        >
          <Link href="/eventos" className="block group">
            <button className="relative w-full bg-[#1D1D1F] hover:bg-black text-white h-[68px] rounded-[24px] font-semibold text-[18px] flex items-center justify-between px-8 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] transition-all transform active:scale-[0.98]">
              <span>Quero comprar fichas</span>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                 <ArrowRight size={20} />
              </div>
            </button>
          </Link>
          <p className="text-center text-[12px] text-gray-400 mt-4 font-medium flex justify-center items-center gap-1">
             <span className="w-1.5 h-1.5 bg-[#40BB43] rounded-full animate-pulse"></span>
             Eventos acontecendo agora
          </p>
        </motion.div>

        {/* 4. DIVISOR SUTIL */}
        <div className="w-full h-px bg-gray-200 mb-8" />

        {/* 5. SECONDARY ACCESS (Profissionais) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="space-y-4"
        >
          <h2 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest text-center mb-4">
            Acesso Corporativo
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {/* Bartender */}
            <Link href="/bartender/login" className="group">
              <button className="w-full bg-white border border-gray-200 h-14 rounded-[18px] flex items-center justify-center gap-2.5 text-gray-600 font-semibold text-[14px] hover:border-gray-300 hover:shadow-sm transition-all active:scale-[0.98]">
                <Martini size={18} className="text-gray-400 group-hover:text-[#40BB43] transition-colors" />
                Sou Bartender
              </button>
            </Link>

            {/* Organizador */}
            <Link href="/organizador/login" className="group">
              <button className="w-full bg-white border border-gray-200 h-14 rounded-[18px] flex items-center justify-center gap-2.5 text-gray-600 font-semibold text-[14px] hover:border-gray-300 hover:shadow-sm transition-all active:scale-[0.98]">
                <UserCog size={18} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
                Sou Organizador
              </button>
            </Link>
          </div>
        </motion.div>

      </main>

      {/* FOOTER */}
      <footer className="w-full py-6 text-center">
        <p className="text-[11px] text-gray-400 font-medium">© {new Date().getFullYear()} Skipow Inc.</p>
      </footer>
    </div>
  );
}