/*
    Objetivo:     API responsável pela manipulação dos dados das promoções com o Banco de Dados (INSERT, UPDATE, SELECT, DELETE)
    Autores:      Vinícius Santos Oliveira e Arthur Piloto Silva
    Data Criação: 06/12/2022
    Versão:       1.0
*/

// Import da classe PrismaClient, que é responsável pelas interações com o Banco de Dados
const { PrismaClient } = require('@prisma/client')

// Instância da classe PrismaClient
const prisma = new PrismaClient()

// Função para inserção de uma nova promoção
const insertNewPromotion = async (promotion) => {
    try {
        let sql = `insert into tbl_promocao (nome,
                                             porcentagem_desconto,
                                             preco_final,
                                             data_inicio,
                                             data_termino)
                                             values (
                                                 '${promotion.nome}',
                                                 ${promotion.porcentagem_desconto},
                                                 ${promotion.preco_final},
                                                 '${promotion.data_inicio}',
                                                 '${promotion.data_termino}'
                                             )` 
         
         const result = await prisma.$executeRawUnsafe(sql)

         if(result) {
            return true
        } else {
            return false
        }
     } catch(error) {
         console.log(error)
         return false
     }
}

// Função para atualização de uma promoção
const updatePromotion = async (promotion) => {
    try {
        let sql = `update tbl_promocao
                   set nome = '${promotion.nome}',
                   porcentagem_desconto = ${promotion.porcentagem_desconto},
                   preco_final = ${promotion.preco_final},
                   data_inicio = '${promotion.data_inicio}',
                   data_termino = '${promotion.data_termino}'
                   where id = ${promotion.id}`

        const result = await prisma.$executeRawUnsafe(sql)

        if(result) {
            return true
        } else {
            return false
        }
    } catch(error) {
        console.log(error)
        return false
    }
}

// Função para exclusão de uma promoção
const deletePromotion = async (id) => {
    
}

// Função para retornar todas as promoções
const selectAllPromotions = async () => {
    let sql = `select cast(id as decimal) as id, nome, porcentagem_desconto, preco_final, date_format(data_inicio, '%d/%m/%Y') as data_inicio, date_format(data_termino, '%d/%m/%Y') as data_termino from tbl_promocao order by id desc`

    const rsPromotions = await prisma.$queryRawUnsafe(sql)

    if(rsPromotions.length > 0) {
        return rsPromotions
    } else {
        return false
    }
}

module.exports = {
    insertNewPromotion,
    updatePromotion,
    deletePromotion,
    selectAllPromotions
}