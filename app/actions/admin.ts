'use server'

import { PrismaClient } from '@prisma/client'

// Dica de performance: Mantém uma conexão única se possível
const prisma = new PrismaClient()

export async function buscarLinkPorTelefone(telefoneBusca: string) {
  try {
    // 1. Limpa o telefone para garantir que só tem números
    const telLimpo = telefoneBusca.replace(/\D/g, "");

    if (!telLimpo || telLimpo.length < 8) {
        return { sucesso: false, erro: "Número inválido" }
    }

    // 2. Busca qualquer ficha que tenha esse telefone
    // Usamos 'findFirst' porque só precisamos de 1 ficha para descobrir o usuarioId
    const ficha = await prisma.ficha.findFirst({
      where: {
        telefoneCliente: {
          contains: telLimpo // "contains" ajuda se tiver salvo sem DDD ou formato diferente
        }
      }
    })

    if (!ficha) {
      return { sucesso: false, erro: "Nenhuma ficha encontrada para este número." }
    }

    // 3. Conta quantas fichas esse usuário tem no total
    const qtd = await prisma.ficha.count({
      where: { usuarioId: ficha.usuarioId }
    })

    // 4. Gera o link de recuperação
    // Pega a URL do site (Vercel) ou localhost
    const baseUrl = process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}` 
        : 'http://localhost:3000';
        
    const linkMagico = `${baseUrl}/recuperar?uid=${ficha.usuarioId}`;

    return {
      sucesso: true,
      qtdFichas: qtd,
      link: linkMagico
    }

  } catch (error) {
    console.error("Erro ao buscar cliente:", error);
    return { sucesso: false, erro: "Erro interno ao buscar no banco." }
  }
}