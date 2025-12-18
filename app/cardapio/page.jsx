// app/cardapio/page.jsx
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

      // Adiciona o novo item ao carrinho.
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

  // Preço total formatado
  const total = produtoSelecionado ? produtoSelecionado.preco * quantidade : 0;
  const totalFormatado = total.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });


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

            {/* Botão Minhas Fichas Centralizado */}
            <button
              onClick={() => router.push("/fichas")}
              className="bg-white shadow-md px-4 py-2 rounded-xl text-sm font-semibold text-gray-900"
            >
              Minhas Fichas
            </button>

            {/* Avatar e Carrinho (Nesta ordem) */}
            <div className="flex items-center gap-4">
              
              {/* 1. Avatar com Imagem */}
              <div className="relative w-9 h-9">
                <Image
                  src="/avatar.png" // <--- Certifica-te que o nome do arquivo na pasta public é este
                  alt="Avatar"
                  fill // Isso faz a imagem preencher todo o espaço da div
                  className="rounded-full object-cover" // Deixa redondo e recorta a imagem para caber
                />
              </div>

              {/* 2. Botão do Carrinho (Agora vem depois) */}
              <button 
                onClick={() => router.push("/carrinho")} 
                className="relative text-gray-900 hover:text-[#40BB43] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </button>
              
            </div>
        </header>


        {/* BUSCA (LUPA SVG) */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Pesquisar item"
            className="w-full bg-white border border-gray-300 rounded-full py-3 pl-4 pr-11 text-[15px] text-gray-800 placeholder:text-gray-400 outline-none"
          />
          {/* LUPA SVG */}
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-900">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5"
            >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
        </div>

        {/* ABAS */}
        <div className="flex justify-between mb-8">
          {["Combos", "Bebidas", "Drinks", "Água"].map((aba) => {
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
                {aba}
              </button>
            );
          })}
        </div>

        {/* GRID DE PRODUTOS (AJUSTADO PARA ALTURA FIXA) */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-6">
          {PRODUTOS.map((produto) => (
            <button
              key={produto.nome}
              onClick={() => abrirModal(produto)}
              // MODIFICAÇÃO CHAVE: Altura fixa h-64 (cerca de 256px) para padronizar todos os cards
              className="bg-white rounded-[24px] shadow-[0_10px_25px_rgba(0,0,0,0.08)] px-4 h-64 flex flex-col items-center justify-between py-6"
            >
              {/* Imagem Container - Adicionamos flex-grow-0 e altura fixa para a imagem */}
              <div className="w-full h-28 flex items-center justify-center flex-grow-0">
                  <Image
                      src={produto.imagem}
                      alt={produto.nome}
                      width={180}
                      height={180}
                      // Forçamos a altura e largura máxima da imagem dentro do seu container
                      className="object-contain max-h-full max-w-full"
                  />
              </div>


              <div className="flex flex-col items-center flex-grow-0 mt-4">
                  <span className="text-[20px] font-extrabold text-gray-900 leading-tight text-center">
                    {produto.nome}
                  </span>
                  <span className="mt-1 text-[18px] text-gray-900">
                    R$ {produto.preco},00
                  </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* MODAL (Mantido) */}
      {modalAberto && produtoSelecionado && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-5">
          {/* AJUSTE: Aumentando o rounded para 30px (mais perto do wireframe) */}
          <div className="bg-white rounded-[30px] w-full max-w-sm pt-7 pb-7 px-6 relative">
            {/* X fechar */}
            <button
              onClick={fecharModal}
              // AJUSTE: X mais sutil e maior
              className="absolute top-5 right-6 text-3xl font-light text-gray-900" 
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
            <div className="flex items-center justify-center gap-8 mb-5 mt-4"> {/* Ajuste no gap e mt */}
              {/* Botão – */}
              <button
                onClick={() => adicionarQuantidade(-1)}
                // AJUSTE: Aumentando o arredondamento (rounded-xl) e borda mais escura
                className="w-12 h-12 border-2 border-gray-900 rounded-xl flex items-center justify-center text-3xl font-bold text-black"
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
                // AJUSTE: Aumentando o arredondamento (rounded-xl) e borda mais escura
                className="w-12 h-12 border-2 border-gray-900 rounded-xl flex items-center justify-center text-3xl font-bold text-black"
              >
                +
              </button>
            </div>


            {/* total */}
            <p className="text-center text-[18px] text-gray-700 mb-1">
              Total
            </p>
            {/* AJUSTE: Cor do total para VERDE (RGB 64, 187, 67) e tamanho da fonte */}
            <p className="text-center text-[38px] font-extrabold text-[#40BB43] mb-6">
              R$ {totalFormatado}
            </p>

            {/* botão adicionar */}
            <button
              onClick={salvarCarrinhoENavegar}
              // AJUSTE: Cor e arredondamento (rounded-2xl) para se assemelhar ao wireframe
              className="w-full bg-[#40BB43] text-white font-semibold text-[18px] py-4 rounded-2xl" 
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      )}
    </main>
  );
}