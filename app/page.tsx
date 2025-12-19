"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Smartphone,
  QrCode,
  CreditCard,
  ShieldCheck,
  Martini,
  UserCog,
} from "lucide-react";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

type FeatureCardProps = {
  icon: React.ElementType;
  title: string;
  desc: string;
  delay?: number;
};

const FeatureCard = ({ icon: Icon, title, desc, delay = 0 }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: "easeOut" }}
    className="rounded-[24px] bg-white/70 backdrop-blur border border-black/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-4"
  >
    <div className="flex items-start gap-3">
      <div className="mt-0.5 h-11 w-11 rounded-[18px] bg-[#40BB43]/10 text-[#40BB43] flex items-center justify-center">
        <Icon size={20} strokeWidth={2.5} />
      </div>

      <div className="flex-1">
        <h3 className="text-[13px] font-semibold text-[#1D1D1F] leading-tight">
          {title}
        </h3>
        <p className="mt-1 text-[12px] text-black/55 leading-snug">{desc}</p>
      </div>
    </div>
  </motion.div>
);

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.7, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default function LandingPage() {
  const year = new Date().getFullYear();

  return (
    <div
      className={`${poppins.className} min-h-screen bg-[#F5F5F7] text-[#1D1D1F] selection:bg-[#40BB43] selection:text-white`}
    >
      {/* Background: clean + premium */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-0 left-0 right-0 h-[520px] bg-gradient-to-b from-white via-white/60 to-transparent" />
        <div className="absolute -top-[26%] -right-[28%] h-[680px] w-[680px] rounded-full bg-[#40BB43]/7 blur-[120px]" />
        <div className="absolute -bottom-[26%] -left-[28%] h-[680px] w-[680px] rounded-full bg-black/[0.04] blur-[120px]" />
      </div>

      <main className="relative mx-auto w-full max-w-lg px-6 pt-10 pb-10">
        {/* Top brand */}
        <FadeIn delay={0.05}>
          <div className="flex items-center justify-center mb-8">
            <div className="relative h-12 w-40">
              <Image
                src="/logo_skipow_oficial_sem_fundo-removebg-preview.png"
                alt="Skipow"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
        </FadeIn>

        {/* Hero */}
        <header className="text-center">
          <FadeIn delay={0.1}>
            <p className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/60 backdrop-blur px-3 py-1 text-[12px] font-semibold text-black/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[#40BB43] animate-pulse" />
              Sem fila. Sem estresse. Só festa.
            </p>
          </FadeIn>

          <FadeIn delay={0.18}>
            <h1 className="mt-5 text-[36px] leading-[1.06] tracking-tight font-bold">
              Compre sua bebida{" "}
              <span className="text-[#40BB43]">em segundos</span>.
              <br />
              Retire no bar com QR Code.
            </h1>
          </FadeIn>

          <FadeIn delay={0.26}>
            <p className="mt-4 text-[16px] leading-relaxed text-black/60 font-medium">
              Você escolhe, paga no celular e recebe sua ficha digital na hora.
              É só mostrar no bar e retirar.
            </p>
          </FadeIn>
        </header>

        {/* Primary CTA */}
        <FadeIn delay={0.34}>
          <div className="mt-8">
            <Link href="/eventos" className="block">
              <button
                className="group relative w-full h-[68px] rounded-[24px] bg-[#111113] hover:bg-black text-white px-7 shadow-[0_22px_46px_-18px_rgba(0,0,0,0.55)] transition-all active:scale-[0.985]"
                aria-label="Ver eventos e comprar fichas"
              >
                <div className="flex h-full items-center justify-between">
                  <div className="text-left">
                    <div className="text-[17px] font-semibold leading-tight">
                      Ver eventos e comprar
                    </div>
                    <div className="mt-0.5 text-[12px] text-white/65 font-medium">
                      Suas fichas ficam salvas no celular
                    </div>
                  </div>

                  <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </button>
            </Link>

            <div className="mt-3 flex items-center justify-center gap-2 text-[12px] text-black/45 font-medium">
              <ShieldCheck size={14} className="text-[#40BB43]" />
              Pagamento seguro • QR Code único por bebida
            </div>
          </div>
        </FadeIn>

        {/* How it works */}
        <section className="mt-10">
          <FadeIn delay={0.42}>
            <div className="flex items-end justify-between">
              <h2 className="text-[14px] font-semibold tracking-tight">
                Como funciona
              </h2>
              <span className="text-[12px] text-black/45 font-medium">
                3 passos
              </span>
            </div>
          </FadeIn>

          <div className="mt-4 grid gap-3">
            <FeatureCard
              icon={Smartphone}
              title="1) Escolha a bebida"
              desc="Veja o cardápio do evento e adicione ao carrinho."
              delay={0.48}
            />
            <FeatureCard
              icon={CreditCard}
              title="2) Pague no celular"
              desc="Pix ou cartão. Sem precisar baixar aplicativo."
              delay={0.55}
            />
            <FeatureCard
              icon={QrCode}
              title="3) Receba o QR e retire no bar"
              desc="O QR Code é sua ficha digital. Mostre no balcão e pegue a bebida."
              delay={0.62}
            />
          </div>
        </section>

        {/* Trust / credibility (micro, não “IAzão”) */}
        <section className="mt-10">
          <FadeIn delay={0.7}>
            <div className="rounded-[24px] bg-white/70 backdrop-blur border border-black/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-5">
              <h3 className="text-[14px] font-semibold">Por que dá certo na festa</h3>

              <div className="mt-3 space-y-2 text-[13px] text-black/60 font-medium leading-relaxed">
                <p>• Você não pega fila de caixa para comprar ficha.</p>
                <p>• Cada bebida vira um QR Code único (uma ficha digital).</p>
                <p>• Se a internet do cliente cair, o bartender valida normalmente.</p>
              </div>

              <div className="mt-4 text-[12px] text-black/45 font-medium">
                Dica: depois de pagar, deixe a tela de “Minhas fichas” aberta para retirar mais rápido.
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Secondary access */}
        <section className="mt-10">
          <FadeIn delay={0.78}>
            <div className="flex items-end justify-between">
              <h2 className="text-[14px] font-semibold tracking-tight">
                Acesso para equipe
              </h2>
              <span className="text-[12px] text-black/45 font-medium">
                bartender / organização
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link href="/bartender/login" className="group">
                <button className="w-full h-14 rounded-[18px] bg-white/70 backdrop-blur border border-black/[0.08] shadow-[0_10px_26px_rgba(0,0,0,0.05)] flex items-center justify-center gap-2 text-[13px] font-semibold text-black/60 hover:text-black transition active:scale-[0.985]">
                  <Martini size={18} className="text-black/35 group-hover:text-[#40BB43] transition-colors" />
                  Sou Bartender
                </button>
              </Link>

              <Link href="/organizador/login" className="group">
                <button className="w-full h-14 rounded-[18px] bg-white/70 backdrop-blur border border-black/[0.08] shadow-[0_10px_26px_rgba(0,0,0,0.05)] flex items-center justify-center gap-2 text-[13px] font-semibold text-black/60 hover:text-black transition active:scale-[0.985]">
                  <UserCog size={18} className="text-black/35 group-hover:text-black transition-colors" />
                  Sou Organizador
                </button>
              </Link>
            </div>
          </FadeIn>
        </section>

        {/* Footer */}
        <footer className="mt-10 pb-2 text-center">
          <p className="text-[11px] text-black/40 font-medium">© {year} Skipow</p>
        </footer>
      </main>
    </div>
  );
}
