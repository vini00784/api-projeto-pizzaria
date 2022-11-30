/*
    Objetivo:     API responsável pela manipulação dos dados das categorias dos produtos com o Banco de Dados (INSERT, UPDATE, SELECT, DELETE)
    Autores:      Vinícius Santos Oliveira e Arthur Piloto Silva
    Data Criação: 23/11/2022
    Versão:       1.0
*/

// Import da classe PrismaClient, que é responsável pelas interações com o Banco de Dados
const { PrismaClient } = require('@prisma/client')

// Instância da classe PrismaClient
const prisma = new PrismaClient()

// Função para inserção de uma nova categoria
const insertCategory = async (category) => {
    
}

// Função para atualização de uma categoria
const updateCategory = async (category) => {

}

// Função para exclusão de uma categoria
const deleteCategory = async (id) => {

}

// Função para retornar todas as categorias
const selectAllCategories = async () => {
    
}

module.exports = {
    insertCategory,
    selectAllCategories
}