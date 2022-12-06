/*
    Objetivo:     Arquivo responsável pela manipulação dos dados das mensagens com o Banco de Dados (insert, update, delete e select)
    Autores:      Vinícius Santos Oliveira e Arthur Piloto Silva
    Data Criação: 23/11/2022
    Versão:       1.0
*/

// Arquivo de mensagens padronizadas
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../module/config.js')

// Função que gera nova mensagem no BD
const newMessage = async (message) => {
    if(message.nome == ''|| message.nome == undefined || message.email == ''|| message.email == undefined || message.data_envio == '' || message.data_envio == undefined || message.mensagem == '' || message.mensagem == undefined || message.id_tipo_mensagem == '' || message.id_tipo_mensagem == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    } else if(message.nome.length > 80 || message.email.length > 256 || message.celular.length > 20) {
        return {status: 400, message: MESSAGE_ERROR.EXCEEDED_CHARACTERS}
    } else {
        const newMessage = require('../models/DAO/message.js')

        const resultNewMessage = newMessage.insertMessage(message)

        if(resultNewMessage) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM}
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

// Função que atualiza mensagem no BD
const updateMessage = async (message) => {
    
}

// Função que delete mensagem do BD
const deleteMessage = async (id) => {
    
}

// Função que lista todas as mensagens do BD
const listAllMessages = async () => {
    let messagesJson = {}

    const { selectAllMessages } = require('../models/DAO/message.js')

    const messagesData = await selectAllMessages()

    if(messagesData) {
        messagesJson.messages = messagesData
        return messagesJson
    } else {
        return false
    }

}

module.exports = {
    newMessage,
    updateMessage,
    deleteMessage,
    listAllMessages
}