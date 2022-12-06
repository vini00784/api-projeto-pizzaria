/*
    Objetivo:     API responsável pela manipulação dos dados dos tipos de mensagem com o Banco de Dados (INSERT, UPDATE, SELECT, DELETE)
    Autores:      Vinícius Santos Oliveira e Arthur Piloto Silva
    Data Criação: 23/11/2022
    Versão:       1.0
*/

// Import da classe PrismaClient, que é responsável pelas interações com o Banco de Dados
const { PrismaClient } = require('@prisma/client')

// Instância da classe PrismaClient
const prisma = new PrismaClient()

// Função para inserção de um novo tipo de mensagem
const insertNewMessageType = async (type) => {
    
}

// Função para atualização de um tipo de mensagem
const updatedNewMessageType = async (type) => {
    
}

// Função para exclusão de um tipo de mensagem
const deleteMessageType = async (id) => {
    
}

// Função para retornar todos os tipos de mensagem
const selectAllMessageTypes = async () => {
    
}

module.exports = {
    insertNewMessageType,
    updatedNewMessageType,
    deleteMessageType,
    selectAllMessageTypes
}