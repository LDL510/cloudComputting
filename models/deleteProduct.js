const {Client} = require('pg');
const pg_config = require('./pg_config');

async function deleteProduct(id) {
    const client = new Client(pg_config);
    try {
        await client.connect();
        const query = {
            text: 'DELETE FROM products WHERE id = $1',
            values: [id],
        };
        await client.query(query);
        return true
    } catch (error) {
        console.error('Error executing query', error);
        return false
    } finally {
        await client.end();
    }
  }

module.exports = deleteProduct;