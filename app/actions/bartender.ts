'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function validarFicha(codigo: string) {
  try {
    // 1. Busca a ficha no banco
    const ficha = await prisma.ficha.findUnique({
      where: { codigo: codigo }
    })

    // 2. Verificações de Segurança
    if (!ficha) {
      return { sucesso: false, erro: "Ficha não encontrada" }
    }

    if (ficha.status !== 'disponivel') {
      // Se já foi usada, retorna erro e NÃO valida de novo
      return { 
        sucesso: false, 
        erro: "Ficha já utilizada", 
        detalhe: `Usada em: ${ficha.dataUso?.toLocaleString('pt-BR')}`
      }
    }

    // 3. O PULO DO GATO: Atualizar o status para 'usada'
    // É AQUI que a mágica acontece. Se não tiver isso, a ficha nunca gasta.
    const fichaAtualizada = await prisma.ficha.update({
      where: { id: ficha.id },
      data: {
        status: 'usada',       // Marca como usada
        dataUso: new Date()    // Grava a hora exata que o bartender bipou
      }
    })

    // 4. Retorna sucesso para o Bartender ver a tela verde
    return {
      sucesso: true,
      produto: fichaAtualizada.nomeProduto,
      hora: fichaAtualizada.dataUso?.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }

  } catch (erro) {
    console.error(erro)
    return { sucesso: false, erro: "Erro no sistema" }
  }
}