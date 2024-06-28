const {Client} = require('pg');
const pg_config = require('./pg_config');

async function products_display(username) {
    html_table = `<table border='1'> <tr>`;
    const client = new Client(pg_config);
    await client.connect();
    const info_query = {
        text: 'SELECT department, role_id FROM users WHERE username=$1',
        values: [username],
      }
    const info = await client.query(info_query);
    let role_id = info.rows[0].role_id;
    let query_string = "";
    if (role_id === 3) {
        query_string = {
            text: 'SELECT * FROM products WHERE shopname=$1',
            values: [username],
        } 
    } 
    else {
        query_string = 'SELECT * FROM products';
    }
    
    const result = await client.query(query_string);
    headers_list = [];
    result.fields.forEach(element => {
        header = element.name;
        headers_list.push(header);
        html_table += `<th>${header}</th>`;
    });
    html_table += `</tr> <tr>`;
    result.rows.forEach(row => {
        headers_list.forEach(column => {
            if (column === 'image') {
                html_table += `<td><img src="data:image/jpeg;base64,${row[column]}" style="max-width: 100px; max-height: 100px;"></td>`;
            } else {
                html_table += `<td>${row[column]}</td>`;
            }
        });
        html_table += `<td>
                        <a href="/products/${row.id}" class="btn btn-warning">Update</a>
                        <form action="/products/${row.id}" method="post">
                            <button type="submit">Delete</button>
                        </form>
                      </td>`;
        html_table += `</tr> <tr>`;
    });
    html_table +=  `</tr> </table>`;
    return html_table
}
module.exports = products_display;