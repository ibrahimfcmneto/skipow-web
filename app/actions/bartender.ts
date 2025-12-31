'use server'

import { PrismaClient } from '@prisma/client'

// DICA: Mova a instância do Prisma para fora da função para tentar reaproveitar a conexão
const prisma = new PrismaClient()

export async function validarFicha(codigo: string) {
  const inicio = performance.now(); // Debug de tempo

  try {
    // TENTATIVA OTIMIZADA: Atualiza direto se estiver disponível
    // Isso faz a busca e a atualização em 1 comando só (metade do tempo)
    const fichaAtualizada = await prisma.ficha.update({
        where: { 
            codigo: codigo,
            status: 'disponivel' // Só atualiza se estiver disponível
        },
        data: {
            status: 'usada',
            dataUso: new Date()
        }
    }).catch(() => null); // Se der erro (não achou ou já usada), retorna null

    // CASO 1: SUCESSO (Validou em ~200ms)
    if (fichaAtualizada) {
        console.log(`🚀 Validação rápida: ${performance.now() - inicio}ms`);
        return {
            sucesso: true,
            produto: fichaAtualizada.nomeProduto,
            hora: fichaAtualizada.dataUso?.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        }
    }

    // CASO 2: FALHA (Ficha não existe ou já foi usada)
    // Só agora fazemos a busca lenta para saber QUAL foi o erro
    const fichaErro = await prisma.ficha.findUnique({
        where: { codigo: codigo }
    });

    if (!fichaErro) {
        return { sucesso: false, erro: "Código inválido" }
    }

    if (fichaErro.status !== 'disponivel') {
        return { 
            sucesso: false, 
            erro: "Ficha já utilizada", 
            detalhe: `Usada às ${fichaErro.dataUso?.toLocaleTimeString('pt-BR')}`
        }
    }

    return { sucesso: false, erro: "Erro desconhecido" }

  } catch (erro) {
    console.error("Erro crítico:", erro)
    return { sucesso: false, erro: "Erro no sistema" }
  }
}