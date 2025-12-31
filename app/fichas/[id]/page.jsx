"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import QRCode from "react-qr-code"; // <--- Biblioteca Local (Zero Dependência Externa)
import { buscarFichaUnica } from "@/app/actions/fichas";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
});

export default function FichaPage() {
  const router = useRouter();
  const params = useParams();
  
  const [ficha, setFicha] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Decodifica o ID da URL com segurança
  const idFicha = params?.id ? decodeURIComponent(Array.isArray(params.id) ? params.id[0] : params.id) : null;
  
  // Ref para controlar o intervalo
  const intervalRef = useRef(null);

  // 1. CARREGAMENTO INICIAL
  useEffect(() => {
    async function carregarInicial() {
      if (!idFicha) return;
      const resultado = await buscarFichaUnica(idFicha);
      if (resultado.sucesso) {
        setFicha(resultado.dados);
      } else {
        setFicha(null);
      }
      setCarregando(false);
    }
    carregarInicial();
  }, [idFicha]);

  // 2. POLLING (VERIFICAÇÃO EM TEMPO REAL)
  useEffect(() => {
    if (!ficha || ficha.status === 'usada') return;

    // Aumentei para 5000ms (5s) para aliviar o servidor em caso de muita gente
    intervalRef.current = setInterval(async () => {
      // console.log("Verificando status..."); 
      const resultado = await buscarFichaUnica(idFicha);
      
      if (resultado.sucesso) {
        if (resultado.dados.status === 'usada') {
            setFicha(resultado.dados);
            if (navigator.vibrate) navigator.vibrate(200);
            clearInterval(intervalRef.current);
        }
      }
    }, 5000); 

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [idFicha, ficha?.status]); 

  if (carregando) {
    return (
      <main className="min-h-screen bg-black/80 backdrop-blur-sm flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  if (!ficha) {
    return (
      <main className={`min-h-screen bg-black/80 backdrop-blur-sm flex items-center justify-center px-5 ${poppins.className}`}>
        <div className="bg-white rounded-[26px] px-6 py-8 shadow-xl text-center max-w-xs animate-in zoom-in">
          <p className="text-gray-800 font-bold mb-2 text-lg">Ficha não encontrada</p>
          <button
            onClick={() => router.push("/fichas")}
            className="w-full px-4 py-3 rounded-xl bg-[#1D1D1F] text-white font-bold text-sm"
          >
            Voltar
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={`min-h-screen bg-black/80 backdrop-blur-md flex items-center justify-center px-5 ${poppins.className}`}>
      
      <div className="w-full max-w-sm bg-white rounded-[32px] overflow-hidden shadow-2xl relative animate-in zoom-in duration-300">
        
        <button
          onClick={() => router.push("/fichas")}
          className="absolute right-5 top-5 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors z-10 font-bold"
        >
          ✕
        </button>

        {/* Cabeçalho do Card */}
        <div className="pt-8 pb-4 px-6 text-center">
             
             <div className="flex justify-center mb-4 transition-all duration-500">
                <span className={`px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-wide flex items-center gap-2 border ${
                    ficha.status === 'disponivel' 
                    ? 'bg-green-100 text-[#40BB43] border-green-200' 
                    : 'bg-red-100 text-red-600 border-red-200'
                }`}>
                    {ficha.status === 'disponivel' ? (
                        <>
                            <span className="w-2 h-2 rounded-full bg-[#40BB43] animate-pulse" />
                            Disponível para uso
                        </>
                    ) : (
                        <>
                            <span className="w-2 h-2 rounded-full bg-red-600" />
                            Já Utilizada
                        </>
                    )}
                </span>
             </div>

            <h1 className="text-[26px] font-extrabold text-[#1D1D1F] leading-none mb-1">
                {ficha.nomeProduto}
            </h1>
            <p className="text-[13px] text-gray-500 font-medium">
                {ficha.evento}
            </p>
        </div>

        {/* Área do QR Code (GERAÇÃO LOCAL) */}
        <div className={`mx-6 p-6 border-2 border-dashed rounded-[24px] mb-6 flex flex-col items-center transition-colors duration-500 ${
            ficha.status === 'disponivel' ? 'bg-white border-gray-200' : 'bg-gray-100 border-gray-300 opacity-60 grayscale'
        }`}>
            
            <div className="relative w-56 h-56 bg-white p-1 flex items-center justify-center">
                {/* SUBSTITUIÇÃO: Usamos o componente QRCode local.
                    Ele gera um SVG leve e nítido.
                */}
                <QRCode
                    value={ficha.codigo}
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    viewBox={`0 0 256 256`}
                    level="H" // H = High Error Correction (QR Code mais robusto)
                    fgColor="#1D1D1F" // Cor escura padrão do app
                />
                
                {/* Carimbo de USADO */}
                {ficha.status === 'usada' && (
                     <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="bg-red-600/90 text-white font-bold text-xl px-4 py-2 rounded-lg -rotate-12 border-2 border-white shadow-lg backdrop-blur-sm">
                            USADO
                        </div>
                     </div>
                )}
            </div>

            <p className="mt-4 font-mono text-xl font-bold text-gray-900 tracking-widest bg-gray-50 px-4 py-1 rounded-lg border border-gray-100">
                {ficha.codigo}
            </p>
        </div>

        {/* Rodapé do Card */}
        <div className="bg-[#F2F2F7] p-5 text-center border-t border-gray-100">
            {ficha.status === 'disponivel' ? (
                <p className="text-[14px] text-gray-600 font-medium leading-snug">
                    Apresente este código ao bartender <br/> para retirar sua bebida.
                </p>
            ) : (
                 <p className="text-[14px] text-red-500 font-bold leading-snug animate-pulse">
                    Ficha validada com sucesso! <br/> Bebida entregue.
                </p>
            )}
            
            <p className="text-[10px] text-gray-400 mt-2">
                ID Único: {ficha.id}
            </p>
        </div>

      </div>
    </main>
  );
}