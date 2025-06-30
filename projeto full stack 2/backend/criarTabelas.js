const db = require('./src/config/database');

async function criarTabelas() {
    try {
        await db.schema.createTable('usuarios', (table) => {
            table.increments('id').primary();
            table.string('username').unique().notNullable();
            table.string('password').notNullable();
        });

        await db.schema.createTable('clima', (table) => {
            table.increments('id').primary();
            table.string('cidade').notNullable();
            table.decimal('temperatura', 5, 2); 
            table.string('condicao');
            table.integer('umidade');
            table.timestamp('data_medicao').defaultTo(db.fn.now());
            
           
            table.integer('usuario_id').unsigned().references('id').inTable('usuarios');
        });
        console.log("Tabela 'clima' criada com sucesso!");
    } catch (error) {
        console.error("Erro ao criar tabelas:", error);
    } finally {
        db.destroy(); 
    }
}

criarTabelas();