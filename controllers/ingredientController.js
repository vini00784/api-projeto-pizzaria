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
    
}

// Função que delete produto do BD
const deleteIngredient = async (id) => {
    
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
    deleteIngredient,
    listAllIngredients
}