/*
    Objetivo:     Arquivo responsável pela manipulação dos dados dos tipos de produtos com o Banco de Dados (insert, update, delete e select)
    Autores:      Vinícius Santos Oliveira e Arthur Piloto Silva
    Data Criação: 23/11/2022
    Versão:       1.0
*/

const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require("../module/config")

const newType = async (type) => {
    if(type.tipo == '' || type.tipo == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    } else if(type.tipo.length > 20) {
        return {status: 400, message: MESSAGE_ERROR.EXCEEDED_CHARACTERS}
    } else {

        // Import da model do tipo de produto
        const newType = require('../models/DAO/type.js')

        // Chama a função para inserir um novo tipo de produto
        const resultNewType = await newType.insertType(type)

        if(resultNewType) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM}
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

const updateType = async (type) => {
    if(type.id == '' || type.id == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    } else if(type.tipo == '' || type.tipo == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    } else {
        const updatedType = require('../models/DAO/type.js')

        const result = updatedType.updateType(type)

        if(result) {
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

const deleteType = async(id) => {
    if(id != '' || id != undefined) {
        const deletedType = require('../models/DAO/type.js')

        const result = deletedType.deleteType(id)

        if(result) {
            return {status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM}
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    } else {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }
}

const listAllTypes = async () => {
    let typesJson = {}

    const { selectAllTypes } = require('../models/DAO/type.js')

    const typesData = await selectAllTypes()

    if(typesData) {
        typesJson.types = typesData
        return typesJson
    } else {
        return false
    }
}

module.exports = {
    newType,
    updateType,
    deleteType,
    listAllTypes
}