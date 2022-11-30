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
const userController = require('./controllers/userController.js')

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

app.put('/v1/product/:productId', cors(), jsonParser, async (request, response) => {
    let statusCode
    let message
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json') {
        let bodyData = request.body

        if(JSON.stringify(bodyData) != '{}') {
            let id = request.params.productId

            if(id != '' && id != undefined) {
                bodyData.id = id

                const updatedProduct = await productController.updateProduct(bodyData)

                statusCode = updatedProduct.status
                message = updatedProduct.message
            } else {
                statusCode = 400
                message = MESSAGE_ERROR.REQUIRED_ID
            }
            
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

app.delete('/v1/product/:productId', cors(), jsonParser, async (request, response) => {
    let statusCode
    let message

    let id = request.params.productId

    if(id != '' && id != undefined) {
        const deletedProduct = await productController.deleteProduct(id)

        statusCode = deletedProduct.status
        message = deletedProduct.message
    } else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
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

app.get('/v1/types', cors(), async (request, response) => {
    let statusCode
    let message

    // Retorna todos os produtos existentes no banco de dados
    const typesData = await typeController.listAllTypes()

    if(typesData) {
        statusCode = 200
        message = typesData
    } else {
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    response.status(statusCode)
    response.json(message)
})

app.put('v1/type/:typeId', cors(), jsonParser, async (request, response) => {
    let statusCode
    let message
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json') {

        let bodyData = request.body

        if(JSON.stringify(bodyData) != '{}') {
            let id = request.params.typeId

            if(id != '' || id != undefined) {
                bodyData.id = id

                const updatedType = await typeController.updateType(bodyData)

                statusCode = updatedType.status
                message = updatedType.message
            } else {
                statusCode = 400
                message = MESSAGE_ERROR.REQUIRED_ID
            }
            
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

app.delete('v1/type/:typeId', cors(), jsonParser, async (request, response) => {
    let statusCode
    let message
    
    let id = request.params.typeId

    if(id != '' || id != undefined) {
        const deletedType = await typeController.deleteType(id)

        statusCode = deletedType.status
        message = deletedType.message
    } else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    response.status(statusCode)
    response.json(message)
})

/* ENDPOINTS PARA OS TIPOS DE PRODUTOS */

/*******************************************************/

/* ENDPOINTS PARA AS CATEGORIAS DE PRODUTOS */

app.post('/v1/category', cors(), jsonParser, async(request, response) => {
    let statusCode
    let message
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json') {
        let bodyData = request.body

        if(JSON.stringify(bodyData) != '{}') {
            const newCategory = await categoryController.newCategory(bodyData)

            statusCode = newCategory.status
            message = newCategory.message
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

app.get('/v1/categories', cors(), async(request, response) => {
    let statusCode
    let message

    const categoriesData = await categoryController.listAllCategories()

    if(categoriesData) {
        statusCode = 200
        message = categoriesData
    } else {
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    response.status(statusCode)
    response.json(message)
})

app.put('/v1/category/:categoryId', cors(), jsonParser, async(request, response) => {
    let statusCode
    let message
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json') {
        let bodyData = request.body

        if(JSON.stringify(bodyData) != '{}') {
            let id = request.params.categoryId

            if(id != '' && id != undefined) {
                bodyData.id = id

                const updatedCategory = await categoryController.updateCategory(bodyData)

                statusCode = updatedCategory.status
                message = updatedCategory.message
            } else {
                statusCode = 400
                message = MESSAGE_ERROR.REQUIRED_ID
            }
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

app.delete('/v1/category/:categoryId', cors(), jsonParser, async(request, response) => {
    let statusCode
    let message

    let id = request.params.categoryId

    if(id != '' && id != undefined) {
        const deletedCategory = await categoryController.deleteCategory(id)

        statusCode = deletedCategory.status
        message = deletedCategory.message
    } else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    response.status(statusCode)
    response.json(message)
})

/*******************************************************/

/* ENDPOINTS PARA OS USUÁRIOS */

app.post('/v1/user', cors(), jsonParser, async(request, response) => {
    let statusCode
    let message
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json') {
        let bodyData = request.body

        if(JSON.stringify(bodyData) != '{}') {
            const resultNewUser = await userController.newUser(bodyData)

            statusCode = resultNewUser.status
            message = resultNewUser.message
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

app.get('/v1/users', cors(), async (request, response) => {
    let statusCode
    let message

    const usersData = await userController.listAllUsers()

    if(usersData) {
        statusCode = 200
        message = usersData
    } else {
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    response.status(statusCode)
    response.json(message)
})

app.put('/v1/user/:userId', cors(), jsonParser, async(request, response) => {
    let statusCode
    let message
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json') {
        let bodyData = request.body

        if(JSON.stringify(bodyData) != '{}') {
            let id = request.params.userId

            if(id != '' && id != undefined) {
                bodyData.id = id

                const updatedUser = await userController.updateUser(bodyData)

                statusCode = updatedUser.status
                message = updatedUser.message
            } else {
                statusCode = 400
                message = MESSAGE_ERROR.REQUIRED_ID
            }
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

app.delete('/v1/user/:userId', cors(), jsonParser, async(request, response) => {
    let statusCode
    let message

    let id = request.params.userId

    if(id != '' && id != undefined) {
        const deletedUser = await userController.deleteUser(id)

        statusCode = deletedUser.status
        message = deletedUser.message
    } else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    response.status(statusCode)
    response.json(message)
})

/* ENDPOINTS PARA OS USUÁRIOS */
app.listen(3030, () => {
    console.log('Server waiting for requests...');
})