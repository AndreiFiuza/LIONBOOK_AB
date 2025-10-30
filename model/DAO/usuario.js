//Import da biblioteca do prisma cliente para realizar as ações no BD
const { PrismaClient } = require('@prisma/client')

//Instancia da classe do prisma client (cria um objeto)
const prisma = new PrismaClient()


//Função para inserir uma nova musica
const insertUsuario = async function(usuario){
    try {
    

    let sql = `insert into tbl_usuario ( 
                                        login, 
                                        senha,
                                        )
                             values     (
                                         '${usuario.login}',
                                         '${usuario.senha}'
                                        )`

    //Executa o script SQL no banco de dados e aguarda o resultado (true ou false)
    
    let result = await prisma.$executeRawUnsafe(sql)
    
    if(result)
        return true
    else 
        return false//Bug no BD
    
    } catch (error) {
        console.log(usuario)
        return false //Bug de Programação
    }
    
    
}

//Função para atualizar um instrumento existente
const updateUsuario = async function(usuario){
    try {
        let sql = `update tbl_usuario set         login        = '${usuario.login}', 
                                                  senha     = '${usuario.senha}', 
                                                  `
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false 
    }
}

//Função para excluir um instrumento existente
const deleteUsuario = async function(id){
    try {
        //Script SQL
        let sql = `delete from tbl_usuario where id = ${id}`

        //Encaminha o script SQL para o BD
        let resultbanda = await prisma.$executeRawUnsafe(sql)

        if(resultbanda)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para retornar todos os instrumentos do BD
const selectAllUsuario = async function(){
    try {
        //Script SQL
        let sql = 'select * from tbl_usuario order by id desc'

        //Encaminha o script SQL para o BD
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para buscar um instrumento pelo ID
const selectByIdUsuario = async function(id){
    try {
        let sql = `select * from tbl_usuario where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
        return false

    } catch (error) {
        return false
    }
}

module.exports = {
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuario,
    selectByIdUsuario
}
