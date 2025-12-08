"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function FichaPage({ params }) {
  const router = useRouter();
  const [ficha, setFicha] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("skipow_fichas");

      if (data) {
        const lista = JSON.parse(data);

        // tenta achar a ficha por vários jeitos
        const encontrada =
          lista.find((f) => f.id === params.id) ||
          lista.find((f) => f.codigo === params.id) ||
          lista.find((f) => f.codigoFicha === params.id) ||
          lista.find((f) => f.codigo_ficha === params.id) ||
          // fallback: se params.id for tipo SKP-0001, tenta casar com o índice
          lista.find((_, index) => {
            const codigoGerado =
              "SKP-" + String(index + 1).padStart(4, "0");
            return codigoGerado === params.id;
          });

        setFicha(encontrada || null);
      } else {
        setFicha(null);
      }

      setCarregando(false);
    }
  }, [params.id]);

  if (carregando) {
    return (
      <main className="min-h-screen bg-black/40 flex items-center justify-center">
        <p className="text-white">Carregando ficha...</p>
      </main>
    );
  }

  if (!ficha) {
    return (
      <main className="min-h-screen bg-black/40 flex items-center justify-center px-5">
        <div className="bg-white rounded-[26px] px-6 py-8 shadow-xl text-center max-w-xs">
          <p className="text-gray-800 font-semibold mb-4">
            Ficha não encontrada.
          </p>
          <button
            onClick={() => router.push("/fichas")}
            className="px-4 py-2 rounded-xl bg-[#40BB43] text-white font-semibold text-sm"
          >
            Voltar para fichas
          </button>
        </div>
      </main>
    );
  }

  const evento = ficha.evento || "De Férias com a FACECA";

  return (
    <main className="min-h-screen bg-black/40 flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-white rounded-[26px] px-6 pt-5 pb-8 shadow-xl relative">
        {/* botão fechar */}
        <button
          onClick={() => router.push("/fichas")}
          className="absolute right-5 top-5 text-2xl font-semibold text-gray-700"
        >
          X
        </button>

        {/* status bolinha verde */}
        <div className="flex items-center justify-between mb-3 mt-2">
          <span className="w-3 h-3 rounded-full bg-[#40BB43]" />
        </div>

        {/* título usando o NOME correto da bebida */}
        <h1 className="text-center text-[22px] font-extrabold text-gray-900 mb-2">
          {ficha.nome}
        </h1>

        <p className="text-center text-[13px] text-gray-600 mb-4">
          Válido para: {evento}
        </p>

        {/* QR CODE estático que você já colocou no /public */}
        <div className="flex justify-center mb-5">
          <Image
            src="/qr-skp-82a1.png" // mantém o mesmo arquivo de antes
            alt="QR Code da ficha"
            width={230}
            height={230}
            className="object-contain"
          />
        </div>

        <p className="text-center text-[16px] text-gray-800 mb-1">
          Código da ficha:{" "}
          <span className="font-semibold">
            {ficha.id || ficha.codigo || ficha.codigoFicha || ficha.codigo_ficha}
          </span>
        </p>

        <p className="text-center text-[14px] text-gray-600 mt-3">
          Mostre este QR Code no bar para retirar sua bebida.
        </p>
      </div>
    </main>
  );
}
