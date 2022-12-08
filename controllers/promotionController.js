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
    } else {
        const newPromotion = require('../models/DAO/promotion.js')

        const resultNewPromotion = newPromotion.insertNewPromotion(promotion)

        if(resultNewPromotion) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM}
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

const updatedPromotion = async (promotion) => {
    if(promotion.id == '' || promotion.id == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    } else if(promotion.nome == '' || promotion.nome == undefined || promotion.porcentagem_desconto == '' || promotion.porcentagem_desconto == undefined || promotion.preco_final == '' || promotion.preco_final == undefined || promotion.data_inicio == '' || promotion.data_inicio == undefined || promotion.data_termino == '' || promotion.data_termino == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    } else if(promotion.nome.length > 60) {
        return {status: 400, message: MESSAGE_ERROR.EXCEEDED_CHARACTERS}
    } else {
        const updatedPromotion = require('../models/DAO/promotion.js')

        const result = await updatedPromotion.updatePromotion(promotion)

        if(result) {
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

const deletePromotion = async (id) => {
    
}

const listAllPromotions = async () => {
    let promotionsJson = {}

    const { selectAllPromotions } = require('../models/DAO/promotion.js')

    const promotionsData = await selectAllPromotions()

    if(promotionsData) {
        promotionsJson.promotions = promotionsData
        return promotionsJson
    } else {
        return false
    }
}

module.exports = {
    newPromotion,
    updatedPromotion,
    deletePromotion,
    listAllPromotions
}