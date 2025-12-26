"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Poppins } from 'next/font/google';
import { ArrowLeft, User, Menu, ChevronDown, Check } from "lucide-react";

// Configuração da fonte
const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

// Dados iniciais
const produtosIniciais = [
  { id: 1, nome: "COROTE", preco: "6.00" },
  { id: 2, nome: "SKOL BEATS", preco: "12.00" },
  { id: 3, nome: "CERVEJA", preco: "6.00" },
  { id: 4, nome: "COPÃO", preco: "25.00" },
  { id: 5, nome: "RED BULL", preco: "12.00" },
  { id: 6, nome: "ÁGUA", preco: "4.00" },
  { id: 7, nome: "LICOR 43", preco: "0.00" },
  { id: 8, nome: "COMBO SMIRNOFF", preco: "250.00" },
];

export default function NewEventPage() {
  const router = useRouter();

  // Estados do Formulário
  const [nomeEvento, setNomeEvento] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [status, setStatus] = useState("ativo");
  
  // Estados de Produtos
  const [listaProdutos, setListaProdutos] = useState(produtosIniciais);
  const [produtosSelecionados, setProdutosSelecionados] = useState<number[]>([1, 2, 3, 4, 5, 6, 8]);
  
  // Estados de Pagamento e Banco
  const [gateway, setGateway] = useState("Mercado Pago");
  const [tipoConta, setTipoConta] = useState("cpf");
  const [nomeTitular, setNomeTitular] = useState("");
  const [docTitular, setDocTitular] = useState("");
  const [banco, setBanco] = useState("");
  const [agencia, setAgencia] = useState("");
  const [conta, setConta] = useState("");
  const [confirmacao, setConfirmacao] = useState(false);

  // Alternar seleção do produto
  const toggleProduto = (id: number) => {
    setProdutosSelecionados(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  // Alterar preço do produto
  const handlePriceChange = (id: number, novoPreco: string) => {
    setListaProdutos(prev => prev.map(prod => 
        prod.id === id ? { ...prod, preco: novoPreco } : prod
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmacao) {
      alert("Por favor, confirme os dados bancários.");
      return;
    }
    
    // Filtra apenas os selecionados para enviar (simulação)
    const produtosFinais = listaProdutos.filter(p => produtosSelecionados.includes(p.id));
    console.log("Criando evento com produtos:", produtosFinais);
    
    // --- ATUALIZAÇÃO AQUI ---
    // Redireciona para a página de sucesso com os códigos
    router.push("/organizador/evento-criado");
  };

  return (
    <main className={`min-h-screen bg-white pb-20 ${poppins.className} text-[#1D1D1F]`}>
      
      {/* HEADER */}
      <header className="px-6 py-6 flex items-center justify-between sticky top-0 bg-white z-20 border-b border-gray-100">
        <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                <ArrowLeft size={20} strokeWidth={2.5} />
            </button>
            <div className="relative w-28 h-8">
                <Image src="/logo-skipow-verde.png" alt="Skipow" fill className="object-contain" priority />
                <Image src="/logo-skipow.png" alt="Skipow" fill className="object-contain" />
            </div>
        </div>
        <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                <User size={18} strokeWidth={2.5} />
            </div>
            <Menu size={28} strokeWidth={2.5} className="text-[#1D1D1F]" />
        </div>
      </header>

      <div className="max-w-md mx-auto px-6 pt-8">
        
        <h1 className="text-[32px] font-extrabold text-center mb-2 leading-tight">
            Criar novo evento
        </h1>
        <p className="text-gray-500 text-center text-[14px] mb-10 leading-relaxed px-4">
            Configure seu evento em poucos passos. Você pode editar tudo depois.
        </p>

        <form onSubmit={handleSubmit} className="space-y-12">

            {/* SEÇÃO 1: DADOS DO EVENTO */}
            <section className="space-y-5">
                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                        Nome do Evento
                    </label>
                    <input 
                        type="text" 
                        placeholder="Digite o nome do evento"
                        value={nomeEvento}
                        onChange={e => setNomeEvento(e.target.value)}
                        className="w-full h-14 bg-[#D9D9D9]/60 rounded-xl px-5 text-[16px] outline-none focus:ring-2 focus:ring-[#40BB43]/50"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                        Data do Evento
                    </label>
                    <input 
                        type="text" 
                        placeholder="dd/mm/aa"
                        value={dataEvento}
                        onChange={e => setDataEvento(e.target.value)}
                        className="w-full h-14 bg-[#D9D9D9]/60 rounded-xl px-5 text-[16px] outline-none focus:ring-2 focus:ring-[#40BB43]/50"
                    />
                </div>

                <div className="flex flex-col gap-3 pt-2 pl-1">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${status === 'ativo' ? 'border-[#40BB43] bg-[#40BB43]' : 'border-gray-300'}`}>
                            {status === 'ativo' && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <span className="font-bold text-[14px] uppercase tracking-wide">ATIVO</span>
                        <input type="radio" name="status" className="hidden" checked={status === 'ativo'} onChange={() => setStatus('ativo')} />
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${status === 'pausado' ? 'border-[#40BB43] bg-[#40BB43]' : 'border-gray-300'}`}>
                            {status === 'pausado' && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <span className="font-bold text-[14px] text-gray-400 uppercase tracking-wide">PAUSADO</span>
                        <input type="radio" name="status" className="hidden" checked={status === 'pausado'} onChange={() => setStatus('pausado')} />
                    </label>
                </div>
            </section>

            <hr className="border-gray-200 border-dashed" />

            {/* SEÇÃO 2: PRODUTOS EDITÁVEIS */}
            <section>
                <h2 className="text-[28px] font-extrabold text-center mb-2 leading-tight">
                    Produtos do evento
                </h2>
                <p className="text-gray-500 text-center text-[14px] mb-8 leading-relaxed">
                    Selecione os produtos e ajuste os preços conforme necessário.
                </p>

                <div className="space-y-4">
                    {listaProdutos.map(prod => {
                        const isSelected = produtosSelecionados.includes(prod.id);
                        return (
                            <div key={prod.id} className="flex items-center justify-between">
                                {/* Checkbox e Nome */}
                                <label className="flex items-center gap-3 cursor-pointer flex-1 mr-2">
                                    <div className={`w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-[#40BB43] border-[#40BB43]' : 'border-gray-300'}`}>
                                        {isSelected && <Check size={14} className="text-white" strokeWidth={4} />}
                                    </div>
                                    <span className={`font-bold text-[14px] uppercase tracking-wide truncate ${isSelected ? 'text-[#1D1D1F]' : 'text-gray-400'}`}>
                                        {prod.nome}
                                    </span>
                                    <input type="checkbox" className="hidden" checked={isSelected} onChange={() => toggleProduto(prod.id)} />
                                </label>
                                
                                {/* Input de Preço Editável */}
                                <div className="flex items-center gap-2">
                                    <span className={`text-[14px] font-bold ${isSelected ? 'text-[#1D1D1F]' : 'text-gray-300'}`}>R$</span>
                                    <input
                                        type="number"
                                        inputMode="decimal"
                                        value={prod.preco}
                                        disabled={!isSelected}
                                        onChange={(e) => handlePriceChange(prod.id, e.target.value)}
                                        className={`border-2 rounded-lg px-2 py-1 w-24 text-right font-bold text-[16px] outline-none transition-all 
                                            ${isSelected 
                                                ? 'border-[#40BB43] text-[#1D1D1F] bg-white focus:ring-2 focus:ring-[#40BB43]/30' 
                                                : 'border-gray-200 text-gray-300 bg-gray-50'
                                            }`}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <hr className="border-gray-200 border-dashed" />

            {/* SEÇÃO 3: PAGAMENTO */}
            <section className="space-y-6">
                <div className="text-center mb-6">
                    <h2 className="text-[28px] font-extrabold mb-2 leading-tight">Pagamento do evento</h2>
                    <p className="text-gray-500 text-[14px] leading-relaxed">
                        Os valores das vendas cairão diretamente na conta da organização do evento.
                    </p>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[14px] font-bold text-[#1D1D1F] pl-1">
                        Gateway de pagamento
                    </label>
                    <div className="relative">
                        <select 
                            value={gateway} 
                            onChange={e => setGateway(e.target.value)}
                            className="w-full h-12 bg-white border-2 border-gray-300 rounded-xl px-4 text-[16px] text-gray-700 outline-none appearance-none focus:border-[#40BB43]"
                        >
                            <option>Mercado Pago</option>
                            <option>Pagar.me</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                    </div>
                    <div className="w-full h-10 bg-[#D9D9D9] rounded-b-xl -mt-2 pt-2 px-4 text-gray-500 flex items-center text-sm opacity-50 pointer-events-none">
                        Pagar.me
                    </div>
                    <p className="text-[11px] text-gray-400 leading-tight pt-1">
                        O cliente será direcionado para este meio de pagamento ao finalizar a compra.
                    </p>
                </div>

                <div className="space-y-3 pt-2">
                    <h3 className="text-[18px] font-extrabold text-center">Tipo de conta</h3>
                    <div className="flex flex-col gap-3 pl-1">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${tipoConta === 'cpf' ? 'border-black' : 'border-gray-400'}`}>
                                {tipoConta === 'cpf' && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
                            </div>
                            <span className="font-medium text-[14px]">CPF – Pessoa Física</span>
                            <input type="radio" name="tipoConta" className="hidden" checked={tipoConta === 'cpf'} onChange={() => setTipoConta('cpf')} />
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${tipoConta === 'cnpj' ? 'border-black' : 'border-gray-400'}`}>
                                {tipoConta === 'cnpj' && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
                            </div>
                            <span className="font-medium text-[14px]">CNPJ – Pessoa Jurídica</span>
                            <input type="radio" name="tipoConta" className="hidden" checked={tipoConta === 'cnpj'} onChange={() => setTipoConta('cnpj')} />
                        </label>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-[16px] font-extrabold text-[#1D1D1F] pl-1 block text-center">
                            Nome do titular da conta
                        </label>
                        <input 
                            type="text" 
                            placeholder="Ex: Associação Atlética Acadêmica"
                            value={nomeTitular}
                            onChange={e => setNomeTitular(e.target.value)}
                            className="w-full h-12 bg-white border border-gray-400 rounded-lg px-4 text-[14px] outline-none focus:border-[#40BB43]"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[16px] font-extrabold text-[#1D1D1F] pl-1 block text-center leading-tight">
                            Documento do titular (CPF ou CNPJ)
                        </label>
                        <input 
                            type="text" 
                            placeholder="000.000.000-00"
                            value={docTitular}
                            onChange={e => setDocTitular(e.target.value)}
                            className="w-full h-12 bg-white border border-gray-400 rounded-lg px-4 text-[14px] outline-none focus:border-[#40BB43]"
                        />
                    </div>
                </div>
            </section>

            <hr className="border-gray-200 border-dashed" />

            {/* SEÇÃO 4: DADOS BANCÁRIOS */}
            <section className="space-y-6">
                <h2 className="text-[28px] font-extrabold text-center mb-2 leading-tight">Dados bancários</h2>

                <div className="space-y-1.5">
                    <label className="text-[16px] font-extrabold text-[#1D1D1F] pl-1 block text-center">Banco</label>
                    <div className="relative">
                        <select 
                            value={banco} 
                            onChange={e => setBanco(e.target.value)}
                            className="w-full h-12 bg-white border border-gray-400 rounded-t-lg px-4 text-[14px] outline-none appearance-none focus:border-[#40BB43]"
                        >
                            <option value="">Selecione o banco</option>
                            <option value="nubank">Nubank</option>
                            <option value="bradesco">Bradesco</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                    </div>
                    <div className="bg-[#D9D9D9] p-3 rounded-b-lg text-gray-500 text-sm space-y-1">
                        <p>Nubank</p>
                        <p>Bradesco</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-[16px] font-extrabold text-[#1D1D1F] pl-1 block text-center">Agência</label>
                        <input 
                            type="text" 
                            value={agencia} 
                            onChange={e => setAgencia(e.target.value)}
                            className="w-full h-12 bg-white border border-gray-400 rounded-lg px-4 outline-none focus:border-[#40BB43]"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[16px] font-extrabold text-[#1D1D1F] pl-1 block text-center">Conta</label>
                        <input 
                            type="text" 
                            value={conta} 
                            onChange={e => setConta(e.target.value)}
                            className="w-full h-12 bg-white border border-gray-400 rounded-lg px-4 outline-none focus:border-[#40BB43]"
                        />
                    </div>
                </div>

                <p className="text-[12px] text-gray-500 text-center leading-tight px-4">
                    A Skipow não movimenta valores. Os pagamentos são processados diretamente pelo gateway selecionado.
                </p>

                <label className="flex items-start gap-3 cursor-pointer mt-4">
                    <div className={`w-6 h-6 shrink-0 border-2 flex items-center justify-center mt-0.5 ${confirmacao ? 'bg-black border-black' : 'border-black'}`}>
                        {confirmacao && <Check size={16} className="text-white" strokeWidth={4} />}
                    </div>
                    <span className="text-[13px] font-bold leading-tight">
                        Confirmo que os valores das vendas cairão diretamente na conta informada acima.
                    </span>
                    <input type="checkbox" className="hidden" checked={confirmacao} onChange={() => setConfirmacao(!confirmacao)} />
                </label>

                <p className="text-[12px] text-gray-400 text-center">
                    Comissão Skipow: 5% (cobrada após o evento)
                </p>
                <p className="text-[12px] text-gray-400 text-center -mt-2">
                    Você poderá editar produtos e status do evento depois.
                </p>

                <button 
                    type="submit"
                    className="w-full h-14 bg-[#40BB43] hover:bg-[#36a539] text-white font-bold text-[18px] rounded-lg shadow-lg shadow-green-200 transition-transform active:scale-[0.98] mt-4"
                >
                    Criar evento
                </button>

            </section>

        </form>
      </div>
    </main>
  );
}