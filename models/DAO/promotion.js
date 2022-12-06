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
    
}

// Função para exclusão de uma promoção
const deletePromotion = async (id) => {
    
}

// Função para retornar todas as promoções
const selectAllPromotions = async () => {
    
}

module.exports = {
    insertNewPromotion,
    updatePromotion,
    deletePromotion,
    selectAllPromotions
}