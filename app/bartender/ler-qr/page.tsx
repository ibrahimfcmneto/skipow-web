"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Poppins } from 'next/font/google';
import jsQR from "jsqr"; // Importando a biblioteca que instalamos

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export default function LerQrCodePage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [permissaoErro, setPermissaoErro] = useState(false);
  const [lendo, setLendo] = useState(true); // Controle para não ler várias vezes seguidas

  // Função para processar o QR Code encontrado
  const validarQrCode = (codigo: string) => {
    if (!lendo) return;
    setLendo(false); // Trava para não ler de novo
    
    // Feedback tátil (vibrar) se o celular suportar
    if (navigator.vibrate) navigator.vibrate(200);

    console.log("QR Code detectado:", codigo);
    
    // Redireciona para a página de sucesso
    router.push("/bartender/validado");
  };

  useEffect(() => {
    let stream: MediaStream | null = null;
    let animationFrameId: number;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "environment" } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // Importante: garantir que o vídeo toque sem áudio para não ter bloqueio de autoplay
          videoRef.current.setAttribute("playsinline", "true"); 
          videoRef.current.play();
          requestAnimationFrame(tick); // Começa o loop de escaneamento
        }
      } catch (err) {
        console.error("Erro ao acessar câmera:", err);
        setPermissaoErro(true);
      }
    };

    // Função de Loop que verifica cada frame do vídeo
    const tick = () => {
      if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        // Cria um canvas em memória para analisar a imagem atual do vídeo
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          
          // Tenta encontrar um QR Code na imagem
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
          });

          if (code) {
            // SE ACHOU UM QR CODE
            validarQrCode(code.data);
            return; // Para o loop
          }
        }
      }
      // Se não achou, agenda a próxima verificação
      animationFrameId = requestAnimationFrame(tick);
    };

    startCamera();

    // Limpeza ao sair da página
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={`fixed inset-0 bg-black flex flex-col items-center justify-center ${poppins.className}`}>
      
      {/* 1. HEADER / VOLTAR */}
      <div className="absolute top-0 left-0 w-full p-6 z-20 flex items-center">
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
        </button>
      </div>

      {/* 2. TEXTO INSTRUÇÃO */}
      <div className="absolute top-24 w-full text-center z-20">
        <h2 className="text-white text-[18px] font-medium tracking-wide drop-shadow-md">
          Escaneie a ficha
        </h2>
      </div>

      {/* 3. VÍDEO (CÂMERA) */}
      <div className="absolute inset-0 z-0">
        {!permissaoErro ? (
          <video 
            ref={videoRef}
            className="w-full h-full object-cover opacity-80"
            playsInline // Importante para iOS não abrir fullscreen
            muted
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-400 p-10 text-center">
            <p>Não foi possível acessar a câmera. Verifique as permissões.</p>
          </div>
        )}
      </div>

      {/* 4. MOLDURA DE ESCANEAMENTO (OVERLAY) */}
      {/* Mantive o clique manual como fallback caso a luz esteja ruim */}
      <div 
        className="relative z-10 w-[280px] h-[280px] cursor-pointer"
        onClick={() => validarQrCode("simulacao-manual")}
      >
        {/* Cantos Verdes */}
        <div className="absolute top-0 left-0 w-12 h-12 border-l-4 border-t-4 border-[#40BB43] rounded-tl-xl shadow-[0_0_15px_rgba(64,187,67,0.5)]" />
        <div className="absolute top-0 right-0 w-12 h-12 border-r-4 border-t-4 border-[#40BB43] rounded-tr-xl shadow-[0_0_15px_rgba(64,187,67,0.5)]" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-l-4 border-b-4 border-[#40BB43] rounded-bl-xl shadow-[0_0_15px_rgba(64,187,67,0.5)]" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-[#40BB43] rounded-br-xl shadow-[0_0_15px_rgba(64,187,67,0.5)]" />

        {/* Linha de Scan */}
        <div className="absolute w-full h-[2px] bg-[#40BB43]/80 top-0 animate-[scan_2s_ease-in-out_infinite] shadow-[0_0_10px_#40BB43]" />
      </div>

      <p className="absolute bottom-10 text-white/60 text-sm font-medium z-20">
        Aponte para qualquer QR Code
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