const db = require('../config/database');

const Usuario = {
   
    findByUsername: (username) => {
        return db('usuarios').where({ username }).first();
    },

    
    create: (usuario) => {
        return db('usuarios').insert(usuario);
    }
};

module.exports = Usuario;