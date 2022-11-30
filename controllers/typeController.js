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

}

const deleteType = async(id) => {

}

const listAllTypes = async () => {
    
}

module.exports = {
    newType,
    listAllTypes
}