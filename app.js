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
const productTypeController = require('./controllers/productTypeController.js')
const categoryController = require('./controllers/categoryController.js')
const userController = require('./controllers/userController.js')
const ingredientController = require('./controllers/ingredientController.js')
const messageController = require('./controllers/messageController.js')
const messageTypeController = require('./controllers/messageTypeController.js')
const promotionController = require('./controllers/promotionController.js')
const { response } = require('express')

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

app.get('/v1/products/category/:productCategory', cors(), async(request, response) => {
    let statusCode
    let message
    let productCategory = request.params.productCategory

    if(productCategory != '' && productCategory != undefined) {
        const productsByCategory = await productController.listProductsByCategory(productCategory)

        statusCode = productsByCategory.status
        message = productsByCategory.message
    } else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_FIELDS
    }

    response.status(statusCode)
    response.json(message)
})


/* ENDPOINTS PARA OS PRODUTOS */ 

/*******************************************************/

/* ENDPOINTS PARA OS TIPOS DE PRODUTOS */

app.post('/v1/product-type', cors(), jsonParser, async (request, response) => {
    let statusCode
    let message
    let headerContentType

    headerContentType = request.headers['content-type'] // Nos traz o formato de dados da requisição

    // Validar se o ContentType é do tipo application/json
    if(headerContentType == 'application/json') {
        let bodyData = request.body
        
        // Realiza processo de conversão de dados para conseguir identificar um JSON vazio
        if(JSON.stringify(bodyData) != '{}') {

            const newProductType = await productTypeController.newProductType(bodyData)

            statusCode = newProductType.status
            message = newProductType.message
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

app.get('/v1/product-types', cors(), async (request, response) => {
    let statusCode
    let message

    // Retorna todos os produtos existentes no banco de dados
    const typesData = await productTypeController.listAllProductTypes()

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

app.put('/v1/product-type/:typeId', cors(), jsonParser, async (request, response) => {
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

                const updatedProductType = await productTypeController.updateProductType(bodyData)

                statusCode = updatedProductType.status
                message = updatedProductType.message
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

app.delete('/v1/product-type/:typeId', cors(), jsonParser, async (request, response) => {
    let statusCode
    let message
    
    let id = request.params.typeId

    if(id != '' || id != undefined) {
        const deletedProductype = await productTypeController.deleteProductType(id)

        statusCode = deletedProductype.status
        message = deletedProductype.message
    } else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    response.status(statusCode)
    response.json(message)
})

app.get('/v1/product-type/:productTypeName', cors(), async(request, response) => {
    let statusCode
    let message
    let productTypeName = request.params.productTypeName

    if(productTypeName != '' && productTypeName != undefined) {
        const productTypeId = await productTypeController.selectProductTypeId(productTypeName)

        if(productTypeId) {
            statusCode = 200
            message = productTypeId
        } else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }

    } else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_FIELDS
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

app.get('/v1/category/:categoryName', cors(), async(request, response) => {
    let statusCode
    let message
    let categoryName = request.params.categoryName

    if(categoryName != '' && categoryName != undefined) {
        const categoryId = await categoryController.selectCategoryId(categoryName)

        if(categoryId) {
            statusCode = 200
            message = categoryId
        } else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }

    } else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_FIELDS
    }

    response.status(statusCode)
    response.json(message)
})

/* ENDPOINTS PARA AS CATEGORIAS DE PRODUTOS */

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

/*******************************************************/

/* ENDPOINTS PARA OS INGREDIENTES */

app.post('/v1/ingredient', cors(), jsonParser, async(request, response) => {
    let statusCode
    let message
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json') {
        let bodyData = request.body

        if(JSON.stringify(bodyData) != '{}') {
            const newIngredient = await ingredientController.newIngredient(bodyData)

            statusCode = newIngredient.status
            message = newIngredient.message
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

app.get('/v1/ingredients', cors(), jsonParser, async(request, response) => {
    let statusCode
    let message

    const ingredientsData = await ingredientController.listAllIngredients()

    if(ingredientsData) {
        statusCode = 200
        message = ingredientsData
    } else {
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    response.status(statusCode)
    response.json(message)
})

app.put('/v1/ingredient/:ingredientId', cors(), jsonParser, async(request, response) => {
    let statusCode
    let message
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json') {
        let bodyData = request.body

        if(JSON.stringify(bodyData) != '{}') {
            let id = request.params.ingredientId

            if(id != '' && id != undefined) {
                bodyData.id = id

                const updatedIngredient = await ingredientController.updateIngredient(bodyData)

                statusCode = updatedIngredient.status
                message = updatedIngredient.message
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

// EndPoint para fazer o "delete" do ingrediente
app.put('/v1/ingredient/delete/:ingredientId', cors(), jsonParser, async(request, response) => {
    let statusCode
    let message
    let id = request.params.ingredientId

    if(id != '' && id != undefined) {
        const deletedIngredient = await ingredientController.turnOffIngredient(id)

        statusCode = deletedIngredient.status
        message = deletedIngredient.message
    } else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    response.status(statusCode)
    response.json(message)
})

app.put('/v1/ingredient/rehabilitate/:ingredientId', cors(), jsonParser, async(request, response) => {
    let statusCode
    let message
    let id = request.params.ingredientId

    if(id != '' && id != undefined) {
        const rehabilitatedIngredient = await ingredientController.turnOnIngredient(id)

        statusCode = rehabilitatedIngredient.status
        message = rehabilitatedIngredient.message
    } else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    response.status(statusCode)
    response.json(message)
})

/* ENDPOINTS PARA OS INGREDIENTES */

/*******************************************************/

/* ENDPOINTS PARA AS MENSAGENS */

app.post('/v1/message', cors(), jsonParser, async(request, response) => {
    let statusCode
    let message
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json') {
        let bodyData = request.body

        if(JSON.stringify(bodyData) != '{}') {
            const newMessage = await messageController.newMessage(bodyData)

            statusCode = newMessage.status
            message = newMessage.message
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

app.get('/v1/messages', cors(), async(request, response) => {
    let statusCode
    let message

    const messagesData = await messageController.listAllMessages()

    if(messagesData) {
        statusCode = 200
        message = messagesData
    } else {
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    response.status(statusCode)
    response.json(message)
})

/* ENDPOINTS PARA AS MENSAGENS */

/*******************************************************/

/* ENDPOINTS PARA OS TIPOS DE MENSAGENS */

app.post('/v1/message-type', cors(), jsonParser, async(request, response) => {
    let statusCode
    let message
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json') {
        let bodyData = request.body

        if(JSON.stringify(bodyData) != '{}') {
            const newMessageType = await messageTypeController.newMessageType(bodyData)

            statusCode = newMessageType.status
            message = newMessageType.message
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

app.get('/v1/message-types', cors(), async(request, response) => {
    let statusCode
    let message

    const messageTypesData = await messageTypeController.listAllMessageType()

    if(messageTypesData) {
        statusCode = 200
        message = messageTypesData
    } else {
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    response.status(statusCode)
    response.json(message)
})

app.put('/v1/message-type/:messageTypeId', cors(), jsonParser, async(request, response) => {
    let statusCode
    let message
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json') {
        let bodyData = request.body

        if(JSON.stringify(bodyData) != '{}') {
            let id = request.params.messageTypeId

            if(id != '' && id != undefined) {
                bodyData.id = id

                const updatedMessageType = await messageTypeController.updateMessageType(bodyData)

                statusCode = updatedMessageType.status
                message = updatedMessageType.message
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

app.delete('/v1/message-type/:messageTypeId', cors(), jsonParser, async(request, response) => {
    let statusCode
    let message
    let id = request.params.messageTypeId

    if(id != '' && id != undefined) {
        const deletedMessageType = await messageTypeController.deleteMessageType(id)

        statusCode = deletedMessageType.status
        message = deletedMessageType.message
    } else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    response.status(statusCode)
    response.json(message)
})

/* ENDPOINTS PARA AS TIPOS DE MENSAGENS */

/*******************************************************/

/* ENDPOINTS PARA AS PROMOÇÕES */

app.post('/v1/promotion', cors(), jsonParser, async(request, response) => {
    let statusCode
    let message
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json') {
        let bodyData = request.body

        if(JSON.stringify(bodyData) != '{}') {
            const newPromotion = await promotionController.newPromotion(bodyData)

            statusCode = newPromotion.status
            message = newPromotion.message
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

app.get('/v1/promotions', cors(), async(request, response) => {
    let statusCode
    let message

    const promotionsData = await promotionController.listAllPromotions()

    if(promotionsData) {
        statusCode = 200
        message = promotionsData
    } else {
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    response.status(statusCode)
    response.json(message)
})

app.put('/v1/promotion/:promotionId', cors(), jsonParser, async(request, response) => {
    let statusCode
    let message
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json') {
        let bodyData = request.body

        if(JSON.stringify(bodyData) != '{}') {
            let id = request.params.promotionId

            if(id != '' && id != undefined) {
                bodyData.id = id

                const updatedPromotion = await promotionController.updatePromotion(bodyData)

                statusCode = updatedPromotion.status
                message = updatedPromotion.message
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

app.delete('/v1/promotion/:promotionId', cors(), jsonParser, async(request, response) => {
    let statusCode
    let message

    let id = request.params.promotionId

    if(id != '' && id != undefined) {
        const deletedPromotion = await promotionController.deletePromotion(id)

        statusCode = deletedPromotion.status
        message = deletedPromotion.message
    } else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    response.status(statusCode)
    response.json(message)
})

/* ENDPOINTS PARA AS PROMOÇÕES */

app.listen(3030, () => {
    console.log('Server waiting for requests...');
})