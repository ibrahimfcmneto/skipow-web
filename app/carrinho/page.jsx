// app/carrinho/page.jsx
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

  // >>> FUNÇÃO DE GERAÇÃO DE FICHAS ÚNICAS <<<
  const handleFinalizarCompra = () => {
    if (typeof window === "undefined") return;

    if (itens.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }

    // 1. Carrega fichas já existentes para saber o último número
    const existentesJSON = localStorage.getItem("skipow_fichas");
    const fichasExistentes = existentesJSON ? JSON.parse(existentesJSON) : [];

    // 2. Descobre o último número usado (ex: se o último foi SKP-0042, o próximo é 43)
    let ultimoNumero = 0;
    fichasExistentes.forEach((ficha) => {
      // Procura pelo padrão "SKP-" seguido de números
      const match = String(ficha.id).match(/SKP-(\d+)/);
      if (match) {
        const n = parseInt(match[1], 10);
        if (n > ultimoNumero) ultimoNumero = n;
      }
    });

    const novasFichas = [];

    // 3. Loop para criar cada ficha individualmente
    itens.forEach((item) => {
      
      // Se for combo, multiplicamos (ex: 1 combo * 3 unidades = 3 fichas)
      // Se não for, é apenas a quantidade do item (ex: 2 águas = 2 fichas)
      const multiplicador = item.isCombo ? (item.comboQtd || 1) : 1;
      const totalFichasDesteItem = item.quantidade * multiplicador;

      // Define os dados CORRETOS para a ficha (Produto Individual)
      // Se for combo, usa os dados do 'comboItemName', senão usa o nome normal
      const nomeFinal = item.isCombo ? item.comboItemName : item.nome;
      const imagemFinal = item.isCombo ? item.comboItemImage : item.imagem;

      // Gera X fichas para este item
      for (let i = 0; i < totalFichasDesteItem; i++) {
        ultimoNumero += 1; // Incrementa o contador para o código ser único

        // Formata o código: SKP-0001, SKP-0002...
        const codigoUnico = `SKP-${String(ultimoNumero).padStart(4, "0")}`;

        novasFichas.push({
          id: codigoUnico,         // ID único usado na URL
          codigo: codigoUnico,     // Código visual para o usuário
          nome: nomeFinal,         // "Corote" (e não "Combo 3 Corotes")
          imagem: imagemFinal,     // Foto da garrafinha
          evento: "De Férias com a FACECA",
          status: "disponivel",    // Nasce disponível para uso
          dataCompra: new Date().toISOString()
        });
      }
    });

    // 4. Salva tudo (Antigas + Novas)
    const todasAsFichas = [...fichasExistentes, ...novasFichas];
    localStorage.setItem("skipow_fichas", JSON.stringify(todasAsFichas));

    // 5. Limpa carrinho e redireciona
    localStorage.removeItem("skipow_carrinho");
    setItens([]);
    
    // Pequeno delay para garantir a gravação dos dados
    setTimeout(() => {
        router.push("/fichas");
    }, 100);
  };

  return (
    <main className="min-h-screen bg-white flex justify-center">
      {/* container tipo celular */}
      <div className="w-full max-w-md px-5 pb-10">
        {/* HEADER */}
        <header className="pt-6 mb-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl font-bold text-gray-900 pb-1">←</span>
          </button>

          <div className="ml-auto flex flex-col items-end text-right">
            <h1 className="text-[26px] font-extrabold text-gray-900 leading-tight">
              Carrinho de Compras
            </h1>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              Total de itens: {itens.reduce((acc, i) => acc + i.quantidade, 0)}
            </p>
          </div>

          <div className="w-11 h-11 hidden sm:block" />
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