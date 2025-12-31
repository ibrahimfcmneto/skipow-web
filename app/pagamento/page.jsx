"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Poppins } from 'next/font/google';
import { processarPagamento } from "@/app/actions/checkout"; 
import { 
  Copy, 
  CreditCard, 
  QrCode, 
  Smartphone, 
  User, 
  Mail, 
  ChevronLeft, 
  Ticket, 
  CheckCircle2, 
  AlertCircle,
  ShoppingBag,
  Loader2,
  MapPin,
  Calendar
} from "lucide-react";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export default function PagamentoPage() {
  const router = useRouter();
  const [itens, setItens] = useState([]);
  const [metodo, setMetodo] = useState("pix"); 
  const [copiado, setCopiado] = useState(false);

  // Estados de Dados
  const [telefone, setTelefone] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  // Estado para controlar a notificação de erro
  const [erroTelefone, setErroTelefone] = useState(false);
  const [mensagemErro, setMensagemErro] = useState(""); 
  
  // Estado de Carregamento (Loading)
  const [processando, setProcessando] = useState(false);

  const PIX_CODE = "00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-4266141740005204000053039865802BR5913Skipow Eventos6008Sao Paulo62070503***6304E2CA";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("skipow_carrinho");
      if (data) setItens(JSON.parse(data));
      
      const userData = localStorage.getItem("skipow_user_data");
      if (userData) {
          const user = JSON.parse(userData);
          if (user.telefone) setTelefone(user.telefone);
          if (user.nome) setNome(user.nome);
          if (user.email) setEmail(user.email);
      }
    }
  }, []);

  const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  const totalFormatado = total.toLocaleString("pt-BR", { minimumFractionDigits: 2 });

  // --- HELPER: IDENTIDADE DO DISPOSITIVO ---
  // Gera ou recupera um ID único para este navegador para garantir segurança
  const getUserId = () => {
    if (typeof window === "undefined") return null;
    let id = localStorage.getItem("skipow_user_id");
    if (!id) {
        id = crypto.randomUUID(); // Gera ID único se não existir
        localStorage.setItem("skipow_user_id", id);
    }
    return id;
  }

  // --- MÁSCARA DE TELEFONE ---
  const handleTelefoneChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = value.slice(0, 11);
    if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    }
    if (value.length > 7) {
      value = value.replace(/(\d{5})(\d{4})$/, "$1-$2");
    }
    setTelefone(value);
    if (erroTelefone) setErroTelefone(false);
  };

  const copiarPix = () => {
    navigator.clipboard.writeText(PIX_CODE);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  // --- LÓGICA DE PAGAMENTO ---
  const handlePagar = async () => {
    // Validações Visuais
    const numerosApenas = telefone.replace(/\D/g, "");

    if (!numerosApenas) {
      setMensagemErro("Telefone obrigatório");
      dispararErro();
      return;
    }

    if (numerosApenas.length < 11) {
      setMensagemErro("Número incompleto");
      dispararErro();
      return;
    }

    setProcessando(true);

    try {
        // 1. SEGURANÇA: Pega o ID único do usuário
        const usuarioId = getUserId();

        // 2. Chama o Backend passando os itens E o ID do usuário
        // IMPORTANTE: Agora passamos o usuarioId como segundo argumento e telefone como terceiro
        const resultado = await processarPagamento(itens, usuarioId, telefone);

        if (resultado.sucesso) {
            // 3. Limpeza e Redirecionamento
            if (typeof window !== "undefined") {
                localStorage.removeItem("skipow_carrinho");
                
                // Salva dados do usuário para preenchimento automático futuro
                localStorage.setItem("skipow_user_data", JSON.stringify({ 
                    nome: nome, 
                    email: email, 
                    telefone,
                    logado: true 
                }));
            }
            router.push("/pagamento/concluido"); 
            
        } else {
            setMensagemErro("Erro ao processar pedido");
            dispararErro();
            setProcessando(false);
        }

    } catch (error) {
        console.error(error);
        setMensagemErro("Erro de conexão");
        dispararErro();
        setProcessando(false);
    }
  };

  function dispararErro() {
    setErroTelefone(true);
    setTimeout(() => setErroTelefone(false), 4000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <main className={`min-h-screen bg-[#F2F2F7] flex justify-center ${poppins.className} text-[#1D1D1F]`}>
      <div className="w-full max-w-md pb-48 relative"> 
        
        {/* --- NOTIFICAÇÃO DE ERRO --- */}
        {erroTelefone && (
            <div className="fixed top-6 left-0 w-full flex justify-center z-50 px-4 pointer-events-none">
                <div className="bg-[#1D1D1F] text-white p-4 rounded-[22px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] flex items-center gap-4 max-w-sm w-full animate-in slide-in-from-top-5 fade-in duration-300 pointer-events-auto border border-white/10">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <Smartphone size={20} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-[14px] font-bold leading-tight">{mensagemErro}</h3>
                        <p className="text-[12px] text-gray-300 leading-tight mt-0.5 font-medium">
                            Verifique e tente novamente.
                        </p>
                    </div>
                </div>
            </div>
        )}

        {/* HEADER */}
        <div className="px-4 pt-6 pb-4 bg-[#F2F2F7]/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between">
            <button 
                onClick={() => router.back()} 
                className="w-10 h-10 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] flex items-center justify-center text-[#1D1D1F] hover:bg-gray-50 transition-all border border-gray-100 active:scale-95"
            >
                <ChevronLeft size={22} strokeWidth={2} />
            </button>
            <h1 className="text-[17px] font-semibold text-[#1D1D1F]">Checkout</h1>
            <div className="w-10" />
        </div>

        <div className="px-5 space-y-6">

            {/* 1. CARD DE RESUMO */}
            <section className="bg-white rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
                <div className="p-5 bg-gray-50/50 border-b border-gray-100 flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#40BB43]/10 text-[#40BB43] rounded-xl flex items-center justify-center shrink-0">
                        <Ticket size={24} strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Evento</span>
                        <h2 className="text-[16px] font-semibold text-[#1D1D1F] leading-tight mt-0.5">Skipow Sunset Festival</h2>
                        <div className="flex items-center gap-3 mt-1.5">
                            <div className="flex items-center gap-1 text-gray-500">
                                <Calendar size={12} />
                                <span className="text-[12px] font-medium">Hoje</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-500">
                                <MapPin size={12} />
                                <span className="text-[12px] font-medium">Arena</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-5 py-4 max-h-[240px] overflow-y-auto">
                    <div className="flex items-center gap-2 mb-3">
                        <ShoppingBag size={14} className="text-gray-400" />
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Itens do Pedido</span>
                    </div>
                    <div className="space-y-3">
                        {itens.map((item, index) => (
                            <div key={index} className="flex justify-between items-center group">
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center justify-center w-6 h-6 bg-gray-100 text-[11px] font-bold text-gray-600 rounded-md">
                                        {item.quantidade}x
                                    </span>
                                    <span className="text-[14px] font-medium text-[#1D1D1F] group-hover:text-[#40BB43] transition-colors">
                                        {item.nome}
                                    </span>
                                </div>
                                <span className="text-[14px] font-medium text-gray-500">
                                    R$ {(item.preco * item.quantidade).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-[13px] font-medium text-gray-500">Total a pagar</span>
                    <span className="text-[20px] font-bold text-[#1D1D1F]">R$ {totalFormatado}</span>
                </div>
            </section>

            {/* 2. DADOS PESSOAIS */}
            <section>
                <div className="mb-4 px-1">
                    <div className="flex items-center gap-2 mb-1">
                        <User size={16} className="text-gray-400" />
                        <h3 className="text-[13px] font-semibold text-gray-500 uppercase tracking-wide">Seus Dados</h3>
                    </div>
                    <p className="text-[13px] text-gray-400 ml-6 leading-snug">
                        Informe seu celular para não perder suas fichas. <br/>
                        Elas ficam vinculadas a este número.
                    </p>
                </div>
                
                <div className={`bg-white rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden transition-all duration-300 ${erroTelefone ? 'ring-2 ring-red-400 shadow-[0_0_20px_rgba(248,113,113,0.3)]' : ''}`}>
                    {/* Celular */}
                    <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <Smartphone size={20} className={erroTelefone ? "text-red-500" : "text-[#40BB43]"} />
                            <div className="flex-1">
                                <label className={`text-[10px] font-bold uppercase tracking-wide block mb-1 ${erroTelefone ? "text-red-500" : "text-gray-400"}`}>
                                    Celular (Obrigatório)
                                </label>
                                <input 
                                    type="tel" 
                                    placeholder="(11) 99999-9999" 
                                    value={telefone}
                                    onChange={handleTelefoneChange} 
                                    maxLength={15} 
                                    disabled={processando}
                                    className="w-full text-[17px] font-medium text-[#1D1D1F] placeholder:text-gray-300 outline-none bg-transparent"
                                />
                            </div>
                            {erroTelefone && <AlertCircle size={20} className="text-red-500 animate-pulse" />}
                        </div>
                    </div>

                    {/* Opcionais */}
                    <div className="p-4 flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-5 flex justify-center"><User size={18} className="text-gray-400" /></div>
                            <input 
                                type="text" 
                                placeholder="Nome completo (Opcional)" 
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                disabled={processando}
                                className="w-full text-[15px] font-medium text-[#1D1D1F] placeholder:text-gray-300 outline-none bg-transparent"
                            />
                        </div>
                        <div className="h-px bg-gray-100 w-full ml-8" />
                        <div className="flex items-center gap-3">
                            <div className="w-5 flex justify-center"><Mail size={18} className="text-gray-400" /></div>
                            <input 
                                type="email" 
                                placeholder="E-mail para recibo (Opcional)" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={processando}
                                className="w-full text-[15px] font-medium text-[#1D1D1F] placeholder:text-gray-300 outline-none bg-transparent"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. PAGAMENTO */}
            <section>
                {/* Cabeçalho da Seção */}
                <div className="flex items-center gap-2 mb-3 px-1">
                    <CreditCard size={16} className="text-gray-400" />
                    <h3 className="text-[13px] font-semibold text-gray-500 uppercase tracking-wide">Pagamento</h3>
                </div>

                <div className="flex items-center justify-start gap-1.5 mt-3 opacity-80 px-1">
                    <p className="text-[13px] text-gray-500 font-medium text-left">
                        Após o pagamento, suas fichas serão liberadas automaticamente.
                    </p>
                </div>
                
                <div className="space-y-3">
                    {/* PIX */}
                    <button 
                        onClick={() => setMetodo("pix")}
                        disabled={processando}
                        className={`w-full text-left relative rounded-[20px] p-4 border transition-all duration-200 ${
                            metodo === 'pix' 
                            ? 'bg-white border-[#40BB43] shadow-[0_0_0_1px_#40BB43]' 
                            : 'bg-white border-transparent shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:bg-gray-50'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${metodo === 'pix' ? 'bg-[#40BB43] text-white' : 'bg-gray-100 text-gray-400'}`}>
                                    <QrCode size={20} />
                                </div>
                                <div>
                                    <p className="text-[15px] font-semibold text-[#1D1D1F]">Pix Instantâneo</p>
                                    <p className="text-[11px] font-medium text-[#40BB43]">Mais rápido</p>
                                </div>
                            </div>
                            {metodo === 'pix' && <CheckCircle2 size={20} className="text-[#40BB43]" />}
                        </div>

                        {metodo === 'pix' && (
                            <div className="mt-4 pt-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-1">
                                <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3 border border-gray-200/60">
                                    <div className="flex-1 min-w-0 mr-3">
                                        <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Código Pix</p>
                                        <p className="text-[13px] font-mono text-gray-600 truncate select-all">{PIX_CODE}</p>
                                    </div>
                                    <button 
                                        onClick={copiarPix} 
                                        className={`shrink-0 p-2 rounded-lg transition-all ${copiado ? 'bg-[#40BB43] text-white' : 'bg-white text-[#1D1D1F] border border-gray-200'}`}
                                    >
                                        {copiado ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                                    </button>
                                </div>
                                <div className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
                                    <AlertCircle size={12} />
                                    <span>Expira em 10 minutos</span>
                                </div>
                            </div>
                        )}
                    </button>

                    {/* CARTÃO */}
                    <button 
                        onClick={() => setMetodo("cartao")}
                        disabled={processando}
                        className={`w-full text-left relative rounded-[20px] p-4 border transition-all duration-200 ${
                            metodo === 'cartao' 
                            ? 'bg-white border-[#40BB43] shadow-[0_0_0_1px_#40BB43]' 
                            : 'bg-white border-transparent shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:bg-gray-50'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${metodo === 'cartao' ? 'bg-[#40BB43] text-white' : 'bg-gray-100 text-gray-400'}`}>
                                    <CreditCard size={20} />
                                </div>
                                <div>
                                    <p className="text-[15px] font-semibold text-[#1D1D1F]">Cartão de Crédito</p>
                                    <p className="text-[11px] font-medium text-gray-400">Crédito ou Débito</p>
                                </div>
                            </div>
                            {metodo === 'cartao' && <CheckCircle2 size={20} className="text-[#40BB43]" />}
                        </div>

                        {metodo === 'cartao' && (
                            <div className="mt-4 pt-4 border-t border-gray-100 space-y-3 animate-in fade-in slide-in-from-top-1 cursor-default" onClick={(e) => e.stopPropagation()}>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        placeholder="Número do Cartão" 
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-[14px] outline-none focus:border-[#40BB43] focus:bg-white transition-all placeholder:text-gray-400" 
                                    />
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <CreditCard size={18} />
                                    </div>
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="Nome impresso no cartão" 
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[#40BB43] focus:bg-white transition-all placeholder:text-gray-400" 
                                />
                                <div className="flex gap-3">
                                    <input 
                                        type="text" 
                                        placeholder="Validade (MM/AA)" 
                                        className="w-1/2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[#40BB43] focus:bg-white transition-all placeholder:text-gray-400" 
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="CVV" 
                                        maxLength={4}
                                        className="w-1/2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[#40BB43] focus:bg-white transition-all placeholder:text-gray-400" 
                                    />
                                </div>
                            </div>
                        )}
                    </button>
                </div>
            </section>

        </div>

        {/* FOOTER FIXO ATUALIZADO */}
        <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-gray-200 p-5 z-40">
            <div className="w-full max-w-md mx-auto">
                <button 
                    onClick={handlePagar}
                    disabled={processando || itens.length === 0}
                    className="w-full h-14 bg-[#40BB43] hover:bg-[#36a539] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-2xl text-[17px] shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
                >
                    {processando ? (
                        <>
                            <Loader2 className="animate-spin" size={24} />
                            <span>Processando...</span>
                        </>
                    ) : (
                        <span>Pagar R$ {totalFormatado}</span>
                    )}
                </button>
            </div>
        </div>

      </div>
    </main>
  );
}