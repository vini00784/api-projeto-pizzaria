/*
    Objetivo:     Arquivo responsável pela manipulação dos dados dos usuários com o Banco de Dados (insert, update, delete e select)
    Autores:      Vinícius Santos Oliveira e Arthur Piloto Silva
    Data Criação: 23/11/2022
    Versão:       1.0
*/

// Arquivo de mensagens padronizadas
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../module/config.js')

// Função que gera novo usuário no BD
const newUser = async (user) => {

}

// Função que atualiza usuário no BD
const updateUser = async (user) => {
    
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
    
}

module.exports = {
    newUser,
    updateUser,
    deleteUser,
    listAllUsers
}