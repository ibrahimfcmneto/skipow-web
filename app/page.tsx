"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from 'next/font/google';
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, 
  Smartphone, 
  CreditCard, 
  QrCode, 
  BarChart3, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Zap,
  Sparkles, // Importação garantida
  LucideIcon 
} from "lucide-react";
import { useRef } from "react";

// --- CONFIGURAÇÃO DE FONTE ---
const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

// --- COMPONENTES REUTILIZÁVEIS ---

// Componente de Métrica (Estilo Eventiza)
interface MetricItemProps {
  value: string;
  label: string;
}
const MetricItem = ({ value, label }: MetricItemProps) => (
  <div className="flex flex-col items-center p-4">
    <span className="text-[36px] md:text-[48px] font-extrabold text-white mb-2 leading-none tracking-tight">{value}</span>
    <span className="text-[14px] font-medium text-white/70 uppercase tracking-wider text-center">{label}</span>
  </div>
);

// Componente de Benefício (Grid)
interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
}
const BenefitCard = ({ icon: Icon, title, desc }: BenefitCardProps) => (
  <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className="w-14 h-14 rounded-2xl bg-[#40BB43]/10 text-[#40BB43] flex items-center justify-center mb-6">
      <Icon size={28} strokeWidth={2} />
    </div>
    <h3 className="text-[20px] font-bold text-[#1D1D1F] mb-3">{title}</h3>
    <p className="text-[15px] text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

// --- PÁGINA PRINCIPAL ---

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div className={`${poppins.className} min-h-screen bg-white text-[#1D1D1F] selection:bg-[#40BB43] selection:text-white overflow-x-hidden`}>
      
      {/* NAVBAR (Estilo Eventiza) */}
      <nav className="fixed w-full top-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="relative w-32 h-10 cursor-pointer">
                <Image src="/logo_skipow_oficial_sem_fundo-removebg-preview.png" alt="Skipow" fill className="object-contain" priority />
            </div>
            
            <div className="hidden md:flex gap-8">
                <Link href="#solucoes" className="text-sm font-medium text-gray-600 hover:text-[#40BB43] transition-colors">Soluções</Link>
                <Link href="#beneficios" className="text-sm font-medium text-gray-600 hover:text-[#40BB43] transition-colors">Vantagens</Link>
                <Link href="/ajuda" className="text-sm font-medium text-gray-600 hover:text-[#40BB43] transition-colors">Ajuda</Link>
            </div>

            <div className="flex gap-4">
                <Link href="/bartender/login" className="hidden sm:block">
                    <button className="px-5 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
                        Área do Staff
                    </button>
                </Link>
                <Link href="/organizador/login">
                    <button className="px-6 py-2.5 bg-[#40BB43] hover:bg-[#36a539] text-white text-sm font-bold rounded-full shadow-lg shadow-green-200 transition-all active:scale-95">
                        Criar Evento Grátis
                    </button>
                </Link>
            </div>
        </div>
      </nav>

      <main className="pt-20">

        {/* 1. HERO SECTION (Impacto Visual) */}
        <section className="relative w-full max-w-7xl mx-auto px-6 py-7 md:py-32 flex flex-col items-center text-center">
            {/* Background Decorativo */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-green-50/50 to-transparent rounded-[100%] blur-3xl -z-10" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
            >
              <h1 className="text-[48px] md:text-[76px] leading-[1.05] font-bold tracking-tight mb-8 text-[#1D1D1F]">
                  Menos fila. <br />
                  <span className="text-[#40BB43]">Mais festa.</span>
              </h1>

                <p className="text-[18px] md:text-[22px] text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
                    Compre sua bebida em segundos pelo celular.<br className="hidden md:block"/>
                    Retire no bar com QR Code e aproveite o momento.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-16">
                    <Link href="/organizador/login">
                        <button className="w-full sm:w-auto h-[60px] px-8 bg-[#1D1D1F] hover:bg-black text-white rounded-[20px] font-bold text-[18px] shadow-xl transition-all transform hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-3">
                            Quero usar no meu evento
                            <ArrowRight size={20} />
                        </button>
                    </Link>
                    <Link href="/eventos">
                        <button className="w-full sm:w-auto h-[60px] px-8 bg-white border border-gray-200 text-gray-700 hover:border-[#40BB43] hover:text-[#40BB43] rounded-[20px] font-bold text-[18px] shadow-sm transition-all active:scale-[0.98]">
                            Apenas comprar fichas
                        </button>
                    </Link>
                </div>
            </motion.div>

            {/* Imagem de Destaque (Parallax) */}
            <div ref={containerRef} className="relative w-full max-w-5xl aspect-[16/9] md:aspect-[21/9] rounded-[40px] overflow-hidden shadow-2xl shadow-gray-200 border border-white/50">
                <motion.div style={{ y: yParallax }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                    <Image 
                        src="/festas-de-faculdade.jpg" 
                        alt="Festa universitária com sistema Skipow"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </motion.div>
                
                {/* Overlay Informativo */}
                <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#40BB43] rounded-full flex items-center justify-center text-white">
                        <CheckCircle2 size={20} />
                    </div>
                    <div className="text-left">
                        <p className="text-white font-bold text-sm">Pedido #2930</p>
                        <p className="text-white/80 text-xs">Pronto para retirada</p>
                    </div>
                </div>
            </div>
        </section>

{/* 2. IMPACT SECTION (Impacto esperado) */}
        <section className="w-full bg-[#1D1D1F] py-24 relative overflow-hidden">
          
          {/* Pattern de fundo Sutil */}
          <div 
            className="absolute inset-0 opacity-5 pointer-events-none" 
            style={{ 
              backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            
            {/* Header da Seção */}
            <div className="text-center mb-20">
              <h2 className="text-[32px] md:text-[48px] font-bold text-white mb-6 leading-tight tracking-tight">
                Mais vendas no bar, <br className="md:hidden"/>
                <span className="text-white/50">com menos atrito.</span>
              </h2>

              <p className="text-white/70 text-[18px] md:text-[20px] max-w-3xl mx-auto leading-relaxed mb-10">
                A Skipow elimina o gargalo do caixa e simplifica a operação do bar.
                O resultado costuma aparecer em três frentes: mais velocidade, mais compras
                por impulso e menos custo fixo para operar.
              </p>

              {/* Disclaimer Estilizado (Badge) */}
              <div className="inline-flex items-center justify-center bg-white/5 border border-white/10 rounded-xl px-5 py-3 backdrop-blur-sm max-w-2xl">
                <p className="text-white/40 text-[13px] text-center leading-snug">
                  *Estimativas baseadas em dinâmica de eventos (menos fila = mais giro e consumo).
                  Os resultados variam conforme público, cardápio e operação.
                </p>
              </div>
            </div>

            {/* Grid de Métricas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 border-t border-white/10 pt-16">
              
              {/* Item 1 */}
              <div className="flex flex-col items-center text-center group cursor-default">
                <span className="text-[40px] md:text-[52px] font-extrabold text-white mb-3 leading-none tracking-tight group-hover:text-[#40BB43] transition-colors duration-300">
                  +10–30%
                </span>
                <span className="text-[13px] font-medium text-white/60 uppercase tracking-wider leading-snug max-w-[200px]">
                  Potencial de aumento<br/>no consumo
                </span>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col items-center text-center group cursor-default">
                <span className="text-[40px] md:text-[52px] font-extrabold text-white mb-3 leading-none tracking-tight group-hover:text-[#40BB43] transition-colors duration-300">
                  2–3x
                </span>
                <span className="text-[13px] font-medium text-white/60 uppercase tracking-wider leading-snug max-w-[200px]">
                  Mais velocidade<br/>no atendimento
                </span>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col items-center text-center group cursor-default">
                <span className="text-[40px] md:text-[52px] font-extrabold text-white mb-3 leading-none tracking-tight group-hover:text-[#40BB43] transition-colors duration-300">
                  -50%
                </span>
                <span className="text-[13px] font-medium text-white/60 uppercase tracking-wider leading-snug max-w-[200px]">
                  Necessidade de<br/>caixas físicos
                </span>
              </div>

              {/* Item 4 */}
              <div className="flex flex-col items-center text-center group cursor-default">
                <span className="text-[40px] md:text-[52px] font-extrabold text-white mb-3 leading-none tracking-tight group-hover:text-[#40BB43] transition-colors duration-300">
                  Zero
                </span>
                <span className="text-[13px] font-medium text-white/60 uppercase tracking-wider leading-snug max-w-[200px]">
                  Custo fixo mensal<br/>(modelo %)
                </span>
              </div>

            </div>
          </div>
        </section>


        {/* 3. ALTERNATING FEATURES (Modelo Eventiza) */}
        <section id="solucoes" className="w-full py-32 px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto space-y-32">
                
                {/* Feature 1: App do Cliente */}
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div className="md:w-1/2">
                        <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-[#40BB43] mb-6">
                            <Smartphone size={24} />
                        </div>
                        <h2 className="text-[32px] md:text-[40px] font-bold text-[#1D1D1F] mb-6 leading-tight">
                            Venda fichas direto no <br/><span className="text-[#40BB43]">celular do cliente</span>
                        </h2>
                        <p className="text-[17px] text-gray-500 leading-relaxed mb-8">
                            Seus clientes pedem bebidas direto pelo app, sem precisar de caixas físicos ou enfrentar filas para comprar fichas de papel. Aumente o consumo por impulso com um cardápio digital atrativo.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-gray-700 font-medium"><CheckCircle2 className="text-[#40BB43]" size={20} /> Cardápio digital personalizado</li>
                            <li className="flex items-center gap-3 text-gray-700 font-medium"><CheckCircle2 className="text-[#40BB43]" size={20} /> Pagamento via Pix e Cartão</li>
                            <li className="flex items-center gap-3 text-gray-700 font-medium"><CheckCircle2 className="text-[#40BB43]" size={20} /> Carteira digital segura</li>
                        </ul>
                    </div>
                    <div className="md:w-1/2 relative">
                        <div className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl bg-gray-100">
                             {/* Placeholder visual para o App */}
                             <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                                <Image src="/logo-skipow.png" alt="App Preview" width={200} height={60} className="opacity-20" />
                             </div>
                        </div>
                    </div>
                </div>

                {/* Feature 2: Dashboard Organizador */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-16">
                    <div className="md:w-1/2">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                            <BarChart3 size={24} />
                        </div>
                        <h2 className="text-[32px] md:text-[40px] font-bold text-[#1D1D1F] mb-6 leading-tight">
                            Consulte relatórios em <br/><span className="text-blue-600">tempo real</span>
                        </h2>
                        <p className="text-[17px] text-gray-500 leading-relaxed mb-8">
                            Acompanhe as suas vendas com tabelas e gráficos ao vivo. Tenha controle total sobre o estoque, desempenho dos bartenders e faturamento, tudo em um painel intuitivo.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-gray-700 font-medium"><CheckCircle2 className="text-blue-600" size={20} /> Gráficos de vendas ao vivo</li>
                            <li className="flex items-center gap-3 text-gray-700 font-medium"><CheckCircle2 className="text-blue-600" size={20} /> Controle de estoque automático</li>
                            <li className="flex items-center gap-3 text-gray-700 font-medium"><CheckCircle2 className="text-blue-600" size={20} /> Exportação de dados financeiros</li>
                        </ul>
                    </div>
                    <div className="md:w-1/2 relative">
                        <div className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl bg-gray-100 border border-gray-200">
                             <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                                <BarChart3 size={64} className="text-gray-300" />
                             </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        {/* 4. BENEFITS GRID (Vantagens e Economia) */}
        <section id="beneficios" className="w-full bg-[#F9F9F9] py-32 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-[32px] md:text-[40px] font-bold text-[#1D1D1F] mb-4">Mais vantagens e economia</h2>
                    <p className="text-gray-500 text-[18px]">Por que os organizadores escolhem a Skipow?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <BenefitCard 
                        icon={Zap} 
                        title="Plataforma Self-Service" 
                        desc="Você cria seu evento, cadastra os produtos e começa a vender em minutos, sem depender de ninguém." 
                    />
                    <BenefitCard 
                        icon={CreditCard} 
                        title="Melhor Custo-Benefício" 
                        desc="Praticamos uma das menores taxas do mercado. Sem mensalidade, você só paga uma % sobre o que vender." 
                    />
                    <BenefitCard 
                        icon={ShieldCheck} 
                        title="Segurança Total" 
                        desc="QR Codes criptografados e anti-fraude garantem que você receba por cada bebida entregue." 
                    />
                    <BenefitCard 
                        icon={Users} 
                        title="Suporte Humanizado" 
                        desc="Nosso time está disponível via WhatsApp para garantir que sua operação rode lisa durante o evento." 
                    />
                    <BenefitCard 
                        icon={QrCode} 
                        title="Validação Offline" 
                        desc="A internet caiu? Não tem problema. Nosso sistema de validação funciona mesmo sem conexão." 
                    />
                    <BenefitCard 
                        icon={Sparkles} 
                        title="Experiência Premium" 
                        desc="Ofereça uma experiência de compra moderna que valoriza a marca do seu evento." 
                    />
                </div>
            </div>
        </section>

        {/* 5. FINAL CTA (Verde Skipow) */}
        <section className="w-full px-6 py-20 bg-white">
            <div className="max-w-5xl mx-auto bg-[#40BB43] rounded-[48px] px-8 py-20 text-center relative overflow-hidden shadow-2xl shadow-green-200">
                {/* Decorative Circles */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />

                <div className="relative z-10">
                    <h2 className="text-[32px] md:text-[48px] font-bold text-white mb-6 leading-tight">
                        Pronto para transformar seu evento?
                    </h2>
                    <p className="text-white/90 text-[18px] mb-10 max-w-2xl mx-auto">
                        Crie sua conta agora, cadastre seus produtos e comece a vender sem filas. É rápido, fácil e gratuito para começar.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/organizador/login">
                            <button className="w-full sm:w-auto px-8 py-4 bg-white text-[#40BB43] font-bold text-[18px] rounded-full shadow-lg hover:bg-gray-50 transition-all active:scale-95">
                                Criar evento gratuitamente
                            </button>
                        </Link>
                        <Link href="/fale-conosco">
                            <button className="w-full sm:w-auto px-8 py-4 bg-[#40BB43] border-2 border-white/30 text-white font-bold text-[18px] rounded-full hover:bg-[#36a539] transition-all active:scale-95">
                                Falar com consultor
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start">
                <div className="relative w-28 h-10 mb-2">
                    <Image src="/logo_skipow_oficial_sem_fundo-removebg-preview.png" alt="Skipow" fill className="object-contain" />
                </div>
                <p className="text-[13px] text-gray-400">© {new Date().getFullYear()} Skipow Tecnologia para Eventos.</p>
            </div>
            
            <div className="flex gap-8 text-[14px] font-medium text-gray-500">
                <Link href="#" className="hover:text-[#40BB43] transition-colors">Termos de Uso</Link>
                <Link href="#" className="hover:text-[#40BB43] transition-colors">Privacidade</Link>
                <Link href="#" className="hover:text-[#40BB43] transition-colors">Sobre nós</Link>
            </div>

            <div className="flex gap-4">
               <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#40BB43] hover:text-white transition-all cursor-pointer">
                  <span className="font-bold text-xs">IG</span>
               </div>
               <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#0077b5] hover:text-white transition-all cursor-pointer">
                  <span className="font-bold text-xs">LN</span>
               </div>
            </div>
        </div>
      </footer>
    </div>
  );
}