"use client";

import { useState } from "react";
import { Poppins } from 'next/font/google';
import { buscarLinkPorTelefone } from "@/app/actions/admin";
import { 
  Search, 
  Smartphone, 
  Copy, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Loader2,
  ExternalLink,
  User,
  ArrowLeft
} from "lucide-react";
import { useRouter } from "next/navigation";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export default function ResgatePage() {
  const router = useRouter();
  const [telefone, setTelefone] = useState("");
  const [resultado, setResultado] = useState<any>(null); // Correção de tipo aqui também
  const [loading, setLoading] = useState(false);
  const [copiado, setCopiado] = useState(false);

  // --- CORREÇÃO DO ERRO AQUI: Adicionado ': any' ---
  const handleTelefoneChange = (e: any) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    
    // Máscara visual (XX) XXXXX-XXXX
    if (value.length > 2) value = value.replace(/^(\d{2})(\d)/, "($1) $2");
    if (value.length > 9) value = value.replace(/(\d{5})(\d{4})$/, "$1-$2");
    
    setTelefone(value);
  };

  // --- CORREÇÃO DO ERRO AQUI: Adicionado ': any' ---
  async function handleBuscar(e: any) {
    e.preventDefault();
    if (telefone.length < 14) return;

    setLoading(true);
    setResultado(null);
    setCopiado(false);

    // Limpa para enviar só números
    const telLimpo = telefone.replace(/\D/g, "");
    
    const resp = await buscarLinkPorTelefone(telLimpo);
    setResultado(resp);
    setLoading(false);
  }

  const copiarLink = () => {
    if (!resultado?.link) return;
    navigator.clipboard.writeText(resultado.link);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <main className={`min-h-screen bg-[#F2F2F7] flex flex-col items-center justify-center p-6 relative ${poppins.className}`}>
      
      <div className="w-full max-w-md relative z-10">
        
        {/* Header Simples */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[22px] bg-white text-[#40BB43] shadow-[0_10px_30px_rgba(0,0,0,0.06)] mb-4">
            <ShieldCheck size={32} strokeWidth={2} />
          </div>
          <h1 className="text-[24px] font-bold text-[#1D1D1F] tracking-tight">Recuperação de Fichas</h1>
          <p className="text-gray-400 text-sm mt-1">Painel Administrativo</p>
        </div>

        {/* Card Principal de Busca */}
        <div className="bg-white rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-gray-100 animate-in zoom-in duration-300">
          
          <form onSubmit={handleBuscar} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                Celular do Cliente
              </label>
              <div className="relative group">
                <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#40BB43] transition-colors" size={20} />
                <input
                  type="tel"
                  required
                  placeholder="(11) 99999-9999"
                  className="w-full bg-gray-50 border border-gray-100 text-[#1D1D1F] rounded-2xl py-4 pl-12 pr-4 text-[17px] font-semibold placeholder:text-gray-300 focus:outline-none focus:border-[#40BB43] focus:bg-white focus:ring-1 focus:ring-[#40BB43] transition-all"
                  value={telefone}
                  onChange={handleTelefoneChange}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading || telefone.length < 14}
              className="w-full h-14 bg-[#40BB43] hover:bg-[#36a539] disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-2xl text-[16px] shadow-lg shadow-[#40BB43]/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Buscando...</span>
                </>
              ) : (
                <>
                  <Search size={20} />
                  <span>Localizar Fichas</span>
                </>
              )}
            </button>
          </form>

        </div>

        {/* Área de Resultado */}
        {resultado && (
          <div className="mt-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
            {resultado.sucesso ? (
              <div className="bg-white border border-green-100 rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(64,187,67,0.15)]">
                
                {/* Header do Card de Sucesso */}
                <div className="bg-green-50/50 p-5 border-b border-green-100 flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-[#40BB43] flex items-center justify-center shadow-md text-white">
                      <User size={24} />
                   </div>
                   <div>
                      <h3 className="text-[#1D1D1F] font-bold text-lg">Cliente Encontrado</h3>
                      <p className="text-[#40BB43] text-sm font-bold flex items-center gap-1.5">
                        <CheckCircle2 size={16} />
                        {resultado.qtdFichas} fichas disponíveis
                      </p>
                   </div>
                </div>

                {/* Corpo do Card */}
                <div className="p-5 space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-gray-400 text-[10px] uppercase font-bold mb-2 tracking-wider">
                      Link de Resgate
                    </p>
                    <p className="text-gray-600 font-mono text-xs break-all leading-relaxed select-all">
                      {resultado.link}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={copiarLink}
                      className={`flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all border shadow-sm ${
                        copiado 
                        ? 'bg-[#40BB43] border-[#40BB43] text-white' 
                        : 'bg-white text-gray-700 border-gray-100 hover:bg-gray-50'
                      }`}
                    >
                      {copiado ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                      {copiado ? "Copiado!" : "Copiar"}
                    </button>
                    
                    <a
                      href={resultado.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm bg-gray-900 text-white shadow-lg hover:bg-black transition-all"
                    >
                      <ExternalLink size={18} />
                      Abrir
                    </a>
                  </div>

                  <p className="text-gray-400 text-xs text-center leading-relaxed px-4">
                    Abra este link no celular do cliente para logar automaticamente.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-red-100 rounded-[24px] p-6 flex items-start gap-4 shadow-xl shadow-red-500/5">
                 <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0 text-red-500">
                    <AlertCircle size={20} />
                 </div>
                 <div>
                    <h3 className="text-gray-900 font-bold text-lg">Não encontrado</h3>
                    <p className="text-gray-500 text-sm mt-1 leading-snug">
                      {resultado.erro || "Nenhuma compra vinculada a este número de telefone."}
                    </p>
                 </div>
              </div>
            )}
          </div>
        )}

        {/* Botão Voltar Discreto */}
        <div className="mt-12 text-center">
             <button 
                onClick={() => router.push('/fichas')}
                className="text-gray-400 text-sm hover:text-gray-600 font-medium transition-colors flex items-center justify-center gap-2 mx-auto"
             >
                <ArrowLeft size={16} /> Voltar para Home
             </button>
        </div>

      </div>
    </main>
  );
}