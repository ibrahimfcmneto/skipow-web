"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function RecuperarLogica() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Recuperando sua conta...");

  useEffect(() => {
    // 1. Tenta pegar o ID da URL (ex: ?uid=123-abc)
    const uid = searchParams.get("uid");

    if (uid) {
      // 2. Salva no navegador do celular novo
      localStorage.setItem("skipow_user_id", uid);
      
      // 3. Redireciona para as fichas
      setTimeout(() => {
        router.push("/fichas");
      }, 1000);
    } else {
      setStatus("Link inválido. Nenhum ID encontrado.");
    }
  }, [searchParams, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-5 text-center">
      <div className="w-12 h-12 border-4 border-[#40BB43] border-t-transparent rounded-full animate-spin mb-4"></div>
      <h1 className="text-xl font-bold">{status}</h1>
    </div>
  );
}

// O Next.js pede Suspense para páginas que usam useSearchParams
export default function RecuperarPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Carregando...</div>}>
      <RecuperarLogica />
    </Suspense>
  );
}