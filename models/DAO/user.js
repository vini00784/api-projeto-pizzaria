/*
    Objetivo:     API responsável pela manipulação dos dados dos usuários com o Banco de Dados (INSERT, UPDATE, SELECT, DELETE)
    Autores:      Vinícius Santos Oliveira e Arthur Piloto Silva
    Data Criação: 23/11/2022
    Versão:       1.0
*/

// Import da classe PrismaClient, que é responsável pelas interações com o Banco de Dados
const { PrismaClient } = require('@prisma/client')

// Instância da classe PrismaClient
const prisma = new PrismaClient()

// Função para inserção de um novo usuário
const insertUser = async (user) => {

}

// Função para atualização de um usuário
const updateUser = async (user) => {
    
}

// Função para exclusão de um usuário
const deleteUser = async (id) => {
    
}

// Função para retornar todos os usuários
const selectAllUsers = async () => {
    
}

module.exports = {
    insertUser,
    updateUser,
    deleteUser,
    selectAllUsers
}