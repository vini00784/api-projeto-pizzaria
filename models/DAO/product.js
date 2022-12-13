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
    let sql = `SELECT cast(tbl_produto.id as decimal) as id_produto, tbl_produto.nome as nome_produto, tbl_produto.preco, tbl_produto.foto, tbl_produto.descricao, tbl_produto.qtde_favorito,
    tbl_tipo_produto.tipo as nome_tipo,
    tbl_categoria.nome as nome_categoria
    
    FROM tbl_produto
    
    INNER JOIN tbl_tipo_produto
      ON tbl_tipo_produto.id = tbl_produto.id_tipo_produto
      
    INNER JOIN tbl_categoria
      ON tbl_categoria.id = tbl_produto.id_categoria
      
    ORDER BY tbl_produto.id desc`

    const rsProducts = await prisma.$queryRawUnsafe(sql)

    if(rsProducts.length > 0) {
        return rsProducts
    } else {
        return false
    }
}

// Função para retornar produtos com base na categoria (se é Pizza, Bebida...)
const selectProductsByCategory = async (productCategory) => {
    let sql = `SELECT cast(tbl_produto.id as decimal) as id_produto, tbl_produto.nome as nome_produto, tbl_produto.preco, tbl_produto.foto, tbl_produto.descricao, tbl_produto.qtde_favorito,
    tbl_tipo_produto.tipo as nome_tipo,
    tbl_categoria.nome as nome_categoria
    
    FROM tbl_produto
    
    INNER JOIN tbl_tipo_produto
      ON tbl_tipo_produto.id = tbl_produto.id_tipo_produto
      
    INNER JOIN tbl_categoria
      ON tbl_categoria.id = tbl_produto.id_categoria
      
    WHERE tbl_categoria.nome LIKE "${productCategory}"
    ORDER BY tbl_produto.id desc`

    const rsProductsByCategory = await prisma.$queryRawUnsafe(sql)

    if(rsProductsByCategory.length > 0) {
        return rsProductsByCategory
    } else {
        return false
    }
}

// Função para retornar produtos com base no tipo (se é pizza doce, salgada...)
const selectProductsByType = async (productType) => {
    let sql = `SELECT cast(tbl_produto.id as decimal) as id_produto, tbl_produto.nome as nome_produto, tbl_produto.preco, tbl_produto.foto, tbl_produto.descricao, tbl_produto.qtde_favorito,
    tbl_tipo_produto.tipo as nome_tipo,
    tbl_categoria.nome as nome_categoria
    
    FROM tbl_produto
    
    INNER JOIN tbl_tipo_produto
      ON tbl_tipo_produto.id = tbl_produto.id_tipo_produto
      
    INNER JOIN tbl_categoria
      ON tbl_categoria.id = tbl_produto.id_categoria
      
    WHERE tbl_tipo_produto.tipo LIKE "${productType}"
    ORDER BY tbl_produto.id desc`

    const rsProductsByType = await prisma.$queryRawUnsafe(sql)

    if(rsProductsByType.length > 0) {
        return rsProductsByType
    } else {
        return false
    }
}

// Função para retornar produtos com base no nome
const selectProductsByName = async (productName) => {
    let sql = `SELECT cast(tbl_produto.id as decimal) as id_produto, tbl_produto.nome as nome_produto, tbl_produto.preco, tbl_produto.foto, tbl_produto.descricao, tbl_produto.qtde_favorito,
    tbl_tipo_produto.tipo as nome_tipo,
    tbl_categoria.nome as nome_categoria
    
    FROM tbl_produto
    
    INNER JOIN tbl_tipo_produto
      ON tbl_tipo_produto.id = tbl_produto.id_tipo_produto
      
    INNER JOIN tbl_categoria
      ON tbl_categoria.id = tbl_produto.id_categoria
      
    WHERE locate('${productName}', tbl_produto.nome)
    ORDER BY tbl_produto.id desc`

    const rsProductsByName = await prisma.$queryRawUnsafe(sql)

    if(rsProductsByName.length > 0) {
        return rsProductsByName
    } else {
        return false
    }
}

// Função para retornar o último ID de produto gerado no banco
const selectLastId = async () => {

    // Script para buscar o último ID gerado no banco de dados
    let sql = `select cast(id as decimal) as id from tbl_produto order by id desc limit 1`
    
    const rsProduct = await prisma.$queryRawUnsafe(sql)

    if(rsProduct) {
        return rsProduct[0].id
    } else {
        return false
    }

}

//Função para retornar o ID de acordo com o nome do Produto 
const selectProductId = async(productName) => {
    let sql = `select id from tbl_produto where nome like '${productName}'`

    const rsId = await prisma.$queryRawUnsafe(sql)

    if(rsId.length > 0) {
        return rsId
    } else {
        return false
    }
}

module.exports = {
    insertProduct,
    updateProduct,
    deleteProduct,
    selectAllProducts,
    selectProductsByCategory,
    selectProductsByType,
    selectProductsByName,
    selectLastId,
    selectProductId
}