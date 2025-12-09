"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // protótipo: sempre deixa entrar
    router.push("/eventos");
  }

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col items-center px-6 pt-12 pb-10">
        {/* Logo */}
        <Image
          src="/logo-skipow.png"
          alt="Skipow"
          width={220}
          height={60}
          className="mb-12"
        />

        {/* Título + subtítulo */}
        <div className="w-full max-w-sm text-center mb-8">
          <h1 className="text-[40px] leading-none font-extrabold text-neutral-900 mb-3">
            Login
          </h1>
          <p className="text-base text-gray-500">
            Faça login para continuar.
          </p>
        </div>

        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm space-y-5"
        >
          {/* Nome */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 tracking-[0.18em]">
              NOME
            </label>
            <input
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full rounded-[18px] bg-[#E5E7EB] px-4 py-3 text-gray-800 placeholder:text-gray-400 outline-none border border-transparent focus:border-[#40BB43]"
            />
          </div>

          {/* Senha */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 tracking-[0.18em]">
              SENHA
            </label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full rounded-[18px] bg-[#E5E7EB] px-4 py-3 text-gray-800 placeholder:text-gray-400 outline-none border border-transparent focus:border-[#40BB43]"
            />
          </div>

          {/* Botão Entrar */}
          <button
            type="submit"
            className="w-full bg-[#40BB43] text-white font-semibold py-3 rounded-[18px] mt-6 text-base"
          >
            Entrar
          </button>
        </form>
      </div>

      {/* Faixa verde inferior estilizada */}
      <div className="w-[140%] h-28 bg-[#40BB43] self-center -mb-10 -rotate-3 rounded-t-[40px]" />
    </main>
  );
}
