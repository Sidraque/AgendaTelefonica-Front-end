# Front-End Angular - Agenda Telefônica
Este repositório contém o projeto front-end de uma aplicação de agenda telefônica desenvolvida em Angular. A aplicação permite aos usuários gerenciar seus contatos de maneira eficiente e intuitiva. O back-end da aplicação foi desenvolvido em Java usando Spring Boot 17 e está disponível no repositório https://github.com/Sidraque/AgendaTelefonica-Back-end

# Pré-requisitos
Antes de iniciar, certifique-se de ter instalado no seu sistema:

- Node.js
- Angular CLI
- PostgreSQL

# Configuração do Banco de Dados
Para configurar o banco de dados, execute os comandos SQL abaixo no PostgreSQL para criar o schema e a tabela necessária:

CREATE SCHEMA desafio;
CREATE TABLE desafio.coontato(
    contato_id SERIAL PRIMARY KEY,
    contato_nome VARCHAR(100),
    contato_email VARCHAR(255),
    contato_celular VARCHAR(11),
    contato_telefone VARCHAR(10),
    contato_sn_favorito CHARACTER(1),
    contato_sn_ativo CHARACTER(1),
    contato_dh_cad TIMESTAMP WITHOUT TIME ZONE
);

# Configuração do Projeto
Clone este repositório usando o comando:

git clone <url-do-repositorio-front-end>

# Navegue até o diretório do projeto e instale as dependências:

npm install

# Para iniciar o servidor de desenvolvimento, execute:

ng serve

Acesse a aplicação em http://localhost:4200/

# Funcionalidades:

- Adicionar novos contatos
- Editar contatos existentes
- Marcar contatos como favoritos
- Filtrar contatos por nome, telefone, entre outros
- Visualizar todos os detalhes do contato
