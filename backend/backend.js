import express from "express"
const app = express();
const port = 8000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Put Something Here");
});

app.listen(port, () => {
    console.log(
        `how to listen`
    );
});