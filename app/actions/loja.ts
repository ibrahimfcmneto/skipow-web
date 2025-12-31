'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function comprarProduto(nomeProduto: string, preco: number) {
  try {
    // 1. Gerar um código único e aleatório (Ex: SKP-9X2A)
    // Pegamos 6 caracteres aleatórios e deixamos maiúsculo
    const codigoAleatorio = Math.random().toString(36).substring(2, 8).toUpperCase()
    const codigoFinal = `SKP-${codigoAleatorio}`

    // 2. Salvar no Banco de Dados
    const novaFicha = await prisma.ficha.create({
      data: {
        codigo: codigoFinal,
        nomeProduto: nomeProduto,
        status: 'disponivel', // Começa pronta para usar
        evento: 'Festa Skipow', // Você pode deixar dinâmico depois
        dataCompra: new Date(),
        imagemUrl: '/assets/drink-placeholder.png' // Imagem padrão
      }
    })

    console.log(`✅ Venda realizada: ${novaFicha.nomeProduto} (${novaFicha.codigo})`)

    // 3. Retornar o código para o Frontend mostrar o QR Code
    return {
      sucesso: true,
      codigo: novaFicha.codigo,
      produto: novaFicha.nomeProduto
    }

  } catch (erro) {
    console.error("Erro na compra:", erro)
    return { sucesso: false, erro: "Falha ao processar compra" }
  }
}