import db from "../packages/backend/dbFunctions.js";

test('User create', async () => {
    const got = await db.addUser({
        username: "bobby12345",
        password: "password123"
    });
    expect(got !== null).toBe(true);
});

test('User get', async () => {
    const expected = {
        username: "bobby12345",
        password: "password123"
    };
    const got = await db.getUser(expected);
    expect(got.username).toBe(expected.username);
});

test('Product Add', async () => {

    //tests adding a product
    const expected = {
        username: "bobby12345",
        sku: "AVACADOS",
        product_name: "Avacados",
        price: 80,
        supplier: "McLane",
        quantity: 0,
        description: "Straight from Rome"
    };
    const got = await db.addProduct(expected);
    const d = await db.Models.Inventory.deleteOne({ sku: "AVACADOS" });

    expect(got.username).toBe(expected.username);
});

test('Product Update', async () => {

    //tests adding a product
    const expected = {
        username: "bobby12345",
        sku: "AVACADOS",
        product_name: "Avacados",
        price: 80,
        supplier: "McLane",
        quantity: 0,
        description: "Straight from Rome"
    };
    await db.addProduct(expected);
    expected.price = 60;
    const got = await db.updateProduct(expected);

    expect(got.username).toBe(expected.username);
    await db.Models.Inventory.deleteOne({ sku: "AVACADOS" });
});

test('Get Products', async () => {
    const got = await db.getProducts({
        username: "bobby12345",
        password: "password123"
    });
    expect(got !== null).toBe(true);
});

test('Get One Product', async () => {
    const expected = {
        username: "bobby12345",
        sku: "AVACADOS",
        product_name: "Avacados",
        price: 80,
        supplier: "McLane",
        quantity: 0,
        description: "Straight from Rome"
    };
    await db.addProduct(expected);

    const got = await db.getProducts({
        username: "bobby12345",
        password: "password123",
        sku: "AVACADOS",
    });
    expect(got !== null).toBe(true);
    await db.Models.Inventory.deleteOne({ sku: "AVACADOS" });
});

