/*
    Objetivo:     API responsável pela manipulação dos dados dos usuários com o Banco de Dados (INSERT, UPDATE, SELECT, DELETE)
    Autores:      Vinícius Santos Oliveira e Arthur Piloto Silva
    Data Criação: 30/11/2022
    Versão:       1.0
*/

// Import da classe PrismaClient, que é responsável pelas interações com o Banco de Dados
const { PrismaClient } = require('@prisma/client')

// Instância da classe PrismaClient
const prisma = new PrismaClient()

// Função para inserção de um novo usuário
const insertUser = async (user) => {
    try {
        let sql = `insert into tbl_usuario (nome,
                                            email,
                                            senha,
                                            celular,
                                            rg,
                                            cpf)
                                            values (
                                                '${user.nome}',
                                                '${user.email}',
                                                '${user.senha}',
                                                '${user.celular}',
                                                '${user.rg}',
                                                '${user.cpf}'
                                            )`

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

// Função para atualização de um usuário
const updateUser = async (user) => {
    try {
        let sql = `update tbl_usuario set
                   nome = '${user.nome}',
                   email = '${user.email}',
                   senha = '${user.senha}',
                   celular = '${user.celular}',
                   rg = '${user.rg}',
                   cpf = '${user.cpf}'
                   where id = ${user.id}`

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

// Função para exclusão de um usuário
const deleteUser = async (id) => {
    try {
        let sql = `delete from tbl_usuario where id = ${id}`

        const result = await prisma.$queryRawUnsafe(sql)

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

// Função para retornar todos os usuários
const selectAllUsers = async () => {
    let sql = 'select * from tbl_usuario order by id desc'

    const rsUsers = await prisma.$queryRawUnsafe(sql)

    if(rsUsers.length > 0) {
        return rsUsers
    } else {
        return false
    }
}

const selectAuthUser = async(userLogin, userPassword) => {
    let sql = `select cast(id as decimal) as id, nome, email from tbl_usuario where email = ${userLogin} and where senha = ${userPassword}`
    
    const rsUser = await prisma.$executeRawUnsafe(sql)

    if(rsUser.length > 0) {
        return rsUser
    } else {
        return false
    }
}

module.exports = {
    insertUser,
    updateUser,
    deleteUser,
    selectAllUsers,
    selectAuthUser
}