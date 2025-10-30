//Import do arquivo de mensagens e status code
const message = require('../../modulo/config.js')

//Import do DAO para realizar o CRUD no banco de dados
const usuarioDAO = require('../../model/DAO/usuario.js')

//Função para inserir um novo Instrumento 
const inserirUsuario = async function (usuario, contentType) {

    try {
        console.log(usuario)


        if(String(contentType).toLowerCase() == 'application/json')
        {   
            if (usuario.login          == ''        || usuario.login          == null || usuario.login           == undefined || usuario.login.length       > 50  ||
                usuario.senha          == ''        || usuario.senha          == null || usuario.senha           == undefined || usuario.senha.length       > 50  
            ) {
                return message.ERROR_REQUIRED_FIELDS //status code 400
            } else {
                //Encaminhando os dados do instrumento para o DAO realizar o insert no BD
                let resultUsuario = await usuarioDAO.insertUsuario(usuario)

                if (resultUsuario)
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
const atualizarUsuario = async function (id, usuario, contentType) {

    console.log(contentType)
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {   
                if (usuario.login       == ''        || usuario.login       == null || usuario.login        == undefined || usuario.login.length    > 100  ||
                    usuario.senha       == ''        || usuario.senha       == null || usuario.senha        == undefined || usuario.senha.length    > 100  ||
                    id                  == ''        || id == undefined     || id == null || isNaN(id)
                ) {
                    return message.ERROR_REQUIRED_FIELDS //status code 400
                } else {
                    //Verifica se o ID existe no BD
                    let result = await usuarioDAO.selectByIdUsuario(id)

                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0){
                            //Update
                            //Adiciona o atributo do ID no JSON com os dados recebidos no corpo da requisição
                            banda.id = id
                            let resultUsuario = await usuarioDAO.updateUsuario(usuario)

                            if(resultUsuario){
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
const excluirUsuario = async function (id) {
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)){

        }else{
            //Antes de excluir, estamos verificando se existe esse ID
            let resultUsuario = await usuarioDAO.selectByIdUsuario(id)

            if(resultUsuario != false || typeof(resultUsuario) == 'object'){
                if(resultUsuario.length > 0){
                    //Delete
                    let result = await usuarioDAO.deleteUsuario(id)

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
const listarUsuario = async function () {
    try {
        //Objeto JSON
        let dadosUsuario = {}

        //Chama a Função para retornar as musicas do BD
        let resultBanda = await bandasDAO.selectAllBanda()

        if(resultBanda != false || typeof(resultBanda) == 'object'){
            if(resultBanda.length > 0){
                dadosUsuario.status = true,
                dadosUsuario.status_code = 200,
                dadosUsuario.items = resultUsuario.length
                dadosUsuario.bandas = resultUsuario
                
                return dadosUsuario
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
const buscarUsuario = async function (id) {
    try {
        if (id == "" || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

        
        //Objeto JSON
        let dadosUsuario = {}

        //Chama a Função para retornar as musicas do BD
        let resultUsuario = await usuarioDAO.selectByIdUsuario(id)

        if(resultUsuario != false || typeof(resultUsuario) == 'object'){
            if(resultUsuario.length > 0){
                dadosUsuario.status = true,
                dadosUsuario.status_code = 200,
                dadosUsuario.bandas = resultUsuario
                
                return dadosUsuario
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
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarUsuario,
    buscarUsuario
} 