/*
    Objetivo:     Arquivo responsável pela manipulação dos dados dos produtos com o Banco de Dados (insert, update, delete e select)
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
        const newProduct = require('../models/DAO/product.js')

        // Import da model do ingrediente_produto
        const newProductIngredient = require('../models/DAO/productIngredient.js')

        // Import da model de promocao_produto
        const newProductPromotion = require('../models/DAO/productPromotion.js')

        // Chama a função para inserir um novo produto
        const resultNewProduct = await newProduct.insertProduct(product)
        
        if(resultNewProduct) {
            let newProductId = await newProduct.selectLastId()

            if(newProductId > 0) {
                let productIngredient = {}

                productIngredient.id_produto = newProductId

                let arrayLength = product.ingrediente.length
                let resultNewProductIngredient
                for (let index = 0; index < arrayLength; index++) {
                    productIngredient.id_ingrediente = product.ingrediente[index].id_ingrediente
                    resultNewProductIngredient = await newProductIngredient.insertProductIngredient(productIngredient)
                }
                if (resultNewProductIngredient) {
                    let productPromotion = {}

                    productPromotion.id_produto = newProductId
                    productPromotion.id_promocao = product.promocao[0].id_promocao

                    if(productPromotion.id_promocao != 0) {
                        const resultNewProductPromotion = await newProductPromotion.insertProductPromotion(productPromotion)
    
                        if(resultNewProductPromotion) {
                            return {status:201, message: MESSAGE_SUCCESS.INSERT_ITEM}
                        } else {
                            await deleteProduct(newProductId)
                            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
                        }
                    }

                    return {status:201, message: MESSAGE_SUCCESS.INSERT_ITEM}
                } else {
                    await deleteProduct(newProductId)
                    return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
                }
                
            } else {
                await deleteProduct(newProductId)
                return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM}
            }
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }

}

// Função que atualiza produto no BD
const updateProduct = async (product) => {
    if(product.id == '' || product.id == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    } else if(product.nome == '' || product.nome == undefined || product.preco == '' || product.preco == undefined || product.foto == '' || product.foto == undefined || product.id_tipo_produto == '' || product.id_tipo_produto == undefined || product.id_categoria == '' || product.id_categoria == undefined || product.qtde_favorito == '' || product.qtde_favorito == undefined ) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    } else if(product.nome.length > 50 || product.foto.length > 200) {
        return {status: 400, message: MESSAGE_ERROR.EXCEEDED_CHARACTERS}
    } else {
        const updatedProduct = require('../models/DAO/product.js')

        const result = await updatedProduct.updateProduct(product)

        if(result) {
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

// Função que delete produto do BD
const deleteProduct = async (id) => {
    if(id != '' && id != undefined) {
        const deletedProduct = require('../models/DAO/product.js')

        const result = await deletedProduct.deleteProduct(id)

        if(result) {
            return {status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM}
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    } else {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }
}

// Função que lista todos os produtos do BD
const listAllProducts = async () => {
    let productsJson = {}

    // Import das models
    const { selectAllProducts } = require('../models/DAO/product.js')
    const { selectProductIngredient } = require('../models/DAO/productIngredient.js')
    const { selectProductPromotion } = require('../models/DAO/productPromotion.js')

    const productsData = await selectAllProducts()

    if(productsData) {
        const productIngredientArray = productsData.map(async productItem => {

            const productIngredientData = await selectProductIngredient(productItem.id_produto)
            const productPromotionData = await selectProductPromotion(productItem.id_produto)

            if(productIngredientData) {
                productItem.ingrediente = productIngredientData

                if(productPromotionData) {
                    productItem.promocao = productPromotionData
                }
            }

            return productItem
        })

        productsJson.products = await Promise.all(productIngredientArray)
        return productsJson
    } else {
        return false
    }
}

// Função que lista os produtos do BD com base na categoria
const listProductsByCategory = async (productCategory) => {
    if(productCategory != '' && productCategory != undefined) {
        let productsByCategoryJson = {}

        const { selectProductsByCategory } = require('../models/DAO/product.js')
        const { selectProductIngredient } = require('../models/DAO/productIngredient.js')
        const { selectProductPromotion } = require('../models/DAO/productPromotion.js')

        const productsByCategoryData = await selectProductsByCategory(productCategory)

        if(productsByCategoryData) {
            const productIngredientArray = productsByCategoryData.map(async productItem => {

                const productIngredientData = await selectProductIngredient(productItem.id_produto)
                const productPromotionData = await selectProductPromotion(productItem.id_produto)

                if(productIngredientData) {
                    productItem.ingrediente = productIngredientData

                    if(productPromotionData) {
                        productItem.promocao = productPromotionData
                    }
                }

                return productItem
            })
            productsByCategoryJson.products = await Promise.all(productIngredientArray)
            return {status: 200, message: productsByCategoryJson}
        } else {
            return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
        }
    } else {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    }
}

// Função que lista os produtos do BD com base no tipo
const listProductsByType = async (productType) => {
    if(productType != '' && productType != undefined) {
        let productsByTypeJson = {}

        const { selectProductsByType } = require('../models/DAO/product.js')
        const { selectProductIngredient } = require('../models/DAO/productIngredient.js')
        const { selectProductPromotion } = require('../models/DAO/productPromotion.js')

        const productsByTypeData = await selectProductsByType(productType)

        if(productsByTypeData) {
            const productIngredientArray = productsByTypeData.map(async productItem => {
                const productIngredientData = await selectProductIngredient(productItem.id_produto)
                const productPromotionData = await selectProductPromotion(productItem.id_produto)

                if(productIngredientData) {
                    productItem.ingrediente = productIngredientData

                    if(productPromotionData) {
                        productItem.promocao = productPromotionData
                    }
                }

                return productItem
            })
            productsByTypeJson.products = await Promise.all(productIngredientArray)
            return {status: 200, message: productsByTypeJson}
        } else {
            return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
        }
    } else {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    }
}

// Função que lista os produtos do BD com base no nome
const listProductsByName = async (productName) => {
    if(productName != '' && productName != undefined) {
        let productsByNameJson = {}

        const { selectProductsByName } = require('../models/DAO/product.js')
        const { selectProductIngredient } = require('../models/DAO/productIngredient.js')
        const { selectProductPromotion } = require('../models/DAO/productPromotion.js')

        const productsByNameData = await selectProductsByName(productName.toLowerCase())

        if(productsByNameData) {
            const productIngredientArray = productsByNameData.map(async productItem => {
                const productIngredientData = await selectProductIngredient(productItem.id_produto)
                const productPromotionData = await selectProductPromotion(productItem.id_produto)

                if(productIngredientData) {
                    productItem.ingrediente = productIngredientData

                    if(productPromotionData) {
                        productItem.promocao = productPromotionData
                    }
                }

                return productItem
            })

            productsByNameJson.products = await Promise.all(productIngredientArray)
            return {status: 200, message: productsByNameJson}
        } else {
            return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
        }
    } else {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    }
}

// Função que retorna o ID do produto de acordo com o nome
const selectProductId = async (productName) => {
    if(productName != '' && productName != undefined) {
        let idJson = {}
    
        const { selectProductId } = require('../models/DAO/product.js')
    
        const id = await selectProductId(productName)
    
        if(id) {
            idJson.id = id
            return id
        } else {
            return false
        }
    }
}

module.exports = {
    newProduct,
    updateProduct,
    deleteProduct,
    listAllProducts,
    listProductsByCategory,
    listProductsByType,
    listProductsByName,
    selectProductId
}