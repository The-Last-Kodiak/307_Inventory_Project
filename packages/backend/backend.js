import express from "express";
import db from "./dbFunctions.js";

const app = express();
const port = 8000;
// const { MongoClient } = require('mongodb');
// const uri = process.env.MONGODB_URI;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// async function connectDB() {
//     await client.connect();
//     const db = client.db('your-database-name');
//     return db;
// }
// module.exports = { connectDB };


app.use(express.json());

app.get("/", (req, res) => {
    res.send("Put Something Here");
});

//shows all users in database given the correct password
//Temorary to see database
app.get("/users", (req, res) => {
    const password = req.query.password;
    if (password == "123456789") {
        let users = db.getUsers();
        users.then((u) => { res.send(u); })
            .catch((error) => {
                console.log(error);
                res.status(500).send();
            });
    } else {
        res.status(403).send("Wrong Password");
    }
});


//sign up function that directly adds to local mongoodb database
//checks for duplicate usernames to prevent duplicate accounts
app.post("/signup", (req, res) => {

    //gets account info given
    const account_name = req.query.username;
    const password = req.query.password;
    const account = {
        "username": account_name,
        "password": password
    };


    //gets users in database, check for duplicate accounts
    db.getUsers().then((accounts) => {

        //checks if account already exists
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].username == account_name) {

                //case where username already exists
                res.status(400).send("Account already exists");
                return;
            }
        }

        //adds user to database
        let promise = db.addUser(account);
        promise.then((newUser) => { res.status(201).send(newUser); })
            .catch((error) => {
                console.log(error);
                res.status(500).send();
            });

        //returns account info added
        res.send(account);
    })
    .catch((error) => {
        console.log(error);
        res.status(500).send();
    });
});


// takes in a 1 json object that contains username, password and all attributes of a Prodct except for quantity(=0)
// adds the product to the local database and returns it
// checks for proper login info(username and password) and inputs
app.post("/inventory", (req, res) => {

    //checks if quantity was given and sets it
    let quantity;
    if (req.body[0].quantity === undefined) {
        quantity = 0
    } else {
        quantity = req.body[0].quantity
    }


    //takes json object and puts it in correct format for login and product creation
    const product = {
        "username": req.body[0].username,
        "password": req.body[0].password,
        "product_name": req.body[0].product_name,
        "price": req.body[0].price,
        "quantity": quantity,
        "supplier": req.body[0].supplier,
        "description": req.body[0].description,
    };


    //checks login information by using getUser
    let login;
    if (product.username === undefined || product.password === undefined) {
        return res.status(400).send("No username or passowrd");
    } else {
        login = db.getUser(product);
    }


    //after succesful login, checks if it is vaild and then adds the product if it is
    login.then((u) => {
        if (u.length == 1) {

                //where the product is added
                let promise = db.addProduct(product);
                promise.then((newProduct) => { res.status(201).send(newProduct); })
                    .catch((error) => {
                        console.log(error);
                        res.status(400).send("product_name, price, quantity, supplier or description fields aren't filled");
                    });
                //

            } else if (u.length > 1) {
                console.log(u);
                throw new Error("There are duplicate accounts");
            } else {
                res.status(400).send("Invalid username or password");
            }
        })
        .catch((error) => {
            console.log(error);
        });
});

//gets all products given a username asociated with it and password for login validation
app.get("/inventory", (req, res) => {

    //sets username and password
    const user = {
        "username": req.query.username,
        "password": req.query.password,
    }


    //searches for user given the username and password
    let login;
    if (user.username === undefined || user.password === undefined) {
        return res.status(400).send("No username or passowrd");
    } else {
        login = db.getUser(user);
    }


    //checks if user result is valid before returning the products
    login.then((u) => {
        if (u.length == 1) {

            //gets and returns the products ascosiated with the username
            let inventory = db.getProducts(user);
            inventory.then((i) => { res.send(i) })
                .catch((error) => {
                    console.log(error);
                    res.status(500).send("Internal Server Error")
                });
            //

        } else if (u.length > 1) {
            console.log(u);
            throw new Error("There are duplicate accounts");
        } else {
            res.status(400).send("Invalid username or password");
        }
    })
    .catch((error) => {
        console.log(error);
    });

});

app.delete("/inventory", (req, res) => {
    //checks if quantity was given and sets it
    let quantity;
    if (req.body[0].quantity === undefined) {
        quantity = 0
    } else {
        quantity = req.body[0].quantity
    }


    //takes json object and puts it in correct format for login and product creation
    const product = {
        "username": req.body[0].username,
        "password": req.body[0].password,
        "product_name": req.body[0].product_name,
        "price": req.body[0].price,
        "quantity": quantity,
        "supplier": req.body[0].supplier,
        "description": req.body[0].description,
    };

    //searches for user given the username and password
    let login;
    if (product.username === undefined || product.password === undefined) {
        return res.status(400).send("No username or passowrd");
    } else {
        login = db.getUser(product);
    }

    //checks if user result is valid before deleting the product
    login.then((u) => {
        if (u.length == 1) {

            //deletes the product using all the parameters specified, only deleteing one if a duplicte exists
            let deletedProduct = db.deleteProduct(product);
            deletedProduct.then((q) => { res.status(204).send(q); })
                .catch((error) => {
                    console.log(error);
                    res.status(500).send();
                });
            //

        } else if (u.length > 1) {
            console.log(u);
            throw new Error("There are duplicate accounts");
        } else {
            res.status(400).send("Invalid username or password");
        }
    })
    .catch((error) => {
        console.log(error);
    });
});


app.listen(process.env.PORT || port, () => {
    console.log("REST API is listening.");
  });