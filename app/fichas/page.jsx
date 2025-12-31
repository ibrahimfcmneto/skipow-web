"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { buscarMinhasFichas } from "@/app/actions/fichas"; 

export default function FichasPage() {
  const router = useRouter();
  const [fichas, setFichas] = useState([]);
  const [filtroAtivo, setFiltroAtivo] = useState("Disponíveis"); 
  const [carregando, setCarregando] = useState(true); 

  useEffect(() => {
    async function carregarDados() {
      // 1. SEGURANÇA: Recuperar o ID do usuário deste navegador
      // Esse ID foi gerado na hora do pagamento
      const meuId = localStorage.getItem("skipow_user_id");

      // Se não tiver ID gravado, o usuário é novo/anônimo e não tem fichas
      if (!meuId) {
          setFichas([]);
          setCarregando(false);
          return;
      }

      // 2. Busca do Banco de Dados (Passando o ID para filtrar)
      const resultado = await buscarMinhasFichas(meuId);
      
      if (resultado.sucesso) {
        // 3. Adapta os dados do Banco para o Layout
        const fichasFormatadas = resultado.dados.map(f => ({
          id: f.id,
          codigo: f.codigo,        
          nome: f.nomeProduto,     
          imagem: f.imagemUrl,     
          evento: f.evento,
          status: f.status,
          dataCompra: f.dataCompra
        }));
        
        setFichas(fichasFormatadas);
      }
      setCarregando(false);
    }

    carregarDados();
  }, []);

  // Lógica de filtragem
  const fichasFiltradas = fichas.filter((ficha) => {
    if (filtroAtivo === "Todas") return true;
    if (filtroAtivo === "Disponíveis") return ficha.status === "disponivel";
    if (filtroAtivo === "Usadas") return ficha.status !== "disponivel";
    return true;
  });

  return (
    <main className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-md px-5 pb-10">
        
        {/* HEADER */}
        <header className="pt-6 mb-8 flex items-center justify-between">
            <Link href="/cardapio">
              <Image
                src="/logo-skipow.png"
                alt="Skipow"
                width={120}
                height={36}
                className="cursor-pointer" 
              />
            </Link>

            <div className="flex items-center gap-4">
              <div className="relative w-9 h-9">
                <Image src="/avatar.png" alt="Avatar" fill className="rounded-full object-cover" />
              </div>

              <button 
                onClick={() => router.push("/carrinho")} 
                className="relative text-gray-900 hover:text-[#40BB43] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              </button>
            </div>
        </header>

        {/* TÍTULO E SUBTÍTULO*/}
        <div className="mb-6 text-right">
          <h1 className="text-[32px] leading-tight font-extrabold text-gray-900">
            Fichas disponíveis
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Total de fichas: {fichas.length}
          </p>
        </div>

        {/* SLOGAN */}
        <p className="text-center text-[22px] text-gray-700 mb-4">
          “Menos fila.{" "}
          <span className="text-[#40BB43] font-semibold">Mais festa.</span>”
        </p>

        {/* ABAS DE FILTRO*/}
        <div className="flex bg-gray-100 p-1 rounded-xl mb-6 relative">
          {["Disponíveis", "Usadas", "Todas"].map((aba) => {
            const ativo = aba === filtroAtivo;
            return (
              <button
                key={aba}
                onClick={() => setFiltroAtivo(aba)}
                className={`
                  flex-1 py-2 text-[14px] font-semibold rounded-lg capitalize
                  transition-all duration-300 ease-in-out
                  ${
                    ativo
                      ? "bg-white text-gray-900 shadow-[0_2px_4px_rgba(0,0,0,0.08)] transform scale-[1.02]"
                      : "text-gray-500 hover:text-gray-700 bg-transparent"
                  }
                `}
              >
                {aba}
              </button>
            );
          })}
        </div>

        {/* LISTA DE FICHAS */}
        <div className="space-y-4">
          
          {/* Loading State */}
          {carregando && (
             <div className="text-center py-10">
                <div className="w-8 h-8 border-4 border-[#40BB43] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-gray-400 text-sm">Carregando carteira...</p>
             </div>
          )}

          {!carregando && fichasFiltradas.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                Nenhuma ficha encontrada nesta categoria.
              </p>
              {filtroAtivo === "Disponíveis" && (
                 <button 
                   onClick={() => router.push('/cardapio')}
                   className="mt-4 text-[#40BB43] font-bold underline"
                 >
                   Comprar fichas
                 </button>
              )}
            </div>
          )}

          {!carregando && fichasFiltradas.map((ficha) => (
            <Link
              key={ficha.id}
              href={`/fichas/${ficha.codigo}`} 
              className="block bg-white rounded-[26px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-4 flex items-center gap-4 transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* imagem da bebida */}
              <div className="w-16 h-16 flex items-center justify-center bg-gray-50 rounded-2xl relative overflow-hidden">
                {ficha.imagem ? (
                  <Image
                    src={ficha.imagem}
                    alt={ficha.nome}
                    fill
                    className="object-contain p-2"
                  />
                ) : (
                  <span className="text-2xl">🍸</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[18px] font-extrabold text-gray-900 truncate">
                  {ficha.nome}
                </p>
                <p className="text-[11px] text-gray-500 truncate mt-0.5">
                  Cod: {ficha.codigo} • {ficha.evento}
                </p>
                <p className="text-[12px] text-gray-400 mt-1">
                  Toque para ver o QR code
                </p>
              </div>

              <div className="flex flex-col items-end justify-between h-full gap-2">
                 {/* Status Colorido */}
                <span
                  className={`text-[11px] font-bold px-2 py-1 rounded-full ${
                    ficha.status === "disponivel"
                      ? "bg-green-100 text-[#40BB43]"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {ficha.status === "disponivel" ? "Disponível" : "Usada"}
                </span>
                <span className="text-gray-300 text-xl font-bold">&gt;</span>
              </div>
            </Link>
          ))}
        </div>
        
        {/* RODAPÉ DE SEGURANÇA */}
      <div className="mt-12 pt-6 border-t border-gray-100 text-center pb-8">
        <p className="text-xs text-gray-400 mb-3">
          Vai trocar de celular ou acabou a bateria? <br/>
          Salve seu link de recuperação.
        </p>
        
        <button
          onClick={() => {
            // Pega o ID atual
            const meuId = localStorage.getItem("skipow_user_id");
            if (!meuId) return alert("Erro: ID não encontrado");

            // Cria o link mágico
            const link = `${window.location.origin}/recuperar?uid=${meuId}`;

            // Copia para a área de transferência
            navigator.clipboard.writeText(link).then(() => {
              alert("Link copiado! Mande para seu WhatsApp para garantir.");
            });
          }}
          className="text-[#40BB43] text-sm font-bold underline decoration-dotted"
        >
          Copiar meu Link de Acesso
        </button>
      </div>

      {/* ... fim do main ... */}

      </div>
    </main>
  );
}