'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function processarPagamento(itens: any[], usuarioId: string, telefone: string) {
  try {
    if (!usuarioId) return { sucesso: false, erro: "ID do usuário não fornecido" }

    const telefoneFinal = telefone ? telefone.replace(/\D/g, "") : null;
    const criacoes = [];

    for (const item of itens) {
      // 1. Define quantas fichas gerar por unidade comprada
      // Se tiver 'fichasPorItem' usa ele, senão é 1
      const multiplicador = item.fichasPorItem || 1; 
      
      // 2. Define o nome que vai sair na ficha
      // Se tiver 'nomeIndividual' (ex: Corote), usa ele. Se não, usa o nome do produto (ex: Cerveja)
      const nomeNaFicha = item.nomeIndividual || item.nome;

      // Calcula o total real de fichas (Ex: 1 Combo * 3 unidades = 3 Fichas)
      const totalFichasParaGerar = item.quantidade * multiplicador;

      for (let i = 0; i < totalFichasParaGerar; i++) {
        
        const codigoAleatorio = Math.random().toString(36).substring(2, 8).toUpperCase();
        const timestamp = Date.now().toString().slice(-4);
        const codigoFinal = `SKP-${codigoAleatorio}${timestamp}`;

        criacoes.push(
          prisma.ficha.create({
            data: {
              codigo: codigoFinal,
              nomeProduto: nomeNaFicha, // <--- AQUI VAI O NOME "COROTE"
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

    await prisma.$transaction(criacoes);

    return { sucesso: true }

  } catch (erro) {
    console.error("Erro no checkout:", erro)
    return { sucesso: false, erro: "Falha ao processar pagamento" }
  }
}