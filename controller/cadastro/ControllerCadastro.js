//Import do arquivo de mensagens e status code
const message = require('../../modulo/config.js')

//Import do DAO para realizar o CRUD no banco de dados
const cadastroDAO = require('../../model/DAO/cadastro.js')

//Função para inserir um novo Instrumento 
const inserirCadastro = async function (cadastro, contentType) {

    try {
        console.log(cadastro)


        if(String(contentType).toLowerCase() == 'application/json')
        {   
            if (cadastro.usuario          == ''        || cadastro.usuario          == null || cadastro.usuario           == undefined || cadastro.usuario.length       > 50  ||
                cadastro.email          == ''        || cadastro.email          == null || cadastro.email           == undefined || cadastro.email.length       > 50  ||
                cadastro.senha          == ''        || cadastro.senha          == null || cadastro.senha           == undefined || cadastro.senha.length       > 50  
            ) {
                return message.ERROR_REQUIRED_FIELDS //status code 400
            } else {
                //Encaminhando os dados do instrumento para o DAO realizar o insert no BD
                let resultcadastro = await cadastroDAO.insertCadastro(cadastro)

                if (resultcadastro)
                    return message.SUCCESS_CREATED_ITEM //201
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para atualizar um Instrumento
const atualizarCadastro = async function (id, cadastro, contentType) {

    console.log(contentType)
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {   
                if (cadastro.usuario       == ''        || cadastro.usuario       == null || cadastro.usuario        == undefined || cadastro.usuario.length    > 100  ||
                    cadastro.email       == ''        || cadastro.email       == null || cadastro.email        == undefined || cadastro.email.length    > 100  ||
                    cadastro.senha       == ''        || cadastro.senha       == null || cadastro.senha        == undefined || cadastro.senha.length    > 100  ||
                    id                  == ''        || id == undefined     || id == null || isNaN(id)
                ) {
                    return message.ERROR_REQUIRED_FIELDS //status code 400
                } else {
                    //Verifica se o ID existe no BD
                    let result = await cadastroDAO.selectByIdCadastro(id)

                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                            //Update
                            //Adiciona o atributo do ID no JSON com os dados recebidos no corpo da requisição
                            cadastro.id = id
                            let resultcadastro = await cadastroDAO.updateCadastro(cadastro)

                            if(resultcadastro){
                                return message.SUCCESS_UPDATE_ITEM //200
                            }else{
                                return message.ERROR_INTERNAL_SERVER_MODEL //500
                            }
                        }else{
                            return message.ERROR_NOT_FOUND //404
                        }
                    }
                }
            }else{
                return message.ERROR_CONTENT_TYPE //415
            }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para excluir um Instrumento
const excluirCadastro = async function (id) {
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)){

        }else{
            //Antes de excluir, estamos verificando se existe esse ID
            let resultcadastro = await cadastroDAO.selectByIdCadastro(id)

            if(resultcadastro != false || typeof(resultcadastro) == 'object'){
                if(resultcadastro.length > 0){
                    //Delete
                    let result = await cadastroDAO.deleteCadastro(id)

                    if(result)
                        return message.SUCCESS_DELETE_ITEM //200
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para retornar uma lista de Instrumentos
const listarCadastro = async function () {
    try {
        //Objeto JSON
        let dadoscadastro = {}

        //Chama a Função para retornar as musicas do BD
        let resultCadastro = await cadastroDAO.selectAllCadastro()

        if(resultCadastro != false || typeof(resultCadastro) == 'object'){
            if(resultCadastro.length > 0){
                dadoscadastro.status = true,
                dadoscadastro.status_code = 200,
                dadoscadastro.items = resultCadastro.length
                dadoscadastro.cadastro = resultCadastro
                
                return dadoscadastro
            }else{
                return message.ERROR_NOT_FOUND //404
        }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }

} catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
}
}
//Função para retornar um Instrumento pelo ID
const buscarCadastro = async function (id) {
    try {
        if (id == "" || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

        
        //Objeto JSON
        let dadosCadastro = {}

        //Chama a Função para retornar as musicas do BD
        let resultCadastro = await cadastroDAO.selectByIdCadastro(id)

        if(resultCadastro != false || typeof(resultCadastro) == 'object'){
            if(resultCadastro.length > 0){
                dadosCadastro.status = true,
                dadosCadastro.status_code = 200,
                dadosCadastro.cadastro = resultCadastro
                
                return dadosCadastro
            }else{
                return message.ERROR_NOT_FOUND //404
        }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    }

} catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
}
}

module.exports = {
    inserirCadastro,
    atualizarCadastro,
    excluirCadastro,
    listarCadastro,
    buscarCadastro
} 