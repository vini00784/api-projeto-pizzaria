/*
    Objetivo:     Arquivo responsável pela configuração de variáveis, constantes e mensagens do sistema, tratamento e retorno de dados entre a API e a Model
    Autores:      Vinícius Santos Oliveira e Arthur Piloto Silva
    Data Criação: 23/11/2022
    Versão:       1.0
*/

const MESSAGE_ERROR = {
    REQUIRED_FIELDS: 'Existe(m) campo(s) obrigatório(s) que deve(m) ser enviado(s)!',
    INVALID_EMAIL: 'O e-mail informado não é válido',
    INCORRECT_CONTENT_TYPE: 'O cabeçalho da requisição não possui um Content-Type válido!',
    EMPTY_BODY: 'O body da requisição não pode ser vazio',
    NOT_FOUND_DB: 'Não foram encontrados registros no Banco de Dados!',
    INTERNAL_ERROR_DB: 'Não foi possível realizar a operação com o banco de dados',
    REQUIRED_ID: 'O id do registro é obrigatório neste tipo de requisição!',
    EXCEEDED_CHARACTERS: 'Número de caracteres excedido!'
}

const MESSAGE_SUCCESS = {
    INSERT_ITEM: 'Item criado com sucesso no Banco de Dados',
    UPDATE_ITEM: 'Item atualizado com sucesso no Banco de Dados',
    DELETE_ITEM: 'Item excluído com sucesso no Banco de Dados',
    JWT_CREATED: 'Web Token criado com sucesso!'
}

module.exports = {
    MESSAGE_ERROR,
    MESSAGE_SUCCESS
}