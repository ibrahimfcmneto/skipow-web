"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EventosPage() {
  const router = useRouter();

  function abrirCardapio() {
    router.push("/cardapio");
  }

  return (
    <main className="min-h-screen bg-white flex justify-center">
      {/* container com largura de celular */}
      <div className="w-full max-w-md px-5 pb-10">
        {/* HEADER */}
        <header className="flex items-center justify-between pt-6 mb-6">
          <Image
            src="/logo-skipow.png"
            alt="Skipow"
            width={120}
            height={36}
          />

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/fichas")}
              className="bg-white shadow-md px-4 py-2 rounded-xl text-sm font-semibold text-gray-900"
            >
              Minhas Fichas
            </button>

            <div className="flex items-center gap-2">
              {/* avatar */}
              <div className="w-9 h-9 rounded-full bg-gray-300" />
              {/* menu hambúrguer */}
              <div className="flex flex-col gap-[3px]">
                <span className="w-5 h-[2px] bg-gray-900 rounded" />
                <span className="w-5 h-[2px] bg-gray-900 rounded" />
                <span className="w-5 h-[2px] bg-gray-900 rounded" />
              </div>
            </div>
          </div>
        </header>

        {/* TÍTULO */}
        <h1 className="text-[32px] leading-tight font-extrabold text-center mb-5 text-neutral-900">
          Selecione seu evento
        </h1>

        {/* PESQUISA */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Pesquisar evento"
            className="w-full bg-[#F3F4F6] rounded-full py-3 pl-4 pr-11 text-sm text-gray-800 placeholder:text-gray-400 outline-none"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-500">
            🔍
          </span>
        </div>

        {/* DATA 1 */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg border-2 border-gray-900 flex items-center justify-center">
            <span className="text-xl">📅</span>
          </div>
          <p className="font-semibold text-[18px] leading-snug text-neutral-900">
            Sexta, 05 de Dezembro de 2025
          </p>
        </div>

        {/* EVENTO 1 */}
        <button
          type="button"
          onClick={abrirCardapio}
          className="w-full bg-white rounded-3xl shadow-md flex overflow-hidden mb-4"
        >
          <div className="w-[38%]">
            <Image
              src="/evento-faceca.jpg"
              alt="De férias com a FACECA"
              width={300}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-[62%] p-4 pr-5">
            <h3 className="font-extrabold text-[16px] mb-1 text-neutral-900">
              De férias com a FACECA
            </h3>
            <p className="text-[13px] text-gray-700 leading-snug">
              Aproveite que as férias estão quase aí e venha curtir a última
              festa da FACECA do semestre com a gente!
            </p>
          </div>
        </button>

        {/* EVENTO 2 */}
        <button
          type="button"
          onClick={abrirCardapio}
          className="w-full bg-white rounded-3xl shadow-md flex overflow-hidden mb-8"
        >
          <div className="w-[38%]">
            <Image
              src="/evento-bailefunk.jpg"
              alt="Baile Funk"
              width={300}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-[62%] p-4 pr-5">
            <h3 className="font-extrabold text-[15px] mb-1 text-neutral-900">
              BAILE FUNK COM DJ SAMUCA + DJ GUETO + DJ GAMA
            </h3>
            <p className="text-[13px] text-gray-700 leading-snug">
              Baile funk do melhor jeito com 3 DJ&apos;s curtindo a noite toda
              com os melhores da cena.
            </p>
          </div>
        </button>

        {/* DATA 2 */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg border-2 border-gray-900 flex items-center justify-center">
            <span className="text-xl">📅</span>
          </div>
          <p className="font-semibold text-[18px] leading-snug text-neutral-900">
            Sábado, 06 de Dezembro de 2025
          </p>
        </div>

        {/* EVENTO 3 */}
        <button
          type="button"
          onClick={abrirCardapio}
          className="w-full bg-white rounded-3xl shadow-md flex overflow-hidden"
        >
          <div className="w-[38%]">
            <Image
              src="/evento-pagode.jpg"
              alt="Pagode do Dodô"
              width={300}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-[62%] p-4 pr-5">
            <h3 className="font-extrabold text-[15px] mb-1 text-neutral-900">
              Pagode do Dodô – Último do Ano
            </h3>
            <p className="text-[13px] text-gray-700 leading-snug">
              Aproveite que as férias estão quase aí e venha curtir a última
              festa do semestre com a gente!
            </p>
          </div>
        </button>

        {/* Ver mais eventos */}
        <p className="mt-8 text-center text-[18px] text-gray-700">
          Ver mais eventos
        </p>
      </div>
    </main>
  );
}
