// app/pagamento/page.jsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Poppins } from 'next/font/google';
import { Copy, CreditCard, QrCode } from "lucide-react"; // Ícones para dar realismo

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export default function PagamentoPage() {
  const router = useRouter();
  const [itens, setItens] = useState([]);
  const [metodo, setMetodo] = useState("pix"); 
  const [copiado, setCopiado] = useState(false);

  // Código Pix Falso para simulação
  const PIX_CODE = "00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-4266141740005204000053039865802BR5913Skipow Eventos6008Sao Paulo62070503***6304E2CA";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("skipow_carrinho");
      if (data) setItens(JSON.parse(data));
    }
  }, []);

  const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  const totalFormatado = total.toLocaleString("pt-BR", { minimumFractionDigits: 2 });

  // Função para copiar o Pix
  const copiarPix = () => {
    navigator.clipboard.writeText(PIX_CODE);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  // Botão Pagar
  const handlePagar = () => {
    // Redireciona para a tela de Conclusão (onde a mágica acontece)
    router.push("/pagamento/concluido");
  };

  return (
    <main className={`min-h-screen bg-[#F9F9F9] flex justify-center ${poppins.className}`}>
      <div className="w-full max-w-md px-6 py-8 pb-24">
        
        <header className="flex items-center gap-4 mb-6">
            <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-800 font-bold border border-gray-100">
                ←
            </button>
            <h1 className="text-2xl font-extrabold text-gray-900">Pagamento</h1>
        </header>

        {/* RESUMO SIMPLES */}
        <div className="bg-white p-5 rounded-[24px] shadow-sm mb-6 border border-gray-100">
           <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 font-medium">Total a pagar</span>
              <span className="text-3xl font-extrabold text-[#40BB43]">R$ {totalFormatado}</span>
           </div>
           <div className="text-sm text-gray-400 border-t border-gray-100 pt-3">
              {itens.length} itens no pedido
           </div>
        </div>

        {/* SELEÇÃO DE MÉTODO */}
        <h3 className="text-lg font-bold text-gray-900 mb-3">Escolha como pagar</h3>
        
        <div className="space-y-4 mb-8">
            
            {/* --- OPÇÃO PIX --- */}
            <div className={`rounded-[20px] border-2 transition-all overflow-hidden ${metodo === 'pix' ? 'border-[#40BB43] bg-white shadow-md' : 'border-transparent bg-white shadow-sm'}`}>
                <div 
                    onClick={() => setMetodo("pix")}
                    className="p-4 cursor-pointer flex items-center justify-between"
                >
                    <div className="flex items-center gap-3">
                        <QrCode size={24} className={metodo === 'pix' ? "text-[#40BB43]" : "text-gray-400"} />
                        <div>
                            <p className="font-bold text-gray-800">Pix</p>
                            <p className="text-[10px] text-green-600 font-bold uppercase tracking-wide">Aprovação Imediata</p>
                        </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${metodo === 'pix' ? 'border-[#40BB43]' : 'border-gray-300'}`}>
                        {metodo === 'pix' && <div className="w-2.5 h-2.5 rounded-full bg-[#40BB43]" />}
                    </div>
                </div>

                {/* ÁREA DO PIX COPIA E COLA (Só aparece se selecionado) */}
                {metodo === 'pix' && (
                    <div className="px-4 pb-5 pt-0 animate-in slide-in-from-top-2">
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                            <p className="text-xs text-gray-500 mb-2 font-medium">Pix Copia e Cola:</p>
                            <div className="flex items-center justify-between gap-2 bg-white border border-gray-200 rounded-lg p-2">
                                <p className="text-xs text-gray-400 truncate font-mono select-all">
                                    {PIX_CODE}
                                </p>
                                <button 
                                    onClick={copiarPix}
                                    className="text-[#40BB43] hover:bg-green-50 p-1.5 rounded-md transition-colors"
                                >
                                    {copiado ? <span className="text-xs font-bold">Copiado!</span> : <Copy size={16} />}
                                </button>
                            </div>
                        </div>
                        <p className="text-[11px] text-center text-gray-400 mt-3">
                            O código expira em 10 minutos.
                        </p>
                    </div>
                )}
            </div>

            {/* --- OPÇÃO CARTÃO --- */}
            <div className={`rounded-[20px] border-2 transition-all overflow-hidden ${metodo === 'cartao' ? 'border-[#40BB43] bg-white shadow-md' : 'border-transparent bg-white shadow-sm'}`}>
                <div 
                    onClick={() => setMetodo("cartao")}
                    className="p-4 cursor-pointer flex items-center justify-between"
                >
                    <div className="flex items-center gap-3">
                        <CreditCard size={24} className={metodo === 'cartao' ? "text-[#40BB43]" : "text-gray-400"} />
                        <span className="font-bold text-gray-800">Cartão de Crédito</span>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${metodo === 'cartao' ? 'border-[#40BB43]' : 'border-gray-300'}`}>
                        {metodo === 'cartao' && <div className="w-2.5 h-2.5 rounded-full bg-[#40BB43]" />}
                    </div>
                </div>

                {/* CAMPOS DO CARTÃO (Só aparece se selecionado) */}
                {metodo === 'cartao' && (
                    <div className="px-4 pb-5 pt-0 space-y-3 animate-in slide-in-from-top-2">
                        <input type="text" placeholder="Número do Cartão" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#40BB43] focus:bg-white transition-all" />
                        <input type="text" placeholder="Nome impresso no cartão" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#40BB43] focus:bg-white transition-all" />
                        <div className="flex gap-3">
                            <input type="text" placeholder="MM/AA" className="w-1/2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#40BB43] focus:bg-white transition-all" />
                            <input type="text" placeholder="CVV" className="w-1/2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#40BB43] focus:bg-white transition-all" />
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* BOTÃO FINALIZAR */}
        <button 
            onClick={handlePagar}
            className="w-full bg-[#40BB43] hover:bg-[#36a539] text-white font-bold rounded-[20px] py-4 text-[18px] shadow-lg shadow-green-200 transition-transform active:scale-[0.98]"
        >
            {metodo === 'pix' ? 'Já fiz o pagamento' : 'Pagar Agora'}
        </button>

      </div>
    </main>
  );
}