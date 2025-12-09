"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FichasPage() {
  const router = useRouter();
  const [fichas, setFichas] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("skipow_fichas");
      if (data) {
        setFichas(JSON.parse(data));
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-md px-5 pb-10">
        {/* HEADER */}
        <header className="pt-6 mb-4 flex items-center justify-between">
          <button
            onClick={() => router.push("/cardapio")}
            className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center"
          >
            <span className="text-2xl font-bold text-gray-900">←</span>
          </button>

          <div className="flex-1 flex flex-col items-center">
            <h1 className="text-[26px] font-extrabold text-gray-900 leading-tight">
              Fichas disponíveis
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Total de fichas: {fichas.length}
            </p>
          </div>

          <div className="w-11 h-11" />
        </header>

        <p className="text-center text-[20px] text-gray-700 mb-4">
          “Menos fila.{" "}
          <span className="text-[#40BB43] font-semibold">Mais festa.</span>”
        </p>

        {/* LISTA DE FICHAS */}
        <div className="space-y-4 mt-2">
          {fichas.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
              Você ainda não possui fichas.
            </p>
          )}

          {fichas.map((ficha) => (
            <Link
              key={ficha.id}
              href={`/fichas/${ficha.id}`}
              className="block bg-white rounded-[26px] shadow-[0_15px_35px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center gap-4"
            >
              {/* imagem da bebida */}
              <div className="w-16 h-16 flex items-center justify-center">
                {ficha.imagem && (
                  <Image
                    src={ficha.imagem}
                    alt={ficha.nome}
                    width={64}
                    height={64}
                    className="object-contain max-h-16"
                  />
                )}
              </div>

              <div className="flex-1">
                <p className="text-[18px] font-extrabold text-gray-900">
                  {ficha.nome}
                </p>
                <p className="text-[12px] text-gray-600 truncate">
                  Válido para: {ficha.evento}
                </p>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span
                  className={`text-[13px] font-semibold ${
                    ficha.status === "disponivel"
                      ? "text-[#40BB43]"
                      : "text-red-500"
                  }`}
                >
                  {ficha.status === "disponivel" ? "Disponível" : "Usada"}
                </span>
                <span className="text-xl">&gt;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
