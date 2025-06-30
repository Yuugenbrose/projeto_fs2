
const bcrypt = require('bcryptjs');


const db = require('./src/config/database');


async function criarUsuarioPadrao() {
    console.log("Iniciando script para criar usuário padrão...");

    try {
        
        const username = "admin";
        const password = "123";


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("Senha para o 'admin' foi criptografada com sucesso.");

        
        const novoUsuario = {
            username: username,
            password: hashedPassword
        };

        
        await db('usuarios').insert(novoUsuario);

        console.log(`Usuário '${username}' criado com sucesso!`);

    } catch (error) {
      
        if (error.message.includes("UNIQUE constraint failed")) {
            console.warn("Aviso: O usuário 'admin' já existe no banco de dados.");
        } else {
            
            console.error("Ocorreu um erro ao tentar criar o usuário:", error);
        }
    } finally {
    
        db.destroy();
        console.log("Script finalizado.");
    }
}


criarUsuarioPadrao();