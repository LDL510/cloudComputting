const {Client} = require('pg');
const pg_config = require('./pg_config');

async function updateProduct(id, name, description, price, quantity, image) {
    const client = new Client(pg_config);
    try {
        await client.connect();
        let query 
        if(image === undefined){
          query = {
            text: 'UPDATE products SET name = $2, description = $3, price = $4, quantity = $5 WHERE id = $1',
            values: [id, name, description, price, quantity],
          };
        }else{
          query = {
           text: 'UPDATE products SET name = $2, description = $3, price = $4, quantity = $5, image = $6 WHERE id = $1',
           values: [id, name, description, price, quantity, image],
         };

        }
      await client.query(query);;
      return true;
    } 
    catch (error) {
      console.error('Error executing query', error);
      return false;
    }
    finally {
      await client.end();
    }
  }
  
  module.exports = updateProduct;