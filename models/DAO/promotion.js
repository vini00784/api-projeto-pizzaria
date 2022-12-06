/*
    Objetivo:     API responsável pela manipulação dos dados das promoções com o Banco de Dados (INSERT, UPDATE, SELECT, DELETE)
    Autores:      Vinícius Santos Oliveira e Arthur Piloto Silva
    Data Criação: 06/12/2022
    Versão:       1.0
*/

// Import da classe PrismaClient, que é responsável pelas interações com o Banco de Dados
const { PrismaClient } = require('@prisma/client')

// Instância da classe PrismaClient
const prisma = new PrismaClient()

// Função para inserção de um novo tipo de mensagem
const insertNewPromotion = async (promotion) => {
    
}

// Função para atualização de um tipo de mensagem
const updatePromotion = async (promotion) => {
    
}

// Função para exclusão de um tipo de mensagem
const deletePromotion = async (id) => {
    
}

// Função para retornar todos os tipos de mensagem
const selectAllPromotions = async () => {
    
}

module.exports = {
    insertNewPromotion,
    updatePromotion,
    deletePromotion,
    selectAllPromotions
}