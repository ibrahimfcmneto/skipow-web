"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export default function LerQrCodePage() {
  const router = useRouter();
  
  // CORREÇÃO: Tipando explicitamente como elemento de Vídeo HTML
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [permissaoErro, setPermissaoErro] = useState(false);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "environment" } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Erro ao acessar câmera:", err);
        setPermissaoErro(true);
      }
    };

    startCamera();

    return () => {
      // Verifica se a referência e o srcObject existem
      if (videoRef.current && videoRef.current.srcObject) {
        // CORREÇÃO: Força o tipo MediaStream para o TS entender
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const simularLeitura = () => {
    setTimeout(() => {
      router.push("/bartender/validado");
    }, 300);
  };

  return (
    <main className={`fixed inset-0 bg-black flex flex-col items-center justify-center ${poppins.className}`}>
      
      <div className="absolute top-0 left-0 w-full p-6 z-20 flex items-center">
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
        </button>
      </div>

      <div className="absolute top-24 w-full text-center z-20">
        <h2 className="text-white text-[18px] font-medium tracking-wide drop-shadow-md">
          Escaneie a ficha
        </h2>
      </div>

      <div className="absolute inset-0 z-0">
        {!permissaoErro ? (
          <video 
            ref={videoRef}
            autoPlay 
            playsInline 
            className="w-full h-full object-cover opacity-80"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-400 p-10 text-center">
            <p>Não foi possível acessar a câmera. Verifique as permissões.</p>
          </div>
        )}
      </div>

      <div 
        className="relative z-10 w-[280px] h-[280px] cursor-pointer"
        onClick={simularLeitura} 
      >
        <div className="absolute top-0 left-0 w-12 h-12 border-l-4 border-t-4 border-[#40BB43] rounded-tl-xl shadow-[0_0_15px_rgba(64,187,67,0.5)]" />
        <div className="absolute top-0 right-0 w-12 h-12 border-r-4 border-t-4 border-[#40BB43] rounded-tr-xl shadow-[0_0_15px_rgba(64,187,67,0.5)]" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-l-4 border-b-4 border-[#40BB43] rounded-bl-xl shadow-[0_0_15px_rgba(64,187,67,0.5)]" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-[#40BB43] rounded-br-xl shadow-[0_0_15px_rgba(64,187,67,0.5)]" />

        <div className="absolute w-full h-[2px] bg-[#40BB43]/80 top-0 animate-[scan_2s_ease-in-out_infinite] shadow-[0_0_10px_#40BB43]" />
      </div>

      <p className="absolute bottom-10 text-white/60 text-sm font-medium z-20">
        Aponte para o código QR
      </p>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 10%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }
      `}</style>
    </main>
  );
}