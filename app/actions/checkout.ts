'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function gerarCodigoUnico() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let resultado = '';
  for (let i = 0; i < 6; i++) {
    resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return `SKP-${resultado}`;
}

// 1. Adicionamos o parametro usuarioId aqui
export async function processarPagamento(itensCarrinho: any[], usuarioId: string) {
  try {
    const fichasCriadas = []

    for (const item of itensCarrinho) {
      for (let i = 0; i < item.quantidade; i++) {
        
        // Dados comuns
        const dadosBase = {
            codigo: gerarCodigoUnico(),
            status: 'disponivel',
            evento: 'Festa Universitária',
            dataCompra: new Date(),
            usuarioId: usuarioId // <--- 2. Salvamos o dono aqui
        }

        if (item.isCombo && item.comboQtd) {
          for (let c = 0; c < item.comboQtd; c++) {
            const novaFicha = await prisma.ficha.create({
              data: {
                ...dadosBase,
                codigo: gerarCodigoUnico(), // Gera outro código pro combo
                nomeProduto: item.comboItemName,
                imagemUrl: item.comboItemImage || item.imagem,
              }
            })
            fichasCriadas.push(novaFicha)
          }
        } else {
          const novaFicha = await prisma.ficha.create({
            data: {
              ...dadosBase,
              nomeProduto: item.nome,
              imagemUrl: item.imagem,
            }
          })
          fichasCriadas.push(novaFicha)
        }
      }
    }

    return { sucesso: true, totalFichas: fichasCriadas.length }

  } catch (erro) {
    console.error("Erro no checkout:", erro)
    return { sucesso: false, erro: "Falha ao gerar fichas." }
  }
}