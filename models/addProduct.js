const {Client} = require('pg');
const pg_config = require('./pg_config');

async function addProduct(name, description, price, quantity,image, shopName) {
    const client = new Client(pg_config);
    try {
        await client.connect();
        const query = {
            text: 'INSERT INTO products (name, description, price, quantity, image, shopName) VALUES ($1, $2, $3, $4, $5, $6)',
            values: [name, description, price, quantity, image, shopName],
        };
        const result  = await client.query(query);
        console.log('Product inserted successfully');
        return result
    } catch (error) {
        console.error('Error executing query', error);
    } finally {
        await client.end();
    }
  }

module.exports = addProduct;