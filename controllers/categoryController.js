/*
    Objetivo:     Arquivo responsável pela manipulação dos dados das categorias dos produtos com o Banco de Dados (insert, update, delete e select)
    Autores:      Vinícius Santos Oliveira e Arthur Piloto Silva
    Data Criação: 23/11/2022
    Versão:       1.0
*/

// Arquivo de mensagens padronizadas
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../module/config.js')

// Função que gera novo produto no BD
const newCategory = async (category) => {
    if(category.nome == '' || category.nome == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    } else if(category.nome.length > 15) {
        return {status: 400, message: MESSAGE_ERROR.EXCEEDED_CHARACTERS}
    } else {
        
        // Import da Model de Categoria
        const newCategory = require('../models/DAO/category.js')

        const resultNewCategory = newCategory.insertCategory(category)

        if(resultNewCategory) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM}
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

// Função que atualiza produto no BD
const updateCategory = async (category) => {

}

// Função que delete produto do BD
const deleteCategory = async (id) => {

}

// Função que lista todos os produtos do BD
const listAllCategories = async () => {
    
}

module.exports = {
    newCategory,
    listAllCategories
}