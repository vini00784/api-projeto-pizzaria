/*
    Objetivo:     API responsável pela manipulação dos dados dos produtos com o Banco de Dados (INSERT, UPDATE, SELECT, DELETE)
    Autores:      Vinícius Santos Oliveira e Arthur Piloto Silva
    Data Criação: 12/12/2022
    Versão:       1.0
*/

// Import da classe PrismaClient, que é responsável pelas interações com o Banco de Dados
const { PrismaClient } = require('@prisma/client')

// Instância da classe PrismaClient
const prisma = new PrismaClient()

// Função para inserção de um novo produto
const insertProductPromotion = async (productPromotion) => {
    try {
        let sql = `insert into tbl_promocao_produto (id_produto, id_promocao)
                        values (
                            ${productPromotion.id_produto},
                            ${productPromotion.id_promocao}
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

// Função para atualização de um produto
const updateProductPromotion = async (productPromotion) => {
    
}

// Função para exclusão de um produto
const deleteProductPromotion = async (id) => {
    // try {
    //     let sql = `update from tbl_ingrediente_produto
    //                set status_ingrediente = false
    //                where id = ${id}` 
    // } catch(error) {
    //     console.log(error)
    //     return false
    // }
}

// Função para retornar todos os produtos
const selectProductPromotion = async (productId) => {
    let sql = `SELECT cast(tbl_produto.id as decimal) as id_produto, tbl_produto.nome as nome_produto, tbl_produto.foto, tbl_produto.descricao,
    tbl_promocao.nome as nome_promocao, tbl_promocao.porcentagem_desconto, tbl_promocao.preco_final, date_format(tbl_promocao.data_inicio, '%d/%m/%Y') as data_inicio, date_format(tbl_promocao.data_termino, '%d/%m/%Y') as data_termino
    
    FROM tbl_produto
    
    INNER JOIN tbl_promocao_produto
      ON tbl_produto.id = tbl_promocao_produto.id_produto
      
    INNER JOIN tbl_promocao
      ON tbl_promocao.id = tbl_promocao_produto.id_promocao
                      
                      WHERE tbl_produto.id = ${productId}`

    const rsProductIngredient = await prisma.$queryRawUnsafe(sql)

    if(rsProductIngredient.length > 0) {
        return rsProductIngredient
    } else {
        return false
    }
}

module.exports = {
    insertProductPromotion,
    updateProductPromotion,
    deleteProductPromotion,
    selectProductPromotion
}