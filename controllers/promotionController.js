/*
    Objetivo:     Arquivo responsável pela manipulação dos dados das promoções com o Banco de Dados (insert, update, delete e select)
    Autores:      Vinícius Santos Oliveira e Arthur Piloto Silva
    Data Criação: 06/12/2022
    Versão:       1.0
*/

const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require("../module/config")

const newPromotion = async (promotion) => {
    if(promotion.nome == '' || promotion.nome == undefined || promotion.porcentagem_desconto == '' || promotion.porcentagem_desconto == undefined || promotion.preco_final == '' || promotion.preco_final == undefined || promotion.data_inicio == '' || promotion.data_inicio == undefined || promotion.data_termino == '' || promotion.data_termino == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    } else if(promotion.nome.length > 60) {
        return {status: 400, message: MESSAGE_ERROR.EXCEEDED_CHARACTERS}
    }
}

const updatedPromotion = async (promotion) => {
    
}

const deletePromotion = async (id) => {
    
}

const listAllPromotions = async () => {
    
}

module.exports = {
    newPromotion,
    updatedPromotion,
    deletePromotion,
    listAllPromotions
}