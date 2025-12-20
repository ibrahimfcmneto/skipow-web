"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from 'next/font/google';
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Smartphone, CreditCard, QrCode, UserCog, Martini, Sparkles, CheckCircle2, BarChart3, Users } from "lucide-react";
import { useRef } from "react";

// Typography Configuration
const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

// Reusable Feature Card Component (Apple Style)
const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="flex flex-col items-center text-center p-6 bg-white rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300"
  >
    <div className="w-14 h-14 rounded-2xl bg-[#40BB43]/10 text-[#40BB43] flex items-center justify-center mb-4">
      <Icon size={28} strokeWidth={2} />
    </div>
    <h3 className="text-[18px] font-bold text-gray-900 mb-2 leading-tight">{title}</h3>
    <p className="text-[14px] text-gray-500 leading-relaxed">{desc}</p>
  </motion.div>
);

// Reusable Metric Component
const MetricItem = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <span className="text-[32px] md:text-[40px] font-extrabold text-white mb-1">{value}</span>
    <span className="text-[13px] md:text-[15px] font-medium text-white/80 uppercase tracking-wide">{label}</span>
  </div>
);

export default function LandingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div className={`${poppins.className} min-h-screen bg-[#F5F5F7] flex flex-col relative overflow-x-hidden selection:bg-[#40BB43] selection:text-white`}>
      
      {/* BACKGROUND ELEMENTS */}
      <div className="fixed top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white to-[#F5F5F7] pointer-events-none -z-10" />
      
      {/* NAVIGATION (Eventiza Style) */}
      <nav className="w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between z-50">
        <div className="relative w-32 h-10">
          <Image src="/logo-skipow.png" alt="Skipow" fill className="object-contain" priority />
        </div>
        <div className="hidden md:flex gap-8">
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Soluções</Link>
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Preços</Link>
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Ajuda</Link>
        </div>
        <div className="flex gap-3">
            <Link href="/bartender/login">
                <button className="hidden md:block px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                    Área do Staff
                </button>
            </Link>
            <Link href="/eventos">
                <button className="px-5 py-2.5 bg-[#1D1D1F] text-white text-sm font-semibold rounded-full shadow-lg hover:bg-black transition-transform active:scale-95">
                    Ver eventos
                </button>
            </Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center w-full">
        
        {/* 1. HERO SECTION (Focused & Clean) */}
        <section className="w-full max-w-4xl px-6 pt-16 pb-20 flex flex-col items-center text-center z-10">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-white border border-gray-200 rounded-full px-4 py-1.5 shadow-sm flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#40BB43] animate-pulse" />
            <span className="text-[12px] font-semibold text-gray-600 tracking-wide uppercase">A revolução dos eventos</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-[48px] md:text-[72px] leading-[1.05] font-extrabold text-[#1D1D1F] tracking-tight mb-6"
          >
            Menos fila. <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#40BB43] to-[#2E8B30]">Mais festa.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-[18px] md:text-[22px] text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Escolha, pague e mostre o QR no bar. Simples assim.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
          >
             <Link href="/eventos" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto h-[64px] px-8 bg-[#40BB43] hover:bg-[#36a539] text-white rounded-[24px] font-bold text-[18px] shadow-[0_20px_40px_-12px_rgba(64,187,67,0.4)] transition-all transform hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-3">
                    Comprar Fichas
                    <ArrowRight size={20} />
                </button>
             </Link>
             <Link href="/organizador/login" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto h-[64px] px-8 bg-white border-2 border-gray-100 hover:border-gray-200 text-gray-700 rounded-[24px] font-bold text-[18px] shadow-sm transition-all transform hover:-translate-y-1 active:scale-[0.98]">
                    Sou Organizador
                </button>
             </Link>
          </motion.div>
        </section>

        {/* 2. IMAGE SHOWCASE (Parallax similar to Eventiza's main banner) */}
        <section ref={containerRef} className="w-full max-w-6xl px-4 md:px-6 mb-24">
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[40px] overflow-hidden shadow-2xl shadow-gray-200">
                <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                    <Image 
                        src="/brinde.jpg" // Use your uploaded image
                        alt="Pessoas brindando em festa"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </motion.div>
                
                {/* Floating UI Elements Simulation */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="absolute bottom-8 left-8 md:bottom-12 md:left-12 bg-white/90 backdrop-blur-xl p-4 rounded-[24px] shadow-lg border border-white/50 flex items-center gap-4 max-w-xs"
                >
                    <div className="w-12 h-12 bg-[#40BB43] rounded-full flex items-center justify-center text-white">
                        <QrCode size={24} />
                    </div>
                    <div>
                        <p className="text-[14px] font-bold text-gray-900">Pedido Confirmado</p>
                        <p className="text-[12px] text-gray-500">Mostre no balcão</p>
                    </div>
                </motion.div>
            </div>
        </section>

        {/* 3. METRICS SECTION */}
        <section className="w-full bg-[#1D1D1F] py-24 relative overflow-hidden">
            {/* Background Pattern Sutil */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#40BB43 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-[32px] md:text-[40px] font-bold text-white mb-6 leading-tight">
                        Escale seu evento com a segurança de quem<br className="hidden md:block" /> já atendeu <span className="text-[#40BB43]">milhares de eventos</span>
                    </h2>
                    <p className="text-white/60 text-[18px] max-w-2xl mx-auto">
                        De festas universitárias a grandes festivais: nossa tecnologia foi testada e aprovada no campo de batalha para garantir mais vendas e zero filas.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-white/10 pt-12">
                    <MetricItem value="+100" label="Eventos Realizados" />
                    <MetricItem value="+5.000" label="Fichas Vendidas" />
                    <MetricItem value="+1.000" label="Usuários Cadastrados" />
                    <MetricItem value="+70" label="Produtores Atendidos" />
                </div>
            </div>
        </section>

        {/* 4. FEATURES GRID (Bento Style) */}
        <section className="w-full max-w-6xl mx-auto px-6 py-24">
            <div className="text-center mb-16">
                <span className="text-[#40BB43] font-bold tracking-wider uppercase text-[12px] mb-2 block">Como funciona</span>
                <h2 className="text-[36px] font-bold text-[#1D1D1F]">Soluções para o seu evento</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureCard 
                    icon={Smartphone} 
                    title="Cardápio Digital" 
                    desc="Seus clientes pedem bebidas direto pelo celular, sem precisar de caixas físicos."
                    delay={0.1}
                />
                <FeatureCard 
                    icon={CreditCard} 
                    title="Pagamento Instantâneo" 
                    desc="Integração total com PIX e Cartão de Crédito. Aprovação em segundos."
                    delay={0.2}
                />
                <FeatureCard 
                    icon={QrCode} 
                    title="Retirada Ágil" 
                    desc="O bartender escaneia o QR Code e entrega a bebida. Simples, rápido e seguro."
                    delay={0.3}
                />
                <FeatureCard 
                    icon={BarChart3} 
                    title="Gestão em Tempo Real" 
                    desc="Acompanhe vendas, estoque e faturamento ao vivo pelo painel do organizador."
                    delay={0.4}
                />
                <FeatureCard 
                    icon={Users} 
                    title="Controle de Staff" 
                    desc="Gerencie permissões para bartenders e gerentes com facilidade."
                    delay={0.5}
                />
                <FeatureCard 
                    icon={Sparkles} 
                    title="Experiência Premium" 
                    desc="Design intuitivo que valoriza a marca do seu evento e encanta o público."
                    delay={0.6}
                />
            </div>
        </section>

        {/* 5. CTA FINAL (Eventiza Style Footer CTA) */}
        <section className="w-full px-6 mb-12">
            <div className="max-w-6xl mx-auto bg-[#40BB43] rounded-[40px] px-8 py-16 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-green-200">
                {/* Decorative Circles */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />

                <div className="relative z-10 max-w-2xl mx-auto">
                    <h2 className="text-[32px] md:text-[48px] font-bold text-white mb-6 leading-tight">
                        Pronto para transformar seu evento?
                    </h2>
                    <p className="text-white/90 text-[18px] mb-10 leading-relaxed">
                        Junte-se aos produtores que estão faturando mais e eliminando filas com a tecnologia Skipow.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/organizador/login">
                            <button className="w-full sm:w-auto px-8 py-4 bg-white text-[#40BB43] font-bold text-[18px] rounded-full shadow-lg hover:bg-gray-50 transition-all active:scale-95">
                                Começar Gratuitamente
                            </button>
                        </Link>
                        <Link href="/fale-conosco">
                            <button className="w-full sm:w-auto px-8 py-4 bg-[#40BB43] border-2 border-white/30 text-white font-bold text-[18px] rounded-full hover:bg-[#36a539] transition-all active:scale-95">
                                Falar com Consultor
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full bg-white border-t border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start">
                <div className="relative w-24 h-8 mb-2">
                    <Image src="/logo_skipow_oficial_sem_fundo-removebg-preview.jpg" alt="Skipow" fill className="object-contain" />
                </div>
                <p className="text-[12px] text-gray-400">© {new Date().getFullYear()} Skipow Tecnologia.</p>
            </div>
            
            <div className="flex gap-8 text-[13px] font-medium text-gray-500">
                <Link href="#" className="hover:text-[#40BB43] transition-colors">Termos de Uso</Link>
                <Link href="#" className="hover:text-[#40BB43] transition-colors">Privacidade</Link>
                <Link href="#" className="hover:text-[#40BB43] transition-colors">Sobre nós</Link>
            </div>

            <div className="flex gap-4">
               {/* Social Icons Placeholder */}
               <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#40BB43] hover:text-white transition-all cursor-pointer">
                  <span className="font-bold text-xs">IG</span>
               </div>
               <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#0077b5] hover:text-white transition-all cursor-pointer">
                  <span className="font-bold text-xs">IN</span>
               </div>
            </div>
        </div>
      </footer>
    </div>
  );
}