/*
    Objetivo:     Arquivo responsável pela manipulação dos dados das categorias dos produtos com o Banco de Dados (insert, update, delete e select)
    Autores:      Vinícius Santos Oliveira e Arthur Piloto Silva
    Data Criação: 23/11/2022
    Versão:       1.0
*/

// Arquivo de mensagens padronizadas
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../module/config.js')

// Função que gera nova categoria no BD
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

// Função que atualiza categoria no BD
const updateCategory = async (category) => {
    if(category.id == '' || category.id == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    } else if(category.nome == '' || category.nome == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    } else if(category.nome.length > 15) {
        return {status: 400, message: MESSAGE_ERROR.EXCEEDED_CHARACTERS}
    } else {
        const updatedType = require('../models/DAO/category.js')

        const result = updatedType.updateCategory(category)

        if(result) {
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

// Função que deleta categoria do BD
const deleteCategory = async (id) => {
    if (id != '' && id != undefined) {
        const deletedCategory = require('../models/DAO/category.js')

        const result = deletedCategory.deleteCategory(id)

        if(result) {
            return {status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM}
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    } else {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }
}

// Função que lista todas as categorias do BD
const listAllCategories = async () => {
    let categoriesJson = {}

    const { selectAllCategories } = require('../models/DAO/category.js')

    const categoriesData = await selectAllCategories()

    if(categoriesData) {
        categoriesJson.categories = categoriesData
        return categoriesJson
    } else {
        return false
    }
}

// Função que retorna o ID da categoria de acordo com o nome
const selectCategoryId = async (categoryName) => {
    if(categoryName != '' && categoryName != undefined) {
        let idJson = {}
    
        const { selectCategoryId } = require('../models/DAO/category.js')
    
        const id = await selectCategoryId(categoryName)
    
        if(id) {
            idJson.id = id
            return id
        } else {
            return false
        }
    }
}

module.exports = {
    newCategory,
    updateCategory,
    deleteCategory,
    listAllCategories,
    selectCategoryId
}