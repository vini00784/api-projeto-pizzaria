# CREATE DATABASE db_pizzaria;

USE db_pizzaria;

SHOW TABLES;

CREATE TABLE tbl_usuario (
	id int not null auto_increment primary key,
    nome varchar(80) not null,
    email varchar(256) not null,
    senha varchar(30) not null,
    celular varchar(20),
    rg varchar(20),
    cpf varchar(18) not null,
    unique index(id)
);

CREATE TABLE tbl_promocao (
	id int not null auto_increment primary key,
    nome varchar(60) not null,
    porcentagem_desconto float not null,
    preco_final float not null,
    data_inicio date not null,
    data_termino date not null,
    unique index(id)
);

DESC tbl_promocao;

CREATE TABLE tbl_categoria (
	id int not null auto_increment primary key,
    nome varchar(15) not null,
    unique index(id)
);

DESC tbl_categoria;

CREATE TABLE tbl_ingrediente (
	id int not null auto_increment primary key,
    nome varchar(20) not null,
    unique index(id)
);

DESC tbl_ingrediente;

CREATE TABLE tbl_tipo_produto (
	id int not null auto_increment primary key,
    tipo varchar(20) not null,
    unique index(id)
);

DESC tbl_tipo_produto;

CREATE TABLE tbl_produto (
	id int not null auto_increment primary key,
    nome varchar(50) not null,
    preco float not null,
    foto varchar(200) not null,
    descricao text,
    qtde_favorito int,
    id_tipo_produto int not null,
    id_categoria int not null,
    
    constraint FK_tipo_produto
		foreign key (id_tipo_produto)
        references tbl_tipo_produto (id),
	
    constraint FK_categoria_produto
		foreign key (id_categoria)
        references tbl_categoria (id),
        
	unique index (id)
);

DESC tbl_produto;

CREATE TABLE tbl_ingrediente_produto (
	id int not null auto_increment primary key,
    id_produto int not null,
    id_ingrediente int not null,
    
    constraint FK_produto_ingrediente_produto
		foreign key (id_produto)
        references tbl_produto (id),
        
	constraint FK_ingrediente_ingrediente_produto
		foreign key (id_ingrediente)
        references tbl_ingrediente (id),
        
	unique index(id)
);

DESC tbl_ingrediente_produto;

CREATE TABLE tbl_promocao_produto (
	id int not null auto_increment primary key,
    id_produto int not null,
    id_promocao int not null,
    
    constraint FK_produto_promocao_produto
		foreign key (id_produto)
        references tbl_produto (id),
        
	constraint FK_promocao_promocao_produto
		foreign key (id_promocao)
        references tbl_promocao (id),
        
	unique index (id)
);

DESC tbl_promocao_produto;

CREATE TABLE tbl_tipo_mensagem (
	id int not null auto_increment primary key,
    nome varchar(10) not null,
    unique index (id)
);

DESC tbl_tipo_mensagem;

CREATE TABLE tbl_mensagem (
	id int not null auto_increment primary key,
    nome varchar(80) not null,
    email varchar(256) not null,
    celular varchar(20),
    data_envio date not null,
    mensagem text not null,
    id_tipo_mensagem int not null,
    
    constraint FK_tipo_mensagem_mensagem
		foreign key (id_tipo_mensagem)
        references tbl_tipo_mensagem (id),
        
	unique index (id)
);

DESC tbl_mensagem;

INSERT INTO tbl_categoria (nome)
	values ('Pizza');
SELECT * FROM tbl_categoria;
    
INSERT INTO tbl_tipo_produto (tipo) 
	values ('Salgada');
SELECT * FROM tbl_tipo_produto;

SELECT * FROM tbl_produto;

SELECT * FROM tbl_categoria;

SELECT cast(id AS DECIMAL) AS id, nome, preco, foto, descricao FROM tbl_produto ORDER BY id DESC;

SELECT cast(id AS DECIMAL) AS id, tipo FROM tbl_produto ORDER BY id DESC;

SELECT tbl_produto.nome AS nome_produto, tbl_produto.id,
	   tbl_categoria.nome AS nome_categoria,
       tbl_tipo_produto.tipo AS nome_tipo
       FROM tbl_produto
       
       INNER JOIN tbl_categoria
		 ON tbl_categoria.id = tbl_produto.id_categoria
	   INNER JOIN tbl_tipo_produto
		 ON tbl_tipo_produto.id = tbl_produto.id_tipo_produto;
         
SELECT * FROM tbl_ingrediente_produto;

SELECT cast(tbl_produto.id as decimal) as id_produto, tbl_produto.nome as nome_produto,
	   cast(tbl_ingrediente.id as decimal) as id_ingrediente, tbl_ingrediente.nome as nome_ingrediente
       FROM tbl_produto
       
       INNER JOIN tbl_ingrediente_produto
		 ON tbl_produto.id = tbl_ingrediente_produto.id_produto
         
	  INNER JOIN tbl_ingrediente
		 ON tbl_ingrediente.id = tbl_ingrediente_produto.id_ingrediente
         
	  WHERE tbl_produto.id = 1;
      
ALTER TABLE tbl_ingrediente ADD COLUMN status_ingrediente boolean not null;
ALTER TABLE tbl_ingrediente
	MODIFY COLUMN status_ingrediente boolean not null DEFAULT true;

SELECT * FROM tbl_ingrediente;

DESC tbl_ingrediente;

SELECT cast(tbl_mensagem.id as decimal) as id_mensagem, tbl_mensagem.nome as nome_cliente, tbl_mensagem.email, tbl_mensagem.celular, date_format(tbl_mensagem.data_envio, '%d/%m/%Y'), tbl_mensagem.mensagem,
	   tbl_tipo_mensagem.nome as tipo
       FROM tbl_mensagem
       
       INNER JOIN tbl_tipo_mensagem
		 ON tbl_tipo_mensagem.id = tbl_mensagem.id_tipo_mensagem;
         
SELECT date_format(tbl_mensagem.data_envio, '%d/%m/%Y');

SELECT * from tbl_produto;

SELECT tbl_produto.id as id_produto, tbl_produto.nome as nome_produto, tbl_produto.preco, tbl_produto.foto, tbl_produto.descricao,
	   tbl_tipo_produto.tipo as tipo_produto,
       tbl_categoria.nome as nome_categoria,
       tbl_ingrediente.nome as nome_ingrediente
       
       FROM tbl_produto
       INNER JOIN tbl_tipo_produto
		 ON tbl_tipo_produto.id = tbl_produto.id_tipo_produto
	   INNER JOIN tbl_categoria
		 ON tbl_categoria.id = tbl_produto.id_categoria
	   INNER JOIN tbl_ingrediente_produto
		 ON tbl_produto.id = tbl_ingrediente_produto.id_produto
	   INNER JOIN tbl_ingrediente
		 ON tbl_ingrediente.id = tbl_ingrediente_produto.id_ingrediente;
         
SELECT id FROM tbl_categoria WHERE nome LIKE 'Bebida';

SELECT id FROM tbl_tipo_produto WHERE tipo LIKE 'Doce';

DESC tbl_promocao_produto;

SELECT cast(tbl_produto.id as decimal) as id_produto, tbl_produto.nome as nome_produto, tbl_produto.preco, tbl_produto.foto, tbl_produto.descricao,
	   tbl_categoria.nome as nome_categoria,
       tbl_ingrediente.nome as nome_ingrediente
       FROM tbl_produto
       
       INNER JOIN tbl_categoria
		 ON tbl_categoria.id = tbl_produto.id_categoria
	   INNER JOIN tbl_ingrediente_produto
		 ON tbl_produto.id = tbl_ingrediente_produto.id_produto
	   INNER JOIN tbl_ingrediente
		 ON tbl_ingrediente.id = tbl_ingrediente_produto.id_ingrediente
         
	   WHERE tbl_categoria.nome LIKE "Pizza";
       
SELECT cast(tbl_produto.id as decimal) as id_produto, tbl_produto.nome as nome_produto, tbl_produto.preco, tbl_produto.foto, tbl_produto.descricao,
	   tbl_tipo_produto.tipo as nome_tipo
       FROM tbl_produto
       
       INNER JOIN tbl_tipo_produto
		 ON tbl_tipo_produto.id = tbl_produto.id_tipo_produto
         
	   WHERE tbl_tipo_produto.tipo LIKE "Salgada";
       
ALTER TABLE tbl_produto MODIFY COLUMN qtde_favorito int DEFAULT 0;
       
SELECT cast(tbl_produto.id as decimal) as id_produto, tbl_produto.nome as nome_produto, tbl_produto.preco, tbl_produto.foto, tbl_produto.descricao, tbl_produto.qtde_favorito,
	   tbl_tipo_produto.tipo as nome_tipo,
       tbl_categoria.nome as nome_categoria
       
       FROM tbl_produto
       
       INNER JOIN tbl_tipo_produto
		 ON tbl_tipo_produto.id = tbl_produto.id_tipo_produto
         
	   INNER JOIN tbl_categoria
		 ON tbl_categoria.id = tbl_produto.id_categoria
         
         WHERE locate('tes', tbl_produto.nome);

SELECT * FROM tbl_promocao_produto

























      