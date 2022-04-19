# Pokedex API

<p>
  
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/marlondlacerda/pokedex_backend?color=6E40C9&style=flat-square">
  <img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/marlondlacerda/pokedex_backend?color=2b7489&style=flat-square">
  <a href="https://github.com/marlondlacerda/pokedex_backend/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/marlondlacerda/pokedex_backend?color=6E40C9&style=flat-square">
  </a>
</p>

<img align="right" src="https://www.pngkit.com/png/full/23-232103_pokeball-clipart-tiny-gif-pokeball.png" width="50%" alt="Trybe">

## Tópicos 

[Preview](#preview)

[Sobre o Pokedex Api](#sobre-o-pokedex-api)

[Tecnologias](#tecnologias)

[Instalação e uso](#instalação-e-uso)

<br>

## Preview

<a title="Pokedex Api" href="https://marlonlacerda-pokeapi.herokuapp.com/pokedex/" >Clique aqui </a> para ter acesso a um  preview da Api. <br>

<br>

## Sobre o Pokedex Api

Pokedex Api é um projeto feito para praticar tudo o que aprendi na trybe no módulo de backend, foi desenvolvido por mim durante 10 dias. 
É uma api com método CRUD completo, mais partialUpdate `(patch /pokedex/id)` e findByID `(.get /pokedex/id)`!

A Api contempla os 151 primeiros pokemons e somente quem estiver registrado no banco tem acesso completo ao CRUD após fazer o login e obter o token.
**Nota: Qualquer pessoa com o link poderá ter acesso ao método get para consumir a Api**

Para construção dessa API, foi usado Docker, Typescript, Mongoose para conversar com o banco MongoDB e NodeJS com Express! (As demais Librarys serão citadas abaixo)

<br>

## Tecnologias

Tecnologias e ferramentas utilizadas no desenvolvimento do projeto:

## Principais:
- [TypeScript](https://www.typescriptlang.org/)
- [Docker](https://docker.io/)
- [Express](https://expressjs.com/pt-br/)
- [Mongoose](https://mongoosejs.com/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs)
- [http-status-codes](https://www.npmjs.com/package/http-status-codes)
- [JSONWebTokens](https://www.npmjs.com/package/jsonwebtoken)
- [Zod](https://www.npmjs.com/package/zod)

### Para o Desenvolvimento:
- [Chai](https://www.chaijs.com/)
- [chai-http](https://www.chaijs.com/plugins/chai-http/)
- [Eslint](https://eslint.org/)
- [express-async-errors](https://www.npmjs.com/package/express-async-errors)
- [Mocha](https://mochajs.org/)
- [Nyc](https://www.npmjs.com/package/nyc)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Sinon](https://sinonjs.org/)
- **Workflows criados para que todo Pull Requests e Pushs serem revisados usando a própria configuração do ESLINT**
<br>

## Instalação e uso

```bash
# Abra um terminal e copie este repositório com o comando
git clone git@github.com:marlondlacerda/pokedex_backend.git
# ou use a opção de download.

# Entre na pasta web com 
cd pokedex_backend

# Instale as dependências
yarn install
ou
npm install

# crie um arquivo ".env" para configurar as variáveis de ambiente e siga o exemplo do arquivo ".env.example" para definir as suas configurações

# Rode o aplicação
yarn start
ou
npm start

# Crie uma collection chamada "login" no mongoDB e insira: 
{
  "username": "insira seu username",
  "email": "insira seu email aqui",
  "password": "A senha criptografada",
  "role": "admin"
}

PARA GERAR A SENHA CRIPTOGRAFADA UTILIZE: https://bcrypt-generator.com/

# Utilize uma ferramenta para realizar as requições de API seja elas: SoapUI, Postman, Insomnia etc

#Vá na rota /login usando o método post e utilize o seguinte corpo para gerar o token:

{
  "email": "Email que você cadastrou no banco",
  "password": "A senha descriptografada",
}

#No endpoint "/pokedex" insira o token gerado no header das requisições: "Post, Put, Patch e Delete".
```

<br>

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](/LICENSE) para mais detalhes.

---

Feito por [Marlon Lacerda](https://github.com/marlondlacerda)
