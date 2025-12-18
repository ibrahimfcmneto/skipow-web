// app/eventos/page.jsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

// MOCK DE DADOS: Simula dados de uma API
const EVENTOS_MOCK = [
  {
    id: 1,
    data: "Sexta, 05 de Dezembro de 2025",
    nome: "De férias com a FACECA",
    descricao: "Aproveite que as férias estão quase aí e venha curtir a última festa da FACECA do semestre com a gente!",
    imagem: "/evento-faceca.jpg",
  },
  {
    id: 2,
    data: "Sexta, 05 de Dezembro de 2025",
    nome: "BAILE FUNK COM DJ SAMUCA + DJ GUETO + DJ GAMA",
    descricao: "Baile funk do melhor jeito com 3 DJ's curtindo a noite toda com os melhores da cena.",
    imagem: "/evento-bailefunk.jpg",
  },
  {
    id: 3,
    data: "Sábado, 06 de Dezembro de 2025",
    nome: "Pagode do Dodô – Último do Ano",
    descricao: "Aproveite que as férias estão quase aí e venha curtir a última festa do semestre com a gente!",
    imagem: "/evento-pagode.jpg",
  },
];

export default function EventosPage() {
  const router = useRouter();

  function abrirCardapio() {
    // Em um projeto real, você passaria o ID do evento para a página do cardápio:
    // router.push(`/cardapio?eventoId=${eventoId}`);
    router.push("/cardapio");
  }

  // Agrupa eventos por data (para manter a organização do código que sugeri antes)
  const eventosPorData = EVENTOS_MOCK.reduce((acc, evento) => {
    const data = evento.data;
    if (!acc[data]) {
      acc[data] = [];
    }
    acc[data].push(evento);
    return acc;
  }, {});

  const renderizarEvento = (evento) => (
    <button
      key={evento.id}
      type="button"
      onClick={abrirCardapio}
      // AJUSTE DE ESTILO: Borda mais suave e sombra mais sutil para o wireframe
      className="w-full bg-white rounded-[20px] shadow-sm flex overflow-hidden mb-4 border border-gray-100" 
    >
      <div className="w-[38%] flex-shrink-0">
        <Image
          src={evento.imagem}
          alt={evento.nome}
          width={300}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-[62%] p-3 pr-4 flex flex-col justify-center"> {/* Ajuste no padding */}
        {/* AJUSTE DE ESTILO: Título mais conciso */}
        <h3 className="font-extrabold text-[16px] text-neutral-900 leading-snug text-left mb-1">
          {evento.nome}
        </h3>
        <p className="text-[13px] text-gray-700 leading-snug text-left">
          {evento.descricao}
        </p>
      </div>
    </button>
  );

  return (
    <main className="min-h-screen bg-white flex justify-center">
      {/* container com largura de celular */}
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

        {/* TÍTULO */}
        <h1 className="text-[32px] leading-tight font-extrabold text-left mb-5 text-neutral-900">
          Selecione seu evento
        </h1>

        {/* PESQUISA (LUPA SUBSTITUÍDA POR SVG e estilos ajustados) */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Pesquisar evento"
            className="w-full bg-white border border-gray-300 rounded-full py-3 pl-4 pr-11 text-[15px] text-gray-800 placeholder:text-gray-400 outline-none"
          />
          {/* LUPA SVG (mesmo ícone da tela de cardápio, mais fino) */}
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

        {/* LISTA DE EVENTOS DINÂMICA */}
        {Object.keys(eventosPorData).map((data) => (
          <div key={data}>
            {/* DATA (Cabeçalho) */}
            <div className="flex items-center gap-3 mb-4"> {/* Ajuste na margem inferior */}
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <span className="text-xl">📅</span>
              </div>
              <p className="font-semibold text-[18px] leading-snug text-neutral-900">
                {data}
              </p>
            </div>

            {/* Eventos da Data */}
            {eventosPorData[data].map(renderizarEvento)}
          </div>
        ))}

        {/* Ver mais eventos (AJUSTE DE ESTILO) */}
        <p className="mt-8 text-center text-[18px] text-gray-700 font-semibold">
          Ver mais eventos
        </p>
      </div>
    </main>
  );
}

// Fim do arquivo