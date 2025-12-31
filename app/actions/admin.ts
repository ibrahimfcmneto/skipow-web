'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function buscarLinkPorTelefone(telefoneBusca: string) {
  try {
    const telLimpo = telefoneBusca.replace(/\D/g, "");

    if (!telLimpo || telLimpo.length < 8) {
        return { sucesso: false, erro: "Número inválido" }
    }

    const ficha = await prisma.ficha.findFirst({
      where: {
        telefoneCliente: {
          contains: telLimpo
        }
      }
    })

    if (!ficha) {
      return { sucesso: false, erro: "Nenhuma ficha encontrada para este número." }
    }

    const qtd = await prisma.ficha.count({
      where: { usuarioId: ficha.usuarioId }
    })

    // --- CONFIGURAÇÃO DO LINK ---
    let baseUrl = 'http://localhost:3000'; 

    if (process.env.NODE_ENV === 'production') {
        // 🔴🔴🔴 IMPORTANTE:
        // TROQUE O LINK ABAIXO PELO LINK REAL DO SEU SITE QUE ESTÁ NO NAVEGADOR
        // NÃO use 'skipow.vercel.app' se esse não for o seu.
        // Exemplo: 'https://meu-evento-top.vercel.app'
        
        baseUrl = 'https://SEU-LINK-REAL-AQUI.vercel.app'; 
    }

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