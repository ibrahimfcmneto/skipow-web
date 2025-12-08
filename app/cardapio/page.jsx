"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PRODUTOS = [
  { nome: "Corote", preco: 6, imagem: "/corote.png" },
  { nome: "Copão", preco: 15, imagem: "/copao.png" },
  { nome: "Red Bull", preco: 12, imagem: "/redbull.png" },
  { nome: "Cerveja", preco: 6, imagem: "/cerveja.png" },
  { nome: "Licor 43", preco: 250, imagem: "/licor43.png" },
  { nome: "Combo Red Lable", preco: 250, imagem: "/combo-red.png" },
];

export default function CardapioPage() {
  const router = useRouter();

  const [abaAtiva, setAbaAtiva] = useState("Bebidas");
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [quantidade, setQuantidade] = useState(1);

    function salvarCarrinhoENavegar() {
    if (!produtoSelecionado) return;

    const item = {
      nome: produtoSelecionado.nome,
      preco: produtoSelecionado.preco,
      quantidade,
      imagem: produtoSelecionado.imagem,
    };

    if (typeof window !== "undefined") {
      const carrinhoAtual =
        JSON.parse(localStorage.getItem("skipow_carrinho") || "[]");

      carrinhoAtual.push(item);
      localStorage.setItem(
        "skipow_carrinho",
        JSON.stringify(carrinhoAtual)
      );
    }

    // vai para a página de carrinho
    router.push("/carrinho");
  }


  function abrirModal(produto) {
    setProdutoSelecionado(produto);
    setQuantidade(1);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
  }

  function adicionarQuantidade(delta) {
    setQuantidade((q) => Math.max(1, q + delta));
  }

  const total = produtoSelecionado ? produtoSelecionado.preco * quantidade : 0;

  return (
    <main className="min-h-screen bg-white flex justify-center">
      {/* container de celular */}
      <div className="w-full max-w-md px-5 pb-10">
        {/* HEADER */}
        <header className="pt-6 mb-5 flex items-center justify-between">
          {/* logo */}
          <Image
            src="/logo-skipow.png"
            alt="Skipow"
            width={120}
            height={36}
          />

          <div className="flex items-center gap-3">
            {/* botão minhas fichas */}
            <button
              onClick={() => router.push("/fichas")}
              className="hidden sm:inline-block bg-white shadow-md px-5 py-2 rounded-xl text-sm font-semibold text-gray-900"
            >
              Minhas Fichas
            </button>

            {/* avatar + menu */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gray-300" />
              <div className="flex flex-col gap-[3px]">
                <span className="w-5 h-[2px] bg-gray-900 rounded" />
                <span className="w-5 h-[2px] bg-gray-900 rounded" />
                <span className="w-5 h-[2px] bg-gray-900 rounded" />
              </div>
            </div>
          </div>
        </header>

        {/* botão “Minhas Fichas” flutuando (igual ao layout) */}
        <div className="flex justify-center mb-5 sm:hidden">
          <button
            onClick={() => router.push("/fichas")}
            className="bg-white shadow-md px-5 py-2 rounded-xl text-sm font-semibold text-gray-900"
          >
            Minhas Fichas
          </button>
        </div>

        {/* BUSCA */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Pesquisar item"
            className="w-full bg-white border border-gray-300 rounded-full py-3 pl-4 pr-11 text-[15px] text-gray-800 placeholder:text-gray-400 outline-none"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-500">
            🔍
          </span>
        </div>

        {/* ABAS */}
        <div className="flex justify-between mb-8">
          {["Combos", "Bebidas", "Drinks", "Agua"].map((aba) => {
            const ativa = aba === abaAtiva;
            return (
              <button
                key={aba}
                onClick={() => setAbaAtiva(aba)}
                className={`flex-1 mx-[3px] py-2 rounded-lg text-[15px] font-semibold ${
                  ativa
                    ? "bg-black text-white"
                    : "bg-[#E5E7EB] text-gray-900"
                }`}
              >
                {aba === "Agua" ? "Agua" : aba}
              </button>
            );
          })}
        </div>

        {/* GRID DE PRODUTOS */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-6">
          {PRODUTOS.map((produto) => (
            <button
              key={produto.nome}
              onClick={() => abrirModal(produto)}
              className="bg-white rounded-[24px] shadow-[0_10px_25px_rgba(0,0,0,0.08)] pt-7 pb-6 px-4 flex flex-col items-center"
            >
              <Image
                src={produto.imagem}
                alt={produto.nome}
                width={180}
                height={180}
                className="w-24 h-24 object-contain mb-4"
              />

              <span className="text-[20px] font-extrabold text-gray-900 leading-tight text-center">
                {produto.nome}
              </span>
              <span className="mt-1 text-[18px] text-gray-900">
                R$ {produto.preco}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {modalAberto && produtoSelecionado && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-5">
          <div className="bg-white rounded-[32px] w-full max-w-sm pt-7 pb-7 px-6 relative">
            {/* X fechar */}
            <button
              onClick={fecharModal}
              className="absolute top-5 right-6 text-2xl font-semibold text-gray-900"
            >
              X
            </button>

            {/* título */}
            <h2 className="text-center text-[28px] font-extrabold text-gray-900 mb-4">
              {produtoSelecionado.nome}
            </h2>

            {/* imagem grande */}
            <Image
              src={produtoSelecionado.imagem}
              alt={produtoSelecionado.nome}
              width={240}
              height={240}
              className="mx-auto mb-4"
            />

            {/* preço unitário */}
            <p className="text-center text-[16px] text-gray-700 mb-3">
              Preço unitário:{" "}
              <span className="font-semibold">
                R$ {produtoSelecionado.preco},00
              </span>
            </p>

            {/* QUANTIDADE */}
            <div className="flex items-center justify-center gap-10 mb-5 mt-2">
              {/* Botão – */}
              <button
                onClick={() => adicionarQuantidade(-1)}
                className="w-12 h-12 border-2 border-black rounded-md flex items-center justify-center text-3xl font-bold text-black"
              >
                –
              </button>

              {/* Número */}
              <span className="text-4xl font-extrabold text-black leading-none">
                {quantidade}
              </span>

              {/* Botão + */}
              <button
                onClick={() => adicionarQuantidade(1)}
                className="w-12 h-12 border-2 border-black rounded-md flex items-center justify-center text-3xl font-bold text-black"
              >
                +
              </button>
            </div>


            {/* total */}
            <p className="text-center text-[18px] text-gray-700 mb-1">
              Total
            </p>
            <p className="text-center text-[32px] font-extrabold text-[#40BB43] mb-6">
              R$ {total}
            </p>

            {/* botão adicionar */}
            <button
              onClick={salvarCarrinhoENavegar}
              className="w-full bg-[#40BB43] text-white font-semibold text-[18px] py-3 rounded-xl"
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
