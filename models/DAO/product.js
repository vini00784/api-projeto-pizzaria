/*
    Objetivo:     API responsável pela manipulação dos dados dos produtos com o Banco de Dados (INSERT, UPDATE, SELECT, DELETE)
    Autores:      Vinícius Santos Oliveira e Arthur Piloto Silva
    Data Criação: 23/11/2022
    Versão:       1.0
*/

// Import da classe PrismaClient, que é responsável pelas interações com o Banco de Dados
const { PrismaClient } = require('@prisma/client')

// Instância da classe PrismaClient
const prisma = new PrismaClient()

// Função para inserção de um novo produto
const insertProduct = async (product) => {

    try {
        let sql = `insert into tbl_produto (nome,
                                            preco,
                                            foto,
                                            descricao,
                                            id_tipo_produto,
                                            id_categoria)
                                            values (
                                                '${product.nome}',
                                                ${product.preco},
                                                '${product.foto}',
                                                '${product.descricao}',
                                                ${product.id_tipo_produto},
                                                ${product.id_categoria}
                                            );`

        const result = await prisma.$executeRawUnsafe(sql)

        if(result) {
            return true
        } else {
            return false
        }

    } catch(error) {
        return false
    }

}

// Função para atualização de um produto
const updateProduct = async (product) => {
    try {
        let sql = `update tbl_produto set
                   nome = '${product.nome}',
                   preco = ${product.preco},
                   foto = '${product.foto}',
                   descricao = '${product.descricao}',
                   qtde_favorito = ${product.qtde_favorito},
                   id_categoria = ${product.id_categoria},
                   id_tipo_produto = ${product.id_tipo_produto}
                   where id = ${product.id}
                   `
                   console.log(sql);

        const result = await prisma.$executeRawUnsafe(sql)

        if(result) {
            return true
        } else {
            return false
        }
    } catch(error) {
        console.log(error);
        return false
    }
}

// Função para exclusão de um produto
const deleteProduct = async (id) => {
    try {
        let sql = `delete from tbl_produto where id = ${id}`

        const result = await prisma.$executeRawUnsafe(sql)

        if(result) {
            return true
        } else {
            return false
        }
        
    } catch(error) {
        console.log(error)
        return false
    }
}

// Função para retornar todos os produtos
const selectAllProducts = async () => {
    let sql = 'select cast(id as decimal) as id, nome, preco, foto, descricao, qtde_favorito from tbl_produto order by id desc'

    const rsProducts = await prisma.$queryRawUnsafe(sql)

    if(rsProducts.length > 0) {
        return rsProducts
    } else {
        return false
    }
}

// Função para retornar produtos com base na categoria (se é Pizza, Bebida...)
const selectProductsByCategory = async (productCategory) => {
    
}

// Função para retornar produtos com base no tipo (se é pizza doce, salgada...)
const selectProductsByType = async (productType) => {

}

// Função para retornar produtos com base no nome
const selectProductByName = async (productName) => {

}

module.exports = {
    insertProduct,
    updateProduct,
    deleteProduct,
    selectAllProducts,
    selectProductsByCategory,
    selectProductsByType,
    selectProductByName
}