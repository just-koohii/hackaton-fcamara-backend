# Elo - Backend


---
## Dependências

### Yarn
  Este projeto utiliza `yarn`, para instalá-lo, basta executar o seguinte comando:
  
      $ npm install -g yarn
---

Depois que finalizar a instalação, execute-o com o comando a seguir para instalar os pacotes do projeto:
  
      $ yarn
---

## Configure a api

Edite os arquivos .env na raíz do projeto antes de iniciar o app nos modos `prod`, `dev` ou `test` e adicione os seguintes valores


- DB_DIALECT: dialeto de banco de dados
- DB_USER: usuário do banco de dados
- DB_PASS: usuário do banco de dados
- DB_HOST: endereço do banco de dados
- DB_DATABASE: nome do Database
- PORT: porta do server
- API_SECRET: chave do jwt

## Inicializando o banco
Inicialize as tabelas para cada ambiente com os seguintes comandos:
- linux
      $ NODE_ENV=dev yarn sequelize db:create;
      $ NODE_ENV=dev yarn sequelize db:migrate

- windows
    $ set NODE_ENV=dev yarn sequelize db:create;
      $ set NODE_ENV=dev yarn sequelize db:migrate

## Executando a aplicação

      $ NODE_ENV=dev yarn start


