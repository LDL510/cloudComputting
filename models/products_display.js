const {Client} = require('pg');
const pg_config = require('./pg_config');

async function products_display(username) {
    html_table = `<table border='1'> <tr>`;
    // Query to DB and get all data from products table
    const client = new Client(pg_config);
    await client.connect();
    // Check the role and department
    const info_query = {
        text: 'SELECT department, role_id FROM users WHERE username=$1',
        values: [username],
      }
    const info = await client.query(info_query);
    console.log(info);
    let dep = info.rows[0].department;
    let role_id = info.rows[0].role_id;
    let query_string = "";
    if (role_id == 3) {
        // shop role
        query_string = {
            text: 'SELECt * FROM products WHERE shop_name=$1',
            values: [dep],
        } 
    } else {
        // Director or Admin role
        query_string = 'SELECT * FROM products';
    }
    
    const result = await client.query(query_string);
    headers_list = [];
    // Use the loop to generate headers
    result.fields.forEach(element => {
        header = element.name;
        headers_list.push(header);
        html_table += `<th>${header}</th>`;
    });
    html_table += `</tr> <tr>`;
    result.rows.forEach(row => {
        headers_list.forEach(column => {
            html_table += `<td>${row[column]}</td>`;
        });
        html_table += `<td>
                        <a href="/products/update/${row.id}" class="btn btn-warning">Update</a>
                        <a href="/products/delete/${row.id}" class="btn btn-danger">Delete</a>
                      </td>`;
        html_table += `</tr> <tr>`;
    });
    html_table +=  `</tr> </table>`;
    return html_table
}
module.exports = products_display;