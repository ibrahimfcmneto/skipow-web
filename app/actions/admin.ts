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

    // --- CORREÇÃO DO LINK ---
    // Em vez de pegar dinâmico, vamos definir manual para não cair na proteção da Vercel
    
    let baseUrl = 'http://localhost:3000'; // Padrão local

    if (process.env.NODE_ENV === 'production') {
        // 🔴 ATENÇÃO: COLOQUE AQUI O SEU LINK FINAL DA VERCEL
        // Exemplo: 'https://skipow-festa.vercel.app'
        // Não coloque a barra '/' no final
        baseUrl = 'https://skipow.vercel.app'; 
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