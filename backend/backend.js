import express from "express";
import user_rest from "./user.js";
const app = express();
const port = 8000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Put Something Here");
});

//shows all users in database given the correct password
//Temorary to see database
app.get("/users", (req, res) => {
    const password = req.query.password;
    if (password == "123456789") {
        let users = user_rest.getUsers();
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
    user_rest.getUsers().then((accounts) => {

        //checks if account already exists
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].username == account_name) {

                //case where username already exists
                res.status(400).send("Account already exists");
                return;
            }
        }

        //adds user to database
        let promise = user_rest.addUser(account);
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

app.listen(port, () => {
    console.log(
        `Currently listening`
    );
});