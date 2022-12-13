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
const updateIngredient = async (ingredient) => {
    try {
        let sql = `update tbl_ingrediente set
                   nome = '${ingredient.nome}',
                   status_ingrediente = ${ingredient.status}
                   where id = ${ingredient.id}`
        console.log(sql)

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

// Função para exclusão de um produto
const turnOffIngredient = async (id) => {
    try {
        let sql = `update tbl_ingrediente
                   set status_ingrediente = false
                   where id = ${id}`

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

const turnOnIngredient = async (id) => {
    try {
        let sql = `update tbl_ingrediente
                   set status_ingrediente = true
                   where id = ${id}`

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

// Função para retornar todos os produtos
const selectAllIngredients = async () => {
    let sql = 'select * from tbl_ingrediente order by id desc'

    const rsIngredients = await prisma.$queryRawUnsafe(sql)

    if(rsIngredients.length > 0) {
        return rsIngredients
    } else {
        return false
    }
}

//Função para retornar o ID de acordo com o nome da Categoria 
const selectIngredientId = async(ingredientName) => {
    let sql = `select id from tbl_ingrediente where nome like '${ingredientName}'`

    const rsId = await prisma.$queryRawUnsafe(sql)

    if(rsId.length > 0) {
        return rsId
    } else {
        return false
    }
}

module.exports = {
    insertIngredient,
    updateIngredient,
    turnOffIngredient,
    turnOnIngredient,
    selectAllIngredients,
    selectIngredientId
}