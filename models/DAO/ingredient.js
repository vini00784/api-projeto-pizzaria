/*
    Objetivo:     API responsável pela manipulação dos dados dos ingredientes com o Banco de Dados (INSERT, UPDATE, SELECT, DELETE)
    Autores:      Vinícius Santos Oliveira e Arthur Piloto Silva
    Data Criação: 01/12/2022
    Versão:       1.0
*/

// Import da classe PrismaClient, que é responsável pelas interações com o Banco de Dados
const { PrismaClient } = require('@prisma/client')

// Instância da classe PrismaClient
const prisma = new PrismaClient()

// Função para inserção de um novo produto
const insertIngredient = async (ingredient) => {
    try {
        let sql = `insert into tbl_ingrediente (nome)
                        values (
                            '${ingredient.nome}'
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
const updateProduct = async (ingredient) => {
    
}

// Função para exclusão de um produto
const deleteIngredient = async (id) => {
    
}

// Função para retornar todos os produtos
const selectAllIngredients = async () => {
    
}

module.exports = {
    insertIngredient,
    updateProduct,
    deleteIngredient,
    selectAllIngredients
}