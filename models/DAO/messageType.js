/*
    Objetivo:     API responsável pela manipulação dos dados dos tipos de mensagem com o Banco de Dados (INSERT, UPDATE, SELECT, DELETE)
    Autores:      Vinícius Santos Oliveira e Arthur Piloto Silva
    Data Criação: 06/12/2022
    Versão:       1.0
*/

// Import da classe PrismaClient, que é responsável pelas interações com o Banco de Dados
const { PrismaClient } = require('@prisma/client')

// Instância da classe PrismaClient
const prisma = new PrismaClient()

// Função para inserção de um novo tipo de mensagem
const insertNewMessageType = async (type) => {
    try {
        let sql = `insert into tbl_tipo_mensagem (nome)
                                values (
                                    '${type.nome}'
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

// Função para atualização de um tipo de mensagem
const updateMessageType = async (type) => {
    try {
        let sql = `update tbl_tipo_mensagem
                   set nome = '${type.nome}'
                   where id = ${type.id}`

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

// Função para exclusão de um tipo de mensagem
const deleteMessageType = async (id) => {
    try {
        let sql = `delete from tbl_tipo_mensagem where id = ${id}`

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

// Função para retornar todos os tipos de mensagem
const selectAllMessageTypes = async () => {
    let sql = 'select cast(id as decimal) as id, nome from tbl_tipo_mensagem order by nome'

    const rsMessageTypes = await prisma.$queryRawUnsafe(sql)

    if(rsMessageTypes.length > 0) {
        return rsMessageTypes
    } else {
        return false
    }
}

//Função para retornar o ID de acordo com o nome do Tipo 
const selectMessageTypeId = async(productMessageName) => {
    let sql = `select id from tbl_tipo_mensagem where nome like '${productMessageName}'`

    const rsId = await prisma.$queryRawUnsafe(sql)

    if(rsId.length > 0) {
        return rsId
    } else {
        return false
    }
}

module.exports = {
    insertNewMessageType,
    updateMessageType,
    deleteMessageType,
    selectAllMessageTypes,
    selectMessageTypeId
}