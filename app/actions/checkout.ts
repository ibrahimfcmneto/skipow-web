'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Agora aceitamos o telefone como terceiro item
export async function processarPagamento(itens: any[], usuarioId: string, telefone: string) {
  try {
    if (!usuarioId) return { sucesso: false, erro: "ID do usuário não fornecido" }

    // Tratamento simples do telefone (para garantir que salvamos se vier undefined)
    const telefoneFinal = telefone ? telefone.replace(/\D/g, "") : null;

    for (const item of itens) {
      for (let i = 0; i < item.quantidade; i++) {
        const codigoAleatorio = Math.random().toString(36).substring(2, 8).toUpperCase()
        
        await prisma.ficha.create({
          data: {
            codigo: `SKP-${codigoAleatorio}`,
            nomeProduto: item.nome,
            evento: 'Skipow Sunset',
            status: 'disponivel',
            imagemUrl: item.imagem || null,
            usuarioId: usuarioId,
            
            // --- AQUI QUE ELE SALVA NO BANCO ---
            telefoneCliente: telefoneFinal
          }
        })
      }
    }

    return { sucesso: true }

  } catch (erro) {
    console.error("Erro no checkout:", erro)
    return { sucesso: false, erro: "Falha ao processar pagamento" }
  }
}