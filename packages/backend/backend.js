import express from "express";
import db from "./dbFunctions.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 8000;
app.use(express.json());
// whitelist frontend domain
const validOrigins = process.env.VALID_ORIGINS
  ? process.env.VALID_ORIGINS.split(",")
  : [];

// set rules for cors
const corsOptions = {
  // specifies which domains are allowed to access backend
  origin: (origin, callback) => {
    if (validOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Welcome to The StockHub API");
});

//shows all users in database given the correct password
//Temorary to see database
app.get("/users", (req, res) => {
  const password = req.query.password;
  if (password == "123456789") {
    let users = db.getUsers();
    users
      .then((u) => {
        res.send(u);
      })
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
  const account_name = req.body[0].username;
  const password = req.body[0].password;
  const account = {
    username: account_name,
    password: password,
  };

  //gets users in database, check for duplicate accounts
  db.getUsers()
    .then((accounts) => {
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
      promise
          .then((newUser) => {
                  //returns new account info
          res.status(201).send(newUser);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send();
        });

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
    quantity = 0;
  } else {
    quantity = req.body[0].quantity;
  }

  //takes json object and puts it in correct format for login and product creation
  const product = {
    username: req.body[0].username,
    password: req.body[0].password,
    product_name: req.body[0].product_name,
    price: req.body[0].price,
    quantity: quantity,
    supplier: req.body[0].supplier,
    description: req.body[0].description,
    sku: req.body[0].sku,
    };

  //checks login information by using getUser
  if (product.username === undefined || product.password === undefined) {
    return res.status(400).send("No username or passowrd");
  } else {
      db.getUser(product, (err, password_res) => {
          if (password_res) {


              //Checks if product already exists by product_name
              let duplicate = db.getProduct(product);

              duplicate.then((u) => {
                      if (u.length >= 1) {
                          console.log(u);
                          res.status(400).send("product already exists, try a different name");
                      } else {
                          //adds product to MongoDB
                          let promise = db.addProduct(product);
                          promise
                              .then((newProduct) => {
                                  res.status(201).send(newProduct);
                              })
                              .catch((error) => {
                                  console.log(error);
                                  res
                                      .status(400)
                                      .send(
                                          "product_name, price, quantity, supplier, description, or sku fields aren't filled",
                                      );
                              });  
                      }
                  })
                  .catch((error) => {
                      console.log(error);
                  });

          } else {
              res.status(400).send("Invalid username or password");
          }
      });
    }
});

//gets all products given a username asociated with it and password for login validation
// take in username and password by query since it is a GET api call
app.get("/inventory", (req, res) => {
    //sets username and password
    const user = {
        username: req.query.username,
        password: req.query.password,
    };

    //searches for user given the username and password
    if (user.username === undefined || user.password === undefined) {
        return res.status(400).send("No username or passowrd");
    } else {
        db.getUser(user, (err, password_res) => {
            if (password_res) {
                //gets and returns the products ascosiated with the username
                let inventory = db.getProducts(user);
                inventory
                    .then((i) => {
                        res.send(i);
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).send("Internal Server Error");
                    });
            } else {
                res.status(400).send("Invalid username or password");
            }
        });
    }
});

// deletes a product given username, password and product name in the body
app.delete("/inventory", (req, res) => {

  //takes json object and puts it in correct format for login and product deletion
  const product = {
    username: req.body[0].username,
    password: req.body[0].password,
    product_name: req.body[0].product_name
  };

  //searches for user given the username and password
  let login;
  if (product.username === undefined || product.password === undefined) {
    return res.status(400).send("No username or passowrd");
  } else {
      login = db.getUser(product, (err, password_res) => {
          if (password_res) {

              //deletes the product using all the parameters specified
              let deletedProduct = db.deleteProduct(product);
              deletedProduct
                  .then((q) => {
                      res.status(204).send(q);
                  })
                  .catch((error) => {
                      console.log(error);
                      res.status(500).send();
                  });
              //
          } else {
              res.status(400).send("Invalid username or password");
          }
      });
  }
});

app.put("/inventory", (req, res) => {

    //takes json object and puts it in correct format for login and product update
    const product = {
        username: req.body[0].username,
        password: req.body[0].password,
        product_name: req.body[0].product_name,
        price: req.body[0].price,
        quantity: req.body[0].quantity,
        supplier: req.body[0].supplier,
        description: req.body[0].description,
        sku: req.body[0].sku,
    };

    //searches for user given the username and password
    let login;
    if (product.username === undefined || product.password === undefined) {
        return res.status(400).send("No username or passowrd");
    } else {
        login = db.getUser(product, (err, password_res) => {
            if (password_res) {

                //updates the product using all the parameters specified
                let update = db.updateProduct(product);
                update
                    .then((q) => {
                        res.status(204).send(q);
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).send();
                    });
                //
            } else {
                res.status(400).send("Invalid username or password");
            }
        });
    }
});

app.listen(process.env.PORT || port, () => {
  console.log("REST API is listening.");
});
