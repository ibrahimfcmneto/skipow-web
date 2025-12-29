'use server'

import { PrismaClient } from '@prisma/client'

// Evita criar múltiplas conexões no modo dev
const globalForPrisma = global as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function validarFicha(codigo: string) {
  console.log(`🔍 Verificando ficha: ${codigo}`)

  try {
    // 1. Busca a ficha no banco
    const ficha = await prisma.ficha.findUnique({
      where: { codigo: codigo }
    })

    // 2. Se não existir
    if (!ficha) {
      return { sucesso: false, erro: "Ficha não encontrada no sistema." }
    }

    // 3. Se já foi usada
    if (ficha.status === 'usada') {
      const horaUso = ficha.dataUso ? new Date(ficha.dataUso).toLocaleTimeString('pt-BR') : 'Desconhecida'
      return { 
        sucesso: false, 
        erro: "Ficha JÁ UTILIZADA!", 
        detalhe: `Usada às ${horaUso}` 
      }
    }

    // 4. Se estiver tudo certo: QUEIMA A FICHA (Marca como usada)
    await prisma.ficha.update({
      where: { id: ficha.id },
      data: { 
        status: 'usada',
        dataUso: new Date()
      }
    })

    // Retorna sucesso
    return { 
      sucesso: true, 
      produto: ficha.nomeProduto,
      hora: new Date().toLocaleTimeString('pt-BR')
    }

  } catch (error) {
    console.error("Erro no banco:", error)
    return { sucesso: false, erro: "Erro interno no servidor." }
  }
}