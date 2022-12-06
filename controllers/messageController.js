/*
    Objetivo:     Arquivo responsável pela manipulação dos dados das mensagens com o Banco de Dados (insert, update, delete e select)
    Autores:      Vinícius Santos Oliveira e Arthur Piloto Silva
    Data Criação: 23/11/2022
    Versão:       1.0
*/

// Arquivo de mensagens padronizadas
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../module/config.js')

// Função que gera nova mensagem no BD
const newMessage = async (product) => {

}

// Função que atualiza mensagem no BD
const updateMessage = async (product) => {
    
}

// Função que delete mensagem do BD
const deleteMessage = async (id) => {
    
}

// Função que lista todas as mensagens do BD
const listAllMessages = async () => {
    
}

module.exports = {
    newMessage,
    updateMessage,
    deleteMessage,
    listAllMessages
}