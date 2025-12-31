'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// --- FUNÇÃO 1: Buscar TODAS as fichas (Usada na página /fichas) ---
export async function buscarMinhasFichas() {
  try {
    // Busca todas as fichas ordenadas pela data de compra (mais novas primeiro)
    const fichas = await prisma.ficha.findMany({
      orderBy: {
        dataCompra: 'desc'
      }
    })

    return { sucesso: true, dados: fichas }
  } catch (error) {
    console.error("Erro ao buscar fichas:", error)
    return { sucesso: false, dados: [] }
  }
}

// --- FUNÇÃO 2: Buscar UMA ficha específica (Usada na página /fichas/[id]) ---
export async function buscarFichaUnica(codigoOuId: string) {
  try {
    // Tenta buscar pelo código (SKP-XXXX) ou pelo ID interno
    const ficha = await prisma.ficha.findFirst({
      where: {
        OR: [
          { codigo: codigoOuId },
          { id: codigoOuId }
        ]
      }
    })

    if (!ficha) return { sucesso: false }

    return { sucesso: true, dados: ficha }
  } catch (error) {
    console.error("Erro ao buscar ficha única:", error)
    return { sucesso: false }
  }
}