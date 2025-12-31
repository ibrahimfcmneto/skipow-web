'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// 1. Recebemos o usuarioId aqui
export async function buscarMinhasFichas(usuarioId: string) {
  try {
    const fichas = await prisma.ficha.findMany({
      where: {
        usuarioId: usuarioId // <--- 2. FILTRO MÁGICO (Só traz as dele)
      },
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

export async function buscarFichaUnica(codigoOuId: string) {
  // A busca única pode continuar global, pois o código SKP é difícil de adivinhar
  // Mas idealmente também filtraria pelo usuário se fosse um sistema bancário
  try {
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
    return { sucesso: false }
  }
}