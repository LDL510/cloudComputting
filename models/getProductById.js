const { Client } = require("pg");
const pg_config = require("./pg_config");

async function getProductById(id) {
  const client = new Client(pg_config);
  try {
    await client.connect();
    const query = {
      text: "SELECT * FROM products WHERE id = $1",
      values: [id],
    };
    const result = await client.query(query);
    const data = result.rows[0];
    let html = ``;
    html += `
    <form action="/products/update/${data.id}" method="post" enctype="multipart/form-data" style="display: flex; flex-direction: column; width: 100%;gap: 10px; justify-items: center;">
        <input type="text" placeholder="Enter Product Name" name="name" value=${data?.name} required> 
        <input type="text" placeholder="Enter Product Price" value=${data?.price} name="price" required>
        <input type="text" placeholder="Enter Product Quantity" value=${data?.quantity} name="quantity" required>
        <input type="text" placeholder="Enter Product Description" value=${data?.description} name="description" required> 
        <input type="file" id="img" name="image" accept="image/*" value=${data?.image}>
        <button type="submit" >Update Product</button>
    </form>
    `;

    return html;
  } catch (error) {
    console.error("Error executing query", error);
    return "error";
  } finally {
    await client.end();
  }
}

module.exports = getProductById;
