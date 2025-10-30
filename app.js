/****************************************************************************
 * Objetivo: Criar uma API para realizar integração com o banco de dados
 * Data: 11/02/2025
 * Versão: 1.0
 * observações:
 *      express             npm install express --save
 *      cors                npm install cors --save
 *      body parser         npm install body-parser --save
 *
 * Para criar a conexão com o banco de dados precisa instalar:
 *      
 *      prisma              npm install prisma --save
 *      @prisma/client      npm install @prisma/client --save
 * 
 * Após a instalação do prisma e @prisma/client, devemos:
 *      npx prisma init     Para inicializar o prisma no projeto
 * Após esse comando você devera configurar o .env e o schema.prisma, e rodar o comando:
 *      npx prisma migrate dev 
*****************************************************************************/

//Import das bibliotecas para criar a API
const express    = require('express')
const cors       = require('cors')
const bodyParser = require('body-parser')

//Import das Controllers do projeto
const controllerUsuario = require('./controller/usuario/ControllerUsuario')
//const controllerInstrumento = require('./controller/instrumentos/ControllerInstrumentos')
//const controllerNacionalidade = require('./controller/nacionalidade/ControllerNacionalidade')
//const controllerGenero = require('./controller/genero/ControllerGenero')
//const controllerFuncao = require('./controller/funcao/ControllerFuncao')


//Cria um objeto para o BODY do tipo JSON
const bodyParserJSON = bodyParser.json()

//Cria um objeto do app para criar a API
const app = express()

//Configurações de permissões do CORS para a API
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())

    next()
})
 
app.post('/v1/controle-usuarios/usuario', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o dados do body da requisição
    let dadosBody = request.body

    //Chama a função da controller para inserir os dados e aguardar o retorno da função
    let resultUsuario = await controllerUsuario.inserirUsuario(dadosBody, contentType)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

app.get('/v1/controle-usuarios/usuario', cors(), async function(request, response) {
    let resultUsuario = await controllerUsuario.listarUsuario()

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

app.get('/v1/controle-usuarios/usuario/:id', cors(), async function(request, response) {
    
    //Recebe o id
    let idUsuario = request.params.id

    //Chama a função
    let resultUsuario = await controllerUsuario.buscarUsuario(idUsuario)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

app.delete('/v1/controle-usuarios/musica/:id', cors(), async function(request, response){
    
    //Recebe o ID
    let idUsuario = request.params.id

    //Chama a função
    let resultUsuario = await controllerUsuario.excluirUsuario(idUsuario)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

app.put('/v1/controle-usuarios/usuario/:id', cors(), bodyParserJSON, async function (request,response) {
    
    //Recebe o contentType da requisição
    let contentType = request.headers['content-type']
    
    //Recebe o ID da música
    let idUsuario = request.params.id

    //Recebe os dados no corpo da requisição
    let dadosBody = request.body

    //Chama a função e encamimnha os argumentos de ID, BODY e Content-Type
    let resultUsuario = await controllerUsuario.atualizarUsuario(idUsuario, dadosBody, contentType)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})




app.post('/v1/controle-cadastros/cadastro', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o dados do body da requisição
    let dadosBody = request.body

    //Chama a função da controller para inserir os dados e aguardar o retorno da função
    let resultCadastro = await resultCadastro.resultCadastro(dadosBody, contentType)

    response.status(resultCadastro.status_code)
    response.json(resultCadastro)
})

app.get('/v1/controle-cadastros/cadastro', cors(), async function(request, response) {
    let resultCadastro = await controllerCadastro.listarCadastro()

    response.status(resultCadastro.status_code)
    response.json(resultCadastro)
})

app.get('/v1/controle-cadastros/cadastro/:id', cors(), async function(request, response) {
    
    //Recebe o id
    let idCadastro = request.params.id

    //Chama a função
    let resultCadastro = await controllerCadastro.buscarCadastro(idCadastro)

    response.status(resultCadastro.status_code)
    response.json(resultCadastro)
})

app.delete('/v1/controle-cadastros/musica/:id', cors(), async function(request, response){
    
    //Recebe o ID
    let idCadastro = request.params.id

    //Chama a função
    let resultCadastro = await controllerCadastro.excluirCadastro(idCadastro)

    response.status(resultCadastro.status_code)
    response.json(resultCadastro)
})

app.put('/v1/controle-cadastros/usuario/:id', cors(), bodyParserJSON, async function (request,response) {
    
    //Recebe o contentType da requisição
    let contentType = request.headers['content-type']
    
    //Recebe o ID da música
    let idCadastro = request.params.id

    //Recebe os dados no corpo da requisição
    let dadosBody = request.body

    //Chama a função e encamimnha os argumentos de ID, BODY e Content-Type
    let resultCadastro = await controllerCadastro.atualizarCadastro(idCadastro, dadosBody, contentType)

    response.status(resultCadastro.status_code)
    response.json(resultCadastro)
})