const {Client} = require('pg');
const pg_config = require('./pg_config');

async function register(user, pass, role_id) {
    let auth = false;
    const client = new Client(pg_config);
    await client.connect();
    const query = {
      text: 'INSERT INTO users (username, password, role_id) VALUES ($1, $2, $3)',
      values: [user, pass, role_id],
    }
    const result = await client.query(query);
    await client.end();
    if (result.rowCount == 1) {
      auth = true;
    }
    return auth;
  }

module.exports = register;