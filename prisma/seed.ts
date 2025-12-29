import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando o seed...')

  // Criar ficha de teste
  const ficha = await prisma.ficha.upsert({
    where: { codigo: 'SKP-TESTE-1' },
    update: {},
    create: {
      codigo: 'SKP-TESTE-1',
      nomeProduto: 'Corote',
      imagemUrl: '/corote.png',
      evento: 'De férias com a FACECA',
      status: 'disponivel',
      dataCompra: new Date()
    }
  })

  console.log(`✅ Ficha criada com sucesso!`)
  console.log(`👉 Produto: ${ficha.nomeProduto}`)
  console.log(`👉 Código para o QR Code: ${ficha.codigo}`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })