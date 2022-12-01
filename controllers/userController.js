/*
    Objetivo:     Arquivo responsável pela manipulação dos dados dos usuários com o Banco de Dados (insert, update, delete e select)
    Autores:      Vinícius Santos Oliveira e Arthur Piloto Silva
    Data Criação: 30/11/2022
    Versão:       1.0
*/

// Arquivo de mensagens padronizadas
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../module/config.js')

// Função que gera novo usuário no BD
const newUser = async (user) => {
    if(user.nome == '' || user.nome == undefined || user.email == '' || user.email == undefined || user.senha == '' || user.senha == undefined || user.cpf == '' || user.cpf == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    } else if(!user.email.includes('@')) {
        return {status: 400, message: MESSAGE_ERROR.INVALID_EMAIL}
    } else if(user.nome.length > 80 || user.email.length > 256 || user.senha.length > 25 || user.cpf.length > 18) {
        return {status: 400, message: MESSAGE_ERROR.EXCEEDED_CHARACTERS}
    } else {
        const newUser = require('../models/DAO/user.js')

        const resultNewUser = await newUser.insertUser(user)

        if(resultNewUser) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM}
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

// Função que atualiza usuário no BD
const updateUser = async (user) => {
    if(user.id == '' && user.id == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    } else if(user.nome == '' || user.nome == undefined || user.email == '' || user.email == undefined || user.senha == '' || user.senha == undefined || user.celular == '' || user.celular == undefined || user.rg == '' || user.rg == undefined || user.cpf == '' || user.cpf == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    } else if(user.nome.length > 80 || user.email.length > 256 || user.senha.length > 25 || user.celular.length > 20 || user.rg.length > 20 || user.cpf.length > 18) {
        return {status: 400, message: MESSAGE_ERROR.EXCEEDED_CHARACTERS}
    } else {
        const updatedUser = require('../models/DAO/user.js')

        const result = updatedUser.updateUser(user)

        if(result) {
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

// Função que deleta usuário do BD
const deleteUser = async (id) => {
    if(id != '' && id != undefined) {
        const deletedUser = require('../models/DAO/user.js')

        const result = deletedUser.deleteUser(id)

        if(result) {
            return {status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM}
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    } else {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }
}

// Função que lista todos os usuários do BD
const listAllUsers = async () => {
    let usersJson = {}

    const { selectAllUsers } = require('../models/DAO/user.js')

    const usersData = await selectAllUsers()

    if(usersData) {
        usersJson.users = usersData
        return usersJson
    } else {
        return false
    }
}

module.exports = {
    newUser,
    updateUser,
    deleteUser,
    listAllUsers
}