/*
    Objetivo:     Arquivo responsável pela manipulação dos dados dos ingredientes com o Banco de Dados (insert, update, delete e select)
    Autores:      Vinícius Santos Oliveira e Arthur Piloto Silva
    Data Criação: 01/12/2022
    Versão:       1.0
*/

// Arquivo de mensagens padronizadas
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../module/config.js')

// Função que gera novo produto no BD
const newIngredient = async (ingredient) => {
    if(ingredient.nome == '' || ingredient.nome == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    } else if(ingredient.nome.length > 20) {
        return {status: 400, message: MESSAGE_ERROR.EXCEEDED_CHARACTERS}
    } else {
        const newIngredient = require('../models/DAO/ingredient.js')

        const resultNewIngredient = await newIngredient.insertIngredient(ingredient)

        if(resultNewIngredient) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM}
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

// Função que atualiza produto no BD
const updateIngredient = async (ingredient) => {
    if(ingredient.id == '' || ingredient.id == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    } else if(ingredient.nome == ''|| ingredient.nome == undefined || ingredient.status_ingrediente == '' || ingredient.status_ingrediente == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    } else if(ingredient.nome.length > 20) {
        return {status: 400, message: MESSAGE_ERROR.EXCEEDED_CHARACTERS}
    } else {
        const updatedIngredient = require('../models/DAO/ingredient.js')

        const result = await updatedIngredient.updateIngredient(ingredient)

        if(result) {
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

// Função que delete produto do BD
const turnOffIngredient = async (id) => {
    if(id != '' || id != undefined) {
        const deletedIngredient = require('../models/DAO/ingredient.js')

        const result = await deletedIngredient.turnOffIngredient(id)

        if(result) {
            return {status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM}
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    } else {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }
}

const turnOnIngredient = async (id) => {
    if(id != '' || id != undefined) {
        const rehabilitatedIngredient = require('../models/DAO/ingredient.js')

        const result = await rehabilitatedIngredient.turnOnIngredient(id)

        if(result) {
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    } else {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }
}

// Função que lista todos os produtos do BD
const listAllIngredients = async () => {
    let ingredientsJson = {}

    const { selectAllIngredients } = require('../models/DAO/ingredient.js')

    const ingredientsData = await selectAllIngredients()

    if(ingredientsData) {
        ingredientsJson.ingredients = ingredientsData
        return ingredientsJson
    } else {
        return false
    }
}

module.exports = {
    newIngredient,
    updateIngredient,
    turnOffIngredient,
    turnOnIngredient,
    listAllIngredients
}