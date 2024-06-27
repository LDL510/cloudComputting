const {Client} = require('pg');
const pg_config = require('./models/pg_config');

async function test() {
    const client = new Client(pg_config);
    await client.connect();
    const result = await client.query("SELECT department, role_id FROM users WHERE username='loc'");
    console.log(result);
    console.log(result.rows[0].department)
    await client.end()
}

test();