'use server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function buscarLinkPorTelefone(telefoneBusca: string) {
  try {
    // Busca qualquer ficha que tenha esse telefone
    // Dica: O ideal é buscar usando "contains" ou garantir que salva só números
    const ficha = await prisma.ficha.findFirst({
      where: {
        telefoneCliente: {
          contains: telefoneBusca // Busca parcial (se digitar 11999... acha)
        }
      }
    })

    if (!ficha) {
      return { sucesso: false, erro: "Nenhuma ficha encontrada para este número." }
    }

    // Conta quantas fichas esse usuário tem
    const qtd = await prisma.ficha.count({
      where: { usuarioId: ficha.usuarioId }
    })

    // Gera o link usando o ID que já está no banco
    // ATENÇÃO: Troque pelo seu domínio real quando for pra produção
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
    const linkMagico = `${baseUrl}/recuperar?uid=${ficha.usuarioId}`;

    return {
      sucesso: true,
      qtdFichas: qtd,
      link: linkMagico
    }

  } catch (error) {
    console.error(error);
    return { sucesso: false, erro: "Erro ao buscar no banco." }
  }
}