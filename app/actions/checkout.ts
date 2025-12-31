'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function processarPagamento(itens: any[], usuarioId: string, telefone: string) {
  try {
    if (!usuarioId) return { sucesso: false, erro: "ID do usuário não fornecido" }

    const telefoneFinal = telefone ? telefone.replace(/\D/g, "") : null;

    // Array para guardar todas as promessas de criação
    const criacoes = [];

    for (const item of itens) {
      // Se for um COMBO que deve gerar várias fichas, o frontend deve mandar 'quantidade' correta
      // Mas se o produto se chama "Combo 3x", e quantidade é 1, ele gera 1 ficha com nome "Combo 3x"
      
      // SE VOCÊ QUER QUE GERE FICHAS INDIVIDUAIS PARA COMBOS:
      // Você pode tentar detectar pelo nome (arriscado) ou garantir que o carrinho mande a quantidade certa.
      // Ex: No carrinho, ao adicionar "Combo 3x", adicione o produto "Cerveja" com quantidade 3.
      
      // Assumindo que 'item.quantidade' é o número de fichas que você quer:
      for (let i = 0; i < item.quantidade; i++) {
        
        // Gera um código único garantido
        const codigoAleatorio = Math.random().toString(36).substring(2, 10).toUpperCase();
        const timestamp = Date.now().toString().slice(-4); // Adiciona tempo para evitar duplicidade
        const codigoFinal = `SKP-${codigoAleatorio}${timestamp}`;

        criacoes.push(
          prisma.ficha.create({
            data: {
              codigo: codigoFinal,
              nomeProduto: item.nome, // Vai sair "Cerveja" (se for o nome do item)
              evento: 'Skipow Sunset',
              status: 'disponivel',
              imagemUrl: item.imagem || null,
              usuarioId: usuarioId,
              telefoneCliente: telefoneFinal
            }
          })
        );
      }
    }

    // Executa todas as criações em paralelo para ser mais rápido
    await prisma.$transaction(criacoes);

    return { sucesso: true }

  } catch (erro) {
    console.error("Erro no checkout:", erro)
    return { sucesso: false, erro: "Falha ao processar pagamento" }
  }
}