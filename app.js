/*
    Objetivo:     API responsável pela manipulação dos dados do Back-End (GET, POST, PUT, DELETE)
    Autores:      Vinícius Santos Oliveira e Arthur Piloto Silva
    Data Criação: 23/11/2022
    Versão:       1.0
*/

// Import das bibliotecas
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Arquivo de mensagens padronizadas
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('./module/config.js')

// Import das Controllers
const productController = require('./controllers/productController.js')
const typeController = require('./controllers/typeController.js')
const categoryController = require('./controllers/categoryController.js')

const app = express()

// Configuração do cors para liberar o acesso à API
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methos', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})

// Criando um objeto que permite receber um JSON no body das requisições
const jsonParser = bodyParser.json()

/* 
    Rotas para CRUD de produtos
    Data: 23/11/2022
*/

/* ENDPOINTS PARA OS PRODUTOS */

app.post('/v1/product', cors(), jsonParser, async (request, response) => {
    let statusCode
    let message
    let headerContentType

    headerContentType = request.headers['content-type'] // Nos traz o formato de dados da requisição

    // Validar se o ContentType é do tipo application/json
    if(headerContentType == 'application/json') {
        let bodyData = request.body

        // Realiza processo de conversão de dados para conseguir identificar um JSON vazio
        if(JSON.stringify(bodyData) != '{}') {

            const newProduct = await productController.newProduct(bodyData)

            statusCode = newProduct.status
            message = newProduct.message

        } else {
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } else {
        statusCode = 415
        message = MESSAGE_ERROR.INCORRECT_CONTENT_TYPE
    }

    response.status(statusCode)
    response.json(message)
})

app.get('/v1/products', cors(), async (request, response) => {
    let statusCode
    let message

    // Retorna todos os produtos existentes no banco de dados
    const productsData = await productController.listAllProducts()

    if(productsData) {
        statusCode = 200
        message = productsData
    } else {
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    response.status(statusCode)
    response.json(message)
})


/* ENDPOINTS PARA OS PRODUTOS */ 

/*******************************************************/

/* ENDPOINTS PARA OS TIPOS DE PRODUTOS */

app.post('/v1/type', cors(), jsonParser, async (request, response) => {
    let statusCode
    let message
    let headerContentType

    headerContentType = request.headers['content-type'] // Nos traz o formato de dados da requisição

    // Validar se o ContentType é do tipo application/json
    if(headerContentType == 'application/json') {
        let bodyData = request.body
        
        // Realiza processo de conversão de dados para conseguir identificar um JSON vazio
        if(JSON.stringify(bodyData) != '{}') {

            const newType = await typeController.newType(bodyData)

            statusCode = newType.status
            message = newType.message
        } else {
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } else {
        statusCode = 415
        message = MESSAGE_ERROR.INCORRECT_CONTENT_TYPE
    }

    response.status(statusCode)
    response.json(message)
})

app.listen(3030, () => {
    console.log('Server waiting for requests...');
})