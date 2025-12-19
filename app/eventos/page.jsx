"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Necessário para Logo e Avatar
import { Poppins } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { X, CreditCard, QrCode, Beer, MapPin, Calendar } from "lucide-react";

// --- CONFIGURAÇÃO DA FONTE ---
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

// --- DADOS DOS EVENTOS ---
const EVENTS = [
  { 
    id: 1, 
    title: "De Férias com a FACECA", 
    local: "Arena Universitária",
    date: "Hoje, 22:00", 
    image: "/De_ferias_com_a_faceca.png", 
    status: "live"
  },
  { 
    id: 2, 
    title: "Churrascada da Engenharia", 
    local: "Estacionamento G1",
    date: "Amanhã, 14:00", 
    image: "/churrascada_da_engenharia.jpg",
    status: "soon"
  },
  { 
    id: 3, 
    title: "Sunset Festival", 
    local: "Clube de Campo",
    date: "Sáb, 16:00", 
    image: "/sunset_festival.jpg",
    status: "soon"
  },
];

// --- DADOS DO TUTORIAL ---
const TUTORIAL_STEPS = [
  {
    id: 1,
    icon: Beer,
    text: "Escolha\na bebida",
    iconContainerClass: "bg-white border-gray-100 text-[#40BB43]",
    textColorClass: "text-gray-600"
  },
  {
    id: 2,
    icon: CreditCard,
    text: "Pague pelo celular",
    iconContainerClass: "bg-white border-gray-100 text-[#40BB43]",
    textColorClass: "text-gray-600"
  },
  {
    id: 3,
    icon: QrCode,
    text: "Receba um QR e retire no bar",
    iconContainerClass: "bg-[#40BB43] shadow-lg shadow-green-200/50 text-white border-transparent",
    textColorClass: "text-gray-900 font-bold"
  }
];

/**
 * COMPONENTE: HowItWorksSheet
 */
function HowItWorksSheet({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md"
            onClick={onClose}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
            <motion.div
              initial={{ y: "100%", opacity: 0.5, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: "100%", opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 30, stiffness: 350 }}
              className="pointer-events-auto w-full max-w-[360px] bg-white rounded-[40px] shadow-[0_40px_60px_-15px_rgba(0,0,0,0.15)] relative flex flex-col items-center text-center p-8 overflow-hidden font-poppins"
            >
              <button onClick={onClose} className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors z-20">
                <X size={18} strokeWidth={2.5} />
              </button>

              <div className="mt-4 mb-8 space-y-2">
                <h1 className="text-[22px] font-bold text-gray-900 tracking-tight leading-tight">Como funciona</h1>
                <p className="text-[15px] text-gray-500 font-medium leading-relaxed max-w-[240px] mx-auto">
                  Compre as fichas das bebidas pelo celular.
                </p>
              </div>

              <div className="w-full flex justify-between items-start mb-8 px-2 relative">
                <div className="absolute top-6 left-10 right-10 h-[2px] bg-gray-50 -z-10" />
                {TUTORIAL_STEPS.map((step, index) => {
                  const IconComponent = step.icon;
                  const delayTime = 0.5 + (index * 1.3);
                  return (
                    <motion.div 
                      key={step.id}
                      className="flex flex-col items-center gap-3 w-1/3 z-10"
                      animate={{ scale: [1, 1.15, 1], filter: ["brightness(1)", "brightness(1.05)", "brightness(1)"] }}
                      transition={{ duration: 1.5, ease: "easeInOut", times: [0, 0.4, 1], delay: delayTime, repeat: 0 }}
                    >
                      <div className={`w-12 h-12 rounded-[17px] border shadow-sm flex items-center justify-center transition-transform ${step.iconContainerClass}`}>
                        <IconComponent size={25} strokeWidth={2} />
                      </div>
                      <span className={`text-[13px] font-semibold leading-tight whitespace-pre-line ${step.textColorClass}`}>
                        {step.text}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              <p className="text-[13px] text-gray-500 font-medium leading-relaxed mb-6 max-w-[280px]">
                Você compra aqui, recebe um QR Code e mostra no bar para retirar a bebida.
              </p>

              <button onClick={onClose} className="w-full py-4 rounded-[20px] bg-[#40BB43] text-white font-semibold text-[16px] tracking-wide shadow-[0_10px_20px_-5px_rgba(64,187,67,0.3)] hover:bg-[#36a539] hover:shadow-[0_15px_25px_-5px_rgba(64,187,67,0.4)] active:scale-[0.96] transition-all duration-200 z-20">
                Ver cardápio do evento
              </button>
              
              <p className="mt-4 text-[11px] text-gray-300 font-medium">Simples. Rápido. Seguro.</p>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * PÁGINA: Selecionar Evento
 */
export default function SelectEventPage() {
  const router = useRouter();
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(true);

  return (
    <main className={`${poppins.className} min-h-screen bg-[#FAFAFA] flex justify-center`}>
      <div className="w-full max-w-md bg-white min-h-screen shadow-xl shadow-gray-200/50 relative pb-24">
        
        {/* === HEADER UNIFICADO (Igual ao Cardápio) === */}
        {/* Adicionei 'px-6 bg-white sticky top-0 z-20' para garantir que fique fixo e com espaçamento correto nesta tela */}
        <header className="pt-6 mb-5 px-6 flex items-center justify-between bg-white sticky top-0 z-20 pb-4 shadow-sm border-b border-gray-50">
          {/* Logo */}
          <Image 
            src="/logo-skipow.png" 
            alt="Skipow" 
            width={110} 
            height={32} 
            className="object-contain"
          />

          {/* Botão Minhas Fichas */}
          <button 
            onClick={() => router.push("/fichas")} 
            className="hidden sm:block bg-white shadow-sm border border-gray-100 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-900 transition-transform active:scale-95"
          >
            Minhas Fichas
          </button>

          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div 
              onClick={() => router.push("/perfil")} 
              className="relative w-9 h-9 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <Image 
                src="/avatar.png" 
                alt="Avatar" 
                fill 
                className="rounded-full object-cover border border-gray-100" 
              />
            </div>

            {/* Carrinho */}
            <button 
              onClick={() => router.push("/carrinho")} 
              className="relative text-gray-900 hover:text-[#40BB43] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            </button>
          </div>
        </header>

        {/* Título da Seção (Já que removemos do header antigo) */}
        <div className="px-6 mb-4 mt-2">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                Selecione o evento
            </h1>
        </div>

        {/* LISTA DE EVENTOS */}
        <div className="px-6 space-y-6">
          {EVENTS.map((evt) => (
            <motion.div 
              key={evt.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push('/cardapio')} 
              className="group relative h-56 w-full rounded-[32px] overflow-hidden cursor-pointer shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] transition-all duration-300"
            >
              <div className="absolute inset-0">
                 <Image 
                    src={evt.image} 
                    alt={evt.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                 />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

              <div className="absolute top-5 right-5 z-10">
                {evt.status === "live" ? (
                  <div className="bg-white/20 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                    </span>
                    <span className="text-[10px] font-bold text-white tracking-wide shadow-sm">AO VIVO</span>
                  </div>
                ) : (
                  <div className="bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
                    <span className="text-[10px] font-bold text-white tracking-wide">EM BREVE</span>
                  </div>
                )}
              </div>

              <div className="absolute bottom-0 left-0 w-full p-6 pt-20 z-10">
                <div className="flex items-center gap-3 text-white/90 mb-2">
                   <div className="flex items-center gap-1 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-lg">
                      <Calendar size={12} />
                      <span className="text-[11px] font-semibold">{evt.date}</span>
                   </div>
                   <div className="flex items-center gap-1 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-lg">
                      <MapPin size={12} />
                      <span className="text-[11px] font-semibold">{evt.local}</span>
                   </div>
                </div>
                <h3 className="text-white text-[22px] font-bold leading-tight drop-shadow-md">
                  {evt.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Action Button */}
        {!isHowItWorksOpen && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <button
              onClick={() => setIsHowItWorksOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.06)] text-[12px] font-semibold text-gray-500 hover:text-[#40BB43] hover:shadow-lg transition-all"
            >
              <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">?</span>
              Como funciona
            </button>
          </div>
        )}

        <HowItWorksSheet 
          isOpen={isHowItWorksOpen} 
          onClose={() => setIsHowItWorksOpen(false)} 
        />
      </div>
    </main>
  );
}