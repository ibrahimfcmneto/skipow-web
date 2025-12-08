"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

  // altera quantidade de itens no carrinho
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

  // total do carrinho
  const total = itens.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  const totalFormatado = total.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
  });

  // >>> FUNÇÃO CORRIGIDA <<<
  const handleFinalizarCompra = () => {
    if (typeof window === "undefined") return;

    if (itens.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }

    // 1. Carrega fichas já existentes
    const existentesJSON = localStorage.getItem("skipow_fichas");
    const fichasExistentes = existentesJSON ? JSON.parse(existentesJSON) : [];

    // 2. Descobre qual é o último número usado nos IDs SKP-000X
    let ultimoNumero = 0;
    fichasExistentes.forEach((ficha) => {
      const match = String(ficha.id).match(/SKP-(\d+)/);
      if (match) {
        const n = parseInt(match[1], 10);
        if (n > ultimoNumero) ultimoNumero = n;
      }
    });

    const novasFichas = [];

    // 3. Para cada item do carrinho, gera UMA ficha por unidade comprada
    itens.forEach((item) => {
      for (let i = 0; i < item.quantidade; i++) {
        ultimoNumero += 1; // incrementa 1 a cada ficha

        const codigoFicha = `SKP-${String(ultimoNumero).padStart(4, "0")}`;

        novasFichas.push({
          id: codigoFicha, // usado na URL /fichas/[id]
          codigo: codigoFicha,
          nome: item.nome, // Cerveja, Red Bull, etc
          imagem: item.imagem,
          evento: "De Férias com a FACECA",
          status: "disponivel",
        });
      }
    });

    // 4. Junta fichas antigas + novas e salva
    const todasAsFichas = [...fichasExistentes, ...novasFichas];
    localStorage.setItem("skipow_fichas", JSON.stringify(todasAsFichas));

    // 5. Limpa o carrinho e redireciona
    localStorage.removeItem("skipow_carrinho");
    setItens([]);
    alert("Compra realizada com sucesso! Suas fichas foram geradas.");
    router.push("/fichas");
  };

  return (
    <main className="min-h-screen bg-white flex justify-center">
      {/* container tipo celular */}
      <div className="w-full max-w-md px-5 pb-10">
        {/* HEADER */}
        <header className="pt-6 mb-4 flex items-center justify-between">
          {/* botão voltar circular */}
          <button
            onClick={() => router.back()}
            className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center"
          >
            <span className="text-2xl font-bold text-gray-900">←</span>
          </button>

          <div className="flex-1 flex flex-col items-center">
            <h1 className="text-[26px] font-extrabold text-gray-900 leading-tight">
              Carrinho de Compras
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Total de itens: {itens.reduce((acc, i) => acc + i.quantidade, 0)}
            </p>
          </div>

          {/* espaço à direita só para equilibrar o header */}
          <div className="w-11 h-11" />
        </header>

        {/* SLOGAN */}
        <p className="text-center text-[15px] text-gray-700 mb-4">
          “Menos fila.{" "}
          <span className="text-[#40BB43] font-semibold">Mais festa.</span>”
        </p>

        {/* LISTA DE ITENS */}
        <div className="space-y-4 mb-6 mt-3">
          {itens.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
              Seu carrinho está vazio.
            </p>
          )}

          {itens.map((item, index) => {
            const subtotal = item.preco * item.quantidade;
            const subtotalFormatado = subtotal.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            });

            return (
              <div
                key={index}
                className="bg-white rounded-[26px] shadow-[0_15px_35px_rgba(0,0,0,0.08)] px-4 py-4 flex items-center gap-4"
              >
                {/* imagem */}
                <div className="w-20 h-20 flex items-center justify-center">
                  <Image
                    src={item.imagem}
                    alt={item.nome}
                    width={80}
                    height={80}
                    className="object-contain max-h-20"
                  />
                </div>

                {/* infos */}
                <div className="flex-1">
                  <p className="text-[20px] font-extrabold text-gray-900 leading-tight mb-2">
                    {item.nome}
                  </p>
                  <p className="text-[18px] text-gray-900">
                    R$ {subtotalFormatado}
                  </p>
                </div>

                {/* quantidade */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alterarQuantidade(index, -1)}
                    className="w-9 h-9 border border-gray-900 rounded-md flex items-center justify-center text-lg font-bold text-black"
                  >
                    –
                  </button>
                  <span className="min-w-[24px] text-center text-[20px] font-semibold text-black">
                    {item.quantidade}
                  </span>
                  <button
                    onClick={() => alterarQuantidade(index, 1)}
                    className="w-9 h-9 border border-gray-900 rounded-md flex items-center justify-center text-lg font-bold text-black"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* TEXTO SOBRE QR CODE */}
        <p className="text-center text-[14px] text-gray-600 mb-6 px-2">
          *Após o pagamento,{" "}
          <span className="font-semibold">suas fichas</span> serão geradas{" "}
          <span className="font-semibold">em formato de QR Code.</span> Basta
          mostrar no bar para retirar suas bebidas.
        </p>

        {/* TOTAL */}
        <div className="border-t border-gray-200 pt-5 mt-2">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[24px] font-extrabold text-gray-900">
              Total
            </span>
            <span className="text-[26px] font-extrabold text-[#40BB43]">
              R$ {totalFormatado}
            </span>
          </div>

          {/* BOTÃO FINALIZAR */}
          <button
            onClick={handleFinalizarCompra}
            className="w-full bg-[#40BB43] text-white font-semibold rounded-2xl py-3 text-lg mt-6"
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </main>
  );
}
