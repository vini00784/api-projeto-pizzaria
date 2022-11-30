/*
    Objetivo:     Arquivo responsável pela manipulação dos dados dos alunos com o Banco de Dados (insert, update, delete e select)
    Autores:      Vinícius Santos Oliveira e Arthur Piloto Silva
    Data Criação: 23/11/2022
    Versão:       1.0
*/

// Arquivo de mensagens padronizadas
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../module/config.js')

// Função que gera novo produto no BD
const newProduct = async (product) => {

    // Validação dos campos obrigatórios
    if(product.nome == '' || product.nome == undefined || product.preco == '' || product.preco == undefined || product.foto == '' || product.foto == undefined || product.id_tipo_produto == '' || product.id_tipo_produto == undefined || product.id_categoria == '' || product.id_categoria == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    } else if(product.nome.length > 50 || product.foto.length > 200) {
        return {status: 400, message: MESSAGE_ERROR.EXCEEDED_CHARACTERS}
    } else {

        // Import da model do produto
        const newProduct = require('../models/DAO/product')

        // Chama a função para inserir um novo produto
        const resultNewProduct = await newProduct.insertProduct(product)
        
        if(resultNewProduct) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM}
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
    
}

// Função que atualiza produto no BD
const updateProduct = async () => {

}

// Função que delete produto do BD
const deleteProduct = async () => {

}

// Função que lista todos os produtos do BD
const listAllProducts = async () => {
    
}

// Função que lista os produtos do BD com base na categoria
const listProductsByCategory = async () => {

}

// Função que lista os produtos do BD com base no tipo
const listProductsByType = async () => {

}

// Função que lista os produtos do BD com base no nome
const listProductByName = async () => {

}

module.exports = {
    newProduct,
    listAllProducts
}