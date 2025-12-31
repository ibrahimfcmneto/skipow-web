"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation"; // <--- ADICIONEI useParams
import Image from "next/image";
import { buscarFichaUnica } from "@/app/actions/fichas";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
});

export default function FichaPage() { // <--- Removemos { params } daqui
  const router = useRouter();
  const params = useParams(); // <--- Pegamos os params usando o Hook (Mais seguro)
  
  const [ficha, setFicha] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Pega o ID com segurança (pode vir como string ou array)
  // O decodeURIComponent resolve casos onde o espaço vira %20 ou caracteres especiais
  const idFicha = params?.id ? decodeURIComponent(Array.isArray(params.id) ? params.id[0] : params.id) : null;

  useEffect(() => {
    async function carregarFicha() {
      if (!idFicha) return; // Se ainda não carregou o ID da URL, espera

      const resultado = await buscarFichaUnica(idFicha);

      if (resultado.sucesso) {
        setFicha(resultado.dados);
      } else {
        setFicha(null);
      }
      setCarregando(false);
    }

    carregarFicha();
  }, [idFicha]);

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
          <p className="text-gray-800 font-bold mb-2 text-lg">
            Ficha não encontrada
          </p>
          <p className="text-gray-500 text-sm mb-6">
            Não conseguimos localizar o código <span className="font-mono bg-gray-100 px-1 rounded">{idFicha}</span>.
          </p>
          <button
            onClick={() => router.push("/fichas")}
            className="w-full px-4 py-3 rounded-xl bg-[#1D1D1F] text-white font-bold text-sm hover:scale-105 transition-transform"
          >
            Voltar para Carteira
          </button>
        </div>
      </main>
    );
  }

  // URL do QR Code Dinâmico
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${ficha.codigo}&color=1d1d1f&bgcolor=ffffff`;

  return (
    <main className={`min-h-screen bg-black/80 backdrop-blur-md flex items-center justify-center px-5 ${poppins.className}`}>
      
      {/* CARD DA FICHA */}
      <div className="w-full max-w-sm bg-white rounded-[32px] overflow-hidden shadow-2xl relative animate-in zoom-in duration-300">
        
        {/* Botão Fechar */}
        <button
          onClick={() => router.push("/fichas")}
          className="absolute right-5 top-5 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors z-10 font-bold"
        >
          ✕
        </button>

        {/* Cabeçalho do Card */}
        <div className="pt-8 pb-4 px-6 text-center">
             {/* Status Bolinha */}
             <div className="flex justify-center mb-4">
                <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide flex items-center gap-2 ${
                    ficha.status === 'disponivel' 
                    ? 'bg-green-100 text-[#40BB43]' 
                    : 'bg-red-100 text-red-500'
                }`}>
                    <span className={`w-2 h-2 rounded-full ${ficha.status === 'disponivel' ? 'bg-[#40BB43] animate-pulse' : 'bg-red-500'}`} />
                    {ficha.status === 'disponivel' ? 'Disponível para uso' : 'Já utilizada'}
                </span>
             </div>

            <h1 className="text-[26px] font-extrabold text-[#1D1D1F] leading-none mb-1">
                {ficha.nomeProduto}
            </h1>
            <p className="text-[13px] text-gray-500 font-medium">
                {ficha.evento}
            </p>
        </div>

        {/* Área do QR Code (Destaque) */}
        <div className="mx-6 p-6 bg-white border-2 border-dashed border-gray-200 rounded-[24px] mb-6 flex flex-col items-center">
            
            {/* O QR CODE REAL */}
            <div className="relative w-56 h-56">
                <Image
                    src={qrCodeUrl}
                    alt={`QR Code ${ficha.codigo}`}
                    fill
                    className="object-contain mix-blend-multiply"
                    unoptimized
                />
            </div>

            <p className="mt-4 font-mono text-xl font-bold text-gray-900 tracking-widest bg-gray-100 px-4 py-1 rounded-lg">
                {ficha.codigo}
            </p>
        </div>

        {/* Rodapé do Card */}
        <div className="bg-[#F2F2F7] p-5 text-center border-t border-gray-100">
            <p className="text-[14px] text-gray-600 font-medium leading-snug">
                Apresente este código ao bartender <br/> para retirar sua bebida.
            </p>
            <p className="text-[11px] text-gray-400 mt-2">
                ID Único: {ficha.id}
            </p>
        </div>

      </div>
    </main>
  );
}