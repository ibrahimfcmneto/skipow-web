// app/carrinho/page.jsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Poppins } from 'next/font/google';
import { ChevronLeft } from "lucide-react"; // Importando o ícone correto

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export default function CarrinhoPage() {
  const router = useRouter();
  const [itens, setItens] = useState([]);

  // Carrega carrinho do localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("skipow_carrinho");
      if (data) {
        setItens(JSON.parse(data));
      }
    }
  }, []);

  function atualizarStorage(novosItens) {
    setItens(novosItens);
    if (typeof window !== "undefined") {
      localStorage.setItem("skipow_carrinho", JSON.stringify(novosItens));
    }
  }

  function alterarQuantidade(index, delta) {
    const novos = [...itens];
    const atual = novos[index];

    const novaQtd = atual.quantidade + delta;
    if (novaQtd <= 0) {
      novos.splice(index, 1); // remove item
    } else {
      atual.quantidade = novaQtd;
    }
    atualizarStorage(novos);
  }

  // Cálculos de Totais
  const total = itens.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );
  
  const totalFormatado = total.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
  });

  const handleFinalizarCompra = () => {
    if (typeof window === "undefined") return;

    if (itens.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }
    
    // Redireciona direto para o pagamento
    router.push("/pagamento");
  };

  return (
    <main className={`min-h-screen bg-white flex justify-center ${poppins.className}`}>
      <div className="w-full max-w-md px-5 pb-10">
        
        {/* HEADER */}
        <header className="pt-6 mb-4 flex items-center justify-between">
          
          {/* BOTÃO VOLTAR (Estilo atualizado com Chevron) */}
          <button
            onClick={() => router.push('/cardapio')}
            className="w-10 h-10 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] flex items-center justify-center text-gray-900 hover:bg-gray-50 transition-transform active:scale-95"
          >
            <ChevronLeft size={24} strokeWidth={2.5} className="-ml-0.5" />
          </button>

          <div className="ml-auto flex flex-col items-end text-right">
            <h1 className="text-[26px] font-extrabold text-gray-900 leading-tight">
              Carrinho
            </h1>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              Total de itens: {itens.reduce((acc, i) => acc + i.quantidade, 0)}
            </p>
          </div>

          <div className="w-10 h-10 hidden sm:block" />
        </header>

        {/* SLOGAN */}
        <p className="text-center text-[22px] text-gray-700 mb-4 font-medium tracking-tight">
          “Menos fila.{" "}
          <span className="text-[#40BB43] font-extrabold">Mais festa.</span>”
        </p>

        {/* LISTA DE ITENS */}
        <div className="space-y-4 mb-6 mt-6">
          {itens.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-400 font-medium text-lg">
                Seu carrinho está vazio.
              </p>
              <button 
                onClick={() => router.push('/cardapio')}
                className="mt-4 text-[#40BB43] font-bold hover:underline"
              >
                Voltar para o cardápio
              </button>
            </div>
          )}

          {itens.map((item, index) => {
            const subtotal = item.preco * item.quantidade;
            const subtotalFormatado = subtotal.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            });

            return (
              <div
                key={index}
                className="bg-white rounded-[26px] shadow-[0_8px_25px_rgba(0,0,0,0.06)] px-4 py-5 flex items-center gap-4 border border-gray-50"
              >
                {/* imagem */}
                <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-2xl p-1">
                  <Image
                    src={item.imagem}
                    alt={item.nome}
                    width={80}
                    height={80}
                    className="object-contain max-h-16 w-auto"
                  />
                </div>

                {/* infos */}
                <div className="flex-1 min-w-0">
                  <p className="text-[18px] font-extrabold text-gray-900 leading-tight mb-1 truncate">
                    {item.nome}
                  </p>
                  <p className="text-[16px] text-gray-500 font-medium">
                    R$ {subtotalFormatado}
                  </p>
                </div>

                {/* quantidade */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => alterarQuantidade(index, -1)}
                    className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center text-lg font-bold text-gray-600 hover:bg-gray-100 active:scale-95 transition-all"
                  >
                    –
                  </button>
                  <span className="min-w-[20px] text-center text-[18px] font-bold text-gray-900">
                    {item.quantidade}
                  </span>
                  <button
                    onClick={() => alterarQuantidade(index, 1)}
                    className="w-8 h-8 border border-gray-900 bg-gray-900 rounded-lg flex items-center justify-center text-lg font-bold text-white hover:bg-black active:scale-95 transition-all"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* TEXTO E TOTAL */}
        {itens.length > 0 && (
          <>
            <p className="text-center text-[13px] text-gray-400 mb-8 px-4 leading-relaxed">
              *Após o pagamento, <span className="font-bold text-gray-600">suas fichas</span> serão geradas <span className="font-bold text-gray-600">automaticamente</span>. Basta mostrar o QR Code no bar.
            </p>

            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-center justify-between mb-6 px-1">
                <span className="text-[22px] font-bold text-gray-400">
                  Total
                </span>
                <span className="text-[32px] font-extrabold text-[#40BB43] tracking-tight">
                  R$ {totalFormatado}
                </span>
              </div>

              <button
                onClick={handleFinalizarCompra}
                className="w-full bg-[#40BB43] hover:bg-[#36a539] text-white font-bold rounded-[20px] py-4 text-[18px] shadow-lg shadow-green-200 transition-transform active:scale-[0.98]"
              >
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}