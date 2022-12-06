/*
    Objetivo:     API responsável pela manipulação dos dados dos tipos de produto com o Banco de Dados (INSERT, UPDATE, SELECT, DELETE)
    Autores:      Vinícius Santos Oliveira e Arthur Piloto Silva
    Data Criação: 23/11/2022
    Versão:       1.0
*/

// Import da classe PrismaClient, que é responsável pelas interações com o Banco de Dados
const { PrismaClient } = require('@prisma/client')

// Instância da classe PrismaClient
const prisma = new PrismaClient()

// Função para inserção de um novo tipo de produto
const insertNewProductType = async (type) => {
    try {
        let sql = `insert into tbl_tipo_produto (tipo)
                        values (
                            '${type.tipo}'
                        )`

        const result = await prisma.$executeRawUnsafe(sql)

        if(result) {
            return true
        } else {
            return false
        }
    } catch(error) {
        return false
    }
}

// Função para atualização de um tipo de produto
const updateProductType = async (type) => {
    try {
        let sql = `update tbl_tipo_produto 
                   set tipo = '${type.tipo}'
                   where id = ${type.id}`

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

// Função para exclusão de um tipo de produto
const deleteProductType = async (id) => {
    try {
        let sql = `delete from tbl_tipo_produto where id = ${id}`

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

// Função para retornar todos os tipos de produto
const selectAllProductTypes = async () => {
    let sql = 'select cast(id as decimal) as id, tipo from tbl_tipo_produto order by id desc'

    const rsTypes = await prisma.$queryRawUnsafe(sql)

    if(rsTypes.length > 0) {
        return rsTypes
    } else {
        return false
    }
}

module.exports = {
    insertNewProductType,
    updateProductType,
    deleteProductType,
    selectAllProductTypes
}