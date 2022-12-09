/*
    Objetivo:     API responsável pela manipulação dos dados das categorias dos produtos com o Banco de Dados (INSERT, UPDATE, SELECT, DELETE)
    Autores:      Vinícius Santos Oliveira e Arthur Piloto Silva
    Data Criação: 23/11/2022
    Versão:       1.0
*/

// Import da classe PrismaClient, que é responsável pelas interações com o Banco de Dados
const { PrismaClient } = require('@prisma/client')

// Instância da classe PrismaClient
const prisma = new PrismaClient()

// Função para inserção de uma nova categoria
const insertCategory = async (category) => {
    try {
        let sql = `insert into tbl_categoria (nome)
                    values ('${category.nome}')`
        
        const result = await prisma.$executeRawUnsafe(sql)

        if(result) {
            return true
        } else {
            return false
        }

    } catch(error) {
        console.log(error);
        return false
    }
}

// Função para atualização de uma categoria
const updateCategory = async (category) => {
    try {
        let sql = `update tbl_categoria 
                   set nome = '${category.nome}'
                   where id = ${category.id}`

        const result = await prisma.$executeRawUnsafe(sql)

        if(result) {
            return true
        } else {
            return false
        }
    }catch(error) {
        console.log(error);
        return false
    }
}

// Função para exclusão de uma categoria
const deleteCategory = async (id) => {
    try {
        let sql = `delete from tbl_categoria where id = ${id}`

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

// Função para retornar todas as categorias
const selectAllCategories = async () => {
    let sql = 'select * from tbl_categoria order by id desc'

    const rsCategories = await prisma.$queryRawUnsafe(sql)

    if(rsCategories.length > 0) {
        return rsCategories
    } else {
        return false
    }
}

//Função para retornar o ID de acordo com o nome da Categoria 
const selectCategoryId = async(categoryName) => {
    let sql = `select id from tbl_categoria where nome like '${categoryName}'`

    const rsId = await prisma.$queryRawUnsafe(sql)

    if(rsId.length > 0) {
        return rsId
    } else {
        return false
    }
}

module.exports = {
    insertCategory,
    updateCategory,
    deleteCategory,
    selectAllCategories,
    selectCategoryId
}