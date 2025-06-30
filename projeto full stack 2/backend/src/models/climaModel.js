
const db = require('../config/database');

const Clima = {
    buscarPorUsuarioId: (usuario_id) => {
        return db('clima').where({ usuario_id });
    },

    inserir: (dadoClima) => {
        return db('clima').insert(dadoClima);
    },

   
    buscarTodos: () => {
        return db('clima').select('*'); 
    },
        buscarPorCidade: (cidade) => {

        return db('clima').where('cidade', 'like', `%${cidade}%`);
    }
    
};

module.exports = Clima;