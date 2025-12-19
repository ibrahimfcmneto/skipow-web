// app/cardapio/page.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// --- LISTA DE PRODUTOS ---
const PRODUTOS = [
  // 1. PROMOÇÕES
  { 
    nome: "Combo 3 Corotes", 
    preco: 15, 
    imagem: "/combo_3_corotes.png", 
    categorias: ["Promoções"],
    // Instruções para o sistema
    isCombo: true,
    comboQtd: 3,                 // Vale 3 fichas
    comboItemName: "Corote",     // O nome que vai na ficha
    comboItemImage: "/corote.png"// A imagem que vai na ficha
  },
  { 
    nome: "Combo 3 Cervejas", 
    preco: 15, 
    imagem: "/combo_3_cervejas.png", 
    categorias: ["Promoções"],
    isCombo: true,
    comboQtd: 3,
    comboItemName: "Cerveja Lata",
    comboItemImage: "/cerveja.png"
  },
  { 
    nome: "Combo 3 Beats", 
    preco: 30, 
    imagem: "/combo_3_skol_beats.png", 
    categorias: ["Promoções"],
    isCombo: true,
    comboQtd: 3,
    comboItemName: "Skol Beats",
    comboItemImage: "/skol_beats.png"
  },

  // 2. ÁGUA
  { nome: "Água Mineral", preco: 4, imagem: "/agua.png", categorias: ["Água"] },

  // 3. BEBIDAS
  { nome: "Corote", preco: 6, imagem: "/corote.png", categorias: ["Bebidas"] },
  { nome: "Cerveja Lata", preco: 6, imagem: "/cerveja.png", categorias: ["Bebidas"] },
  { nome: "Skol Beats", preco: 12, imagem: "/skol_beats.png", categorias: ["Bebidas"] },
  { nome: "Copão", preco: 15, imagem: "/copao.png", categorias: ["Bebidas"] },
  
  // 4. PREMIUM
  { nome: "Red Bull", preco: 12, imagem: "/redbull.png", categorias: ["Bebidas", "Premium"] },
  { nome: "Combo Red Label", preco: 250, imagem: "/combo_red_label.png", categorias: ["Premium"] },
  { nome: "Combo Smirnoff", preco: 150, imagem: "/combo_smirnoff.png", categorias: ["Premium"] },
  { nome: "Licor 43", preco: 250, imagem: "/licor43.png", categorias: ["Premium"] },
];

export default function CardapioPage() {
  const router = useRouter();

  const [abaAtiva, setAbaAtiva] = useState("Todos");
  const [textoBusca, setTextoBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [quantidade, setQuantidade] = useState(1);

  // Filtro
  const produtosFiltrados = PRODUTOS.filter((produto) => {
    const buscaOk = produto.nome.toLowerCase().includes(textoBusca.toLowerCase());
    const categoriaOk = abaAtiva === "Todos" || produto.categorias.includes(abaAtiva);
    return buscaOk && categoriaOk;
  });

  // --- FUNÇÃO CORRIGIDA: SALVAR COMO COMBO ---
  function salvarCarrinhoENavegar() {
    if (!produtoSelecionado) return;

    const itemParaAdicionar = {
      nome: produtoSelecionado.nome,
      preco: produtoSelecionado.preco,
      quantidade: quantidade,
      imagem: produtoSelecionado.imagem,
      
      // DADOS OCULTOS
      isCombo: produtoSelecionado.isCombo || false,
      comboQtd: produtoSelecionado.comboQtd || 1,
      comboItemName: produtoSelecionado.comboItemName || "",
      comboItemImage: produtoSelecionado.comboItemImage || ""
    };

    if (typeof window !== "undefined") {
      const carrinhoAtual = JSON.parse(
        localStorage.getItem("skipow_carrinho") || "[]"
      );

      const indexExistente = carrinhoAtual.findIndex((i) => i.nome === itemParaAdicionar.nome);

      if (indexExistente >= 0) {
        carrinhoAtual[indexExistente].quantidade += itemParaAdicionar.quantidade;
      } else {
        carrinhoAtual.push(itemParaAdicionar);
      }

      localStorage.setItem("skipow_carrinho", JSON.stringify(carrinhoAtual));
    }

    router.push("/carrinho");
  }

  // Funções Auxiliares
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
  const totalFormatado = total.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <main className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-md px-5 pb-10">
        
        {/* HEADER COM LINHA DIVISÓRIA ADICIONADA */}
        {/* Adicionei 'border-b border-gray-100 pb-4' para criar a linha */}
        <header className="pt-6 mb-5 pb-4 border-b-2 border-gray-200 flex items-center justify-between">
          <Image src="/logo-skipow.png" alt="Skipow" width={120} height={36} />
          
          <button onClick={() => router.push("/fichas")} className="bg-white shadow-md px-4 py-2 rounded-xl text-sm font-semibold text-gray-900 transition-transform active:scale-95">
            Minhas Fichas
          </button>
          
          <div className="flex items-center gap-4">
            <div onClick={() => router.push("/perfil")} className="relative w-9 h-9 cursor-pointer hover:opacity-80 transition-opacity">
              <Image src="/avatar.png" alt="Avatar" fill className="rounded-full object-cover border border-gray-100" />
            </div>
            <button onClick={() => router.push("/carrinho")} className="relative text-gray-900 hover:text-[#40BB43] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            </button>
          </div>
        </header>

        {/* BUSCA */}
        <div className="relative mb-6">
          <input type="text" placeholder="Pesquisar item" value={textoBusca} onChange={(e) => setTextoBusca(e.target.value)} className="w-full bg-gray-100 border border-transparent rounded-full py-3 pl-4 pr-11 text-[15px] text-gray-900 placeholder:text-gray-500 outline-none transition-all duration-300 ease-out focus:bg-white focus:border-gray-200 focus:shadow-[0_4px_20px_rgba(0,0,0,0.1)] focus:scale-[1.01]" />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          </span>
        </div>

        {/* ABAS */}
        <div className="mb-8 overflow-x-auto whitespace-nowrap pb-2 [&::-webkit-scrollbar]:hidden">
          <div className="flex space-x-2">
            {["Todos", "Promoções", "Bebidas", "Premium", "Água"].map((aba) => {
                const ativa = aba === abaAtiva;
                return (
                <button key={aba} onClick={() => setAbaAtiva(aba)} className={`px-5 py-3 text-[15px] font-bold tracking-wide transition-all duration-300 ease-spring flex-shrink-0 active:scale-95 ${ativa ? "bg-black text-white rounded-[10px] shadow-[0_8px_20px_rgba(0,0,0,0.15)] transform scale-[1.02]" : "bg-[#E5E7EB] text-gray-900 hover:bg-[#d1d5db]"}`}>
                    {aba}
                </button>
                );
            })}
          </div>
        </div>

        {/* GRID PRODUTOS */}
        <div className="grid grid-cols-2 gap-4 pb-20">
          {produtosFiltrados.map((produto, index) => (
            <button key={`${produto.nome}-${index}`} onClick={() => abrirModal(produto)} className="group relative bg-white rounded-[28px] border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.1)] h-64 flex flex-col items-center justify-between p-5 transition-all duration-300 ease-out hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 active:scale-95 active:shadow-sm">
              <div className="w-full h-32 flex items-center justify-center flex-grow-0 mb-2">
                <div className="relative w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110">
                  <Image src={produto.imagem} alt={produto.nome} fill className="object-contain" sizes="(max-width: 768px) 50vw, 33vw" />
                </div>
              </div>
              <div className="flex flex-col items-center flex-grow-0 w-full">
                <span className="text-[20px] font-bold text-gray-900 leading-tight text-center line-clamp-2">{produto.nome}</span>
                <span className="mt-1 text-[18px] font-medium text-gray-500 group-hover:text-[#40BB43] transition-colors">R$ {produto.preco},00</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {modalAberto && produtoSelecionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="fixed inset-0 bg-black/60 transition-opacity" onClick={fecharModal} />
          <div className="relative w-full max-w-sm bg-white rounded-[24px] px-6 py-8 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
            <button onClick={fecharModal} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
            <div className="flex flex-col items-center">
              <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">{produtoSelecionado.nome}</h2>
              <div className="relative w-32 h-48 mb-4">
                <Image src={produtoSelecionado.imagem} alt={produtoSelecionado.nome} fill className="object-contain" />
              </div>
              <p className="text-gray-500 text-[17px] font-medium mb-5">Preço unitário: R$ {produtoSelecionado.preco},00</p>
              
              {/* Seletor Quantidade */}
              <div className="flex items-center gap-6 mb-6">
                <button onClick={() => adicionarQuantidade(-1)} className="w-11 h-11 rounded-lg border border-gray-400 flex items-center justify-center text-xl text-gray-600 hover:bg-gray-50 transition-colors active:scale-95"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                <span className="text-4xl font-extrabold text-gray-900 w-12 text-center tabular-nums">{quantidade}</span>
                <button onClick={() => adicionarQuantidade(1)} className="w-11 h-11 rounded-lg border border-gray-400 flex items-center justify-center text-xl text-gray-600 hover:bg-gray-50 transition-colors active:scale-95"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
              </div>

              <div className="text-center mb-6">
                <p className="text-gray-500 text-[22px] font-medium mb-1">Total</p>
                <p className="text-[38px] font-extrabold text-[#40BB43] leading-none">R$ {totalFormatado}</p>
              </div>

              <button onClick={salvarCarrinhoENavegar} className="w-full bg-[#40BB43] hover:bg-[#39a83c] text-white font-semibold text-[20px] py-3.5 rounded-lg transition-transform active:scale-[0.98]">
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}