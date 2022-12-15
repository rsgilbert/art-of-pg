const { Client } = require('pg')
const dbConfig = require('./db.config.json.js');


class DB {
    async client() {
        const client = new Client({
            host: dbConfig.db.host,
            database: dbConfig.db.database,
            user: dbConfig.db.user,
            password: dbConfig.db.password
        });
        await client.connect()
        return client;
    }
    /**
     * 
     * @param {string} stmt 
     * @param {any[]|any} values 
     * @returns {any[]}
     */
    async query(stmt, values) {
        if(!(values instanceof Array)) {
            values = [values]
        }
        const clt = await this.client() 
        const result = await clt.query(stmt, values)
        clt.end()
        return result.rows
    }

    async prep(stmt) {
        const clt = await this.client()
        clt.query
    }
} 


/**
 *
 * @param {(tQuery: transactionQuery) => Promise<any>} fn
 * @returns { Promise<any> }
 */
async function transaction(fn) {
    const client = await dbClient()
    await client.query('BEGIN');
    try {
        const result = await fn(transactionQuery);
        await client.query("COMMIT");
        client.end();
        return result;
    }
    catch(e) {
        console.log('rolling back. Error is:', e.message);
        await client.query("ROLLBACK");
        throw e;
    }
    async function transactionQuery(fn) {
        const res = await fn(client);
        return res.rows;
    }
}

module.exports = new DB()
