'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Função para gerar código aleatório (ex: SKP-9A2B)
function gerarCodigoUnico() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let resultado = '';
  for (let i = 0; i < 6; i++) {
    resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return `SKP-${resultado}`;
}

export async function processarPagamento(itensCarrinho: any[]) {
  try {
    const fichasCriadas = []

    // 1. Varrer cada item do carrinho
    for (const item of itensCarrinho) {
      
      // Quantidade de vezes que o item foi adicionado
      for (let i = 0; i < item.quantidade; i++) {

        // LÓGICA DE COMBO vs PRODUTO NORMAL
        // Se for combo, precisamos criar várias fichas (ex: 3)
        if (item.isCombo && item.comboQtd) {
          
          // Loop interno para criar as fichas do combo
          for (let c = 0; c < item.comboQtd; c++) {
            const novaFicha = await prisma.ficha.create({
              data: {
                codigo: gerarCodigoUnico(),
                nomeProduto: item.comboItemName, // Ex: "Corote" (e não "Combo Corote")
                imagemUrl: item.comboItemImage || item.imagem,
                status: 'disponivel',
                evento: 'Festa Universitária', // Pode vir dinâmico depois
                dataCompra: new Date()
              }
            })
            fichasCriadas.push(novaFicha)
          }

        } else {
          // PRODUTO INDIVIDUAL (Água, Cerveja Avulsa)
          const novaFicha = await prisma.ficha.create({
            data: {
              codigo: gerarCodigoUnico(),
              nomeProduto: item.nome,
              imagemUrl: item.imagem,
              status: 'disponivel',
              evento: 'Festa Universitária',
              dataCompra: new Date()
            }
          })
          fichasCriadas.push(novaFicha)
        }
      }
    }

    // Retorna sucesso e a lista de códigos gerados (opcional)
    return { sucesso: true, totalFichas: fichasCriadas.length }

  } catch (erro) {
    console.error("Erro no checkout:", erro)
    return { sucesso: false, erro: "Falha ao gerar fichas." }
  }
}