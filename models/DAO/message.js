/*
    Objetivo:     API responsável pela manipulação dos dados das mensagens com o Banco de Dados (INSERT, UPDATE, SELECT, DELETE)
    Autores:      Vinícius Santos Oliveira e Arthur Piloto Silva
    Data Criação: 06/12/2022
    Versão:       1.0
*/

// Import da classe PrismaClient, que é responsável pelas interações com o Banco de Dados
const { PrismaClient } = require('@prisma/client')

// Instância da classe PrismaClient
const prisma = new PrismaClient()

// Função para inserção de uma nova mensagem
const insertMessage = async (message) => {
    try {
        let sql = `insert into tbl_mensagem (nome,
                                             email,
                                             celular,
                                             data_envio,
                                             mensagem,
                                             id_tipo_mensagem)
                                             values (
                                                '${message.nome}',
                                                '${message.email}',
                                                '${message.celular}',
                                                '${message.data_envio}',
                                                '${message.mensagem}',
                                                ${message.id_tipo_mensagem}
                                             )`
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

// Função para atualização de uma mensagem
// const updateMessage = async (message) => {
    
// }

// Função para exclusão de uma mensagem
// const deleteMessage = async (id) => {

// }

// Função para retornar todas as mensagens
const selectAllMessages = async () => {
    let sql = `select cast(tbl_mensagem.id as decimal) as id_mensagem, tbl_mensagem.nome as nome_cliente, tbl_mensagem.email, tbl_mensagem.celular, date_format(tbl_mensagem.data_envio, '%d/%m/%Y') as data_envio, tbl_mensagem.mensagem,
                      tbl_tipo_mensagem.nome as tipo
                      FROM tbl_mensagem
    
                      INNER JOIN tbl_tipo_mensagem
                      ON tbl_tipo_mensagem.id = tbl_mensagem.id_tipo_mensagem`

    const rsMessages = await prisma.$queryRawUnsafe(sql)

    if(rsMessages.length > 0) {
        return rsMessages
    } else {
        return false
    }
}

module.exports = {
    insertMessage,
    // updateMessage,
    // deleteMessage,
    selectAllMessages
}