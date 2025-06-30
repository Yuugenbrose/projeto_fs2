const knex = require('knex');
const path = require('path');

const config = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'db.sqlite')
    },
    useNullAsDefault: true,
    pool: {
        min: 2,
        max: 10
    }
};

const database = knex(config);

module.exports = database;