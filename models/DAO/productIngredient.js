/*
    Objetivo:     API responsável pela manipulação dos dados dos produtos com o Banco de Dados (INSERT, UPDATE, SELECT, DELETE)
    Autores:      Vinícius Santos Oliveira e Arthur Piloto Silva
    Data Criação: 23/11/2022
    Versão:       1.0
*/

// Import da classe PrismaClient, que é responsável pelas interações com o Banco de Dados
const { PrismaClient } = require('@prisma/client')

// Instância da classe PrismaClient
const prisma = new PrismaClient()

// Função para inserção de um novo produto
const insertProductIngredient = async (productIngredient) => {
    try {
        let sql = `insert into tbl_ingrediente_produto (id_produto, id_ingrediente)
                        values (
                            ${productIngredient.id_produto},
                            ${productIngredient.id_ingrediente}
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
const updateProductIngredient = async (productIngredient) => {
    
}

// Função para exclusão de um produto
const deleteProductIngredient = async (id) => {

}

// Função para retornar todos os produtos
const selectProductIngredient = async (productId) => {
    let sql = `SELECT cast(tbl_produto.id as decimal) as id_produto, tbl_produto.nome as nome_produto,
                      cast(tbl_ingrediente.id as decimal) as id_ingrediente, tbl_ingrediente.nome as nome_ingrediente
                      FROM tbl_produto
    
                      INNER JOIN tbl_ingrediente_produto
                      ON tbl_produto.id = tbl_ingrediente_produto.id_produto
      
                      INNER JOIN tbl_ingrediente
                      ON tbl_ingrediente.id = tbl_ingrediente_produto.id_ingrediente
                      
                      WHERE tbl_produto.id = ${productId}`

    const rsProductIngredient = await prisma.$queryRawUnsafe(sql)

    if(rsProductIngredient.length > 0) {
        return rsProductIngredient
    } else {
        return false
    }
}

module.exports = {
    insertProductIngredient,
    updateProductIngredient,
    deleteProductIngredient,
    selectProductIngredient
}