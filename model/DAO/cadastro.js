//Import da biblioteca do prisma cliente para realizar as ações no BD
const { PrismaClient } = require('@prisma/client')

//Instancia da classe do prisma client (cria um objeto)
const prisma = new PrismaClient()


//Função para inserir uma nova musica
const insertCadastro = async function(cadastro){
    try {
    

    let sql = `insert into tbl_cadastro ( 
                                        usuario, 
                                        email,
                                        senha,
                                        )
                             values     (
                                         '${cadastro.usuario}',
                                         '${cadastro.email}',
                                         '${cadastro.senha}'
                                        )`

    //Executa o script SQL no banco de dados e aguarda o resultado (true ou false)
    
    let result = await prisma.$executeRawUnsafe(sql)
    
    if(result)
        return true
    else 
        return false//Bug no BD
    
    } catch (error) {
        console.log(cadastro)
        return false //Bug de Programação
    }
    
    
}

//Função para atualizar um instrumento existente
const updateCadastro = async function(cadastro){
    try {
        let sql = `update tbl_cadastro set         login        = '${cadastro.usuario}', 
                                                   email        = '${cadastro.email}',
                                                   senha     = '${cadastro.senha}', 
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
const deleteCadastro = async function(id){
    try {
        //Script SQL
        let sql = `delete from tbl_cadastro where id = ${id}`

        //Encaminha o script SQL para o BD
        let resultCadastro = await prisma.$executeRawUnsafe(sql)

        if(resultCadastro)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para retornar todos os instrumentos do BD
const selectAllCadastro = async function(){
    try {
        //Script SQL
        let sql = 'select * from tbl_cadastro order by id desc'

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
const selectByIdCadastro = async function(id){
    try {
        let sql = `select * from tbl_cadastro where id = ${id}`

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
    insertCadastro,
    updateCadastro,
    deleteCadastro,
    selectAllCadastro,
    selectByIdCadastro
}
