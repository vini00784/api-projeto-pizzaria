/*
    Objetivo:     Arquivo responsável pela manipulação dos dados dos tipos de produtos com o Banco de Dados (insert, update, delete e select)
    Autores:      Vinícius Santos Oliveira e Arthur Piloto Silva
    Data Criação: 23/11/2022
    Versão:       1.0
*/

const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require("../module/config")

const newProductType = async (type) => {
    if(type.tipo == '' || type.tipo == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    } else if(type.tipo.length > 20) {
        return {status: 400, message: MESSAGE_ERROR.EXCEEDED_CHARACTERS}
    } else {

        // Import da model do tipo de produto
        const newProductType = require('../models/DAO/productType.js')

        // Chama a função para inserir um novo tipo de produto
        const resultNewProductType = await newProductType.insertNewProductType(type)

        if(resultNewProductType) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM}
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

const updateProductType = async (type) => {
    if(type.id == '' || type.id == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    } else if(type.tipo == '' || type.tipo == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    } else if(type.tipo.length > 20) {
        return {status: 400, message: MESSAGE_ERROR.EXCEEDED_CHARACTERS}
    } else {
        const updatedProductType = require('../models/DAO/productType.js')

        const result = updateProductTyped.updateProductType(type)

        if(result) {
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

const deleteProductType = async(id) => {
    if(id != '' || id != undefined) {
        const deletedProductType = require('../models/DAO/productType.js')

        const result = deletedProductType.deleteProductType(id)

        if(result) {
            return {status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM}
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    } else {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }
}

const listAllProductTypes = async () => {
    let typesJson = {}

    const { selectAllProductTypes } = require('../models/DAO/productType.js')

    const productsTypesData = await selectAllProductTypes()

    if(productsTypesData) {
        typesJson.types = productsTypesData
        return typesJson
    } else {
        return false
    }
}

module.exports = {
    newProductType,
    updateProductType,
    deleteProductType,
    listAllProductTypes
}