/*
    Objetivo:     Arquivo responsável pela manipulação dos dados dos tipos de mensagem com o Banco de Dados (insert, update, delete e select)
    Autores:      Vinícius Santos Oliveira e Arthur Piloto Silva
    Data Criação: 06/12/2022
    Versão:       1.0
*/

const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require("../module/config.js")

// Função que gera novo tipo de mensagem no BD
const newMessageType = async (type) => {
    if(type.nome == '' || type.nome == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    } else if(type.nome.length > 10) {
        return {status: 400, message: MESSAGE_ERROR.EXCEEDED_CHARACTERS}
    } else {
        const newMessageType = require('../models/DAO/messageType.js')

        const resultNewMessageType = await newMessageType.insertNewMessageType(type)

        if(resultNewMessageType) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM}
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

// Função que atualiza tipo de mensagem no BD
const updateMessageType = async (type) => {
    if(type.id == ''|| type.id == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    } else if(type.nome == '' || type.nome == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    } else if(type.nome.length > 20) {
        return {status: 400, message: MESSAGE_ERROR.EXCEEDED_CHARACTERS}
    } else {
        const updatedMessageType = require('../models/DAO/messageType.js')

        const result = updatedMessageType.updateMessageType(type)

        if(result) {
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

// Função que deleta tipo de mensagem do BD
const deleteMessageType = async (id) => {
    if(id != '' && id != undefined) {
        const deletedMessageType = require('../models/DAO/messageType.js')

        const result = deletedMessageType.deleteMessageType(id)

        if(result) {
            return {status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM}
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    } else {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }
}

// Função que lista todas os tipos de mensagem do BD
const listAllMessageType = async () => {
    let messageTypesJson = {}

    const { selectAllMessageTypes } = require('../models/DAO/messageType.js')

    const messageTypesData = await selectAllMessageTypes()

    if(messageTypesData) {
        messageTypesJson.types = messageTypesData
        return messageTypesJson
    } else {
        return false
    }
}

// Função que retorna o ID do tipo de mensagem de acordo com o nome
const selectMessageTypeId = async (messageTypeName) => {
    if(messageTypeName != '' && messageTypeName != undefined) {
        let idJson = {}
    
        const { selectMessageTypeId } = require('../models/DAO/messageType.js')
    
        const id = await selectMessageTypeId(messageTypeName)
    
        if(id) {
            idJson.id = id
            return id
        } else {
            false
        }
    }
}

module.exports = {
    newMessageType,
    updateMessageType,
    deleteMessageType,
    listAllMessageType,
    selectMessageTypeId
}