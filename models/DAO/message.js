/*
    Objetivo:     API responsável pela manipulação dos dados das mensagens com o Banco de Dados (INSERT, UPDATE, SELECT, DELETE)
    Autores:      Vinícius Santos Oliveira e Arthur Piloto Silva
    Data Criação: 23/11/2022
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
                                             data,
                                             mensagem,
                                             id_tipo_mensagem)
                                             values (
                                                '${message.nome}',
                                                '${message.email}',
                                                '${message.celular}',
                                                '${message.data}',
                                                '${message.mensagem}',
                                                ${message.id_tipo_mensagem}
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

// Função para atualização de uma mensagem
const updateMessage = async (message) => {
    
}

// Função para exclusão de uma mensagem
const deleteMessage = async (id) => {

}

// Função para retornar todas as mensagens
const selectAllMessages = async () => {
    
}

module.exports = {
    insertMessage,
    updateMessage,
    deleteMessage,
    selectAllMessages
}