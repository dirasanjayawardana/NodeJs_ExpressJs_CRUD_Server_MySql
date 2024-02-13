const express = require("express");
const router = require("./src/routes");

const app = express();
app.use(express.json());

//=== bentuk request ada 3 macam
// query params (localhost:4000/?namaQuery=value) --> req.query.namaQuery
// path variabel/params (localhost:4000/name/:namaParams) --> req.params.namaParams
// body req ({name: "dira", age: 24}) --> req.body

//=== memberi response sebuah text dan element html
app.get("/", (req, res) => {
    const name = req.query.name;

    res.send(`<h1>Hello World ${name}</h1>`);
});

//=== memberi response berupa json beserta status responsenya
app.get("/hello/:id", (req, res) => {
    const name = req.params.id;

    res.status(200).json({
        message: `Hello ${name}`,
    });
});

app.post("/hello", (req, res) => {
    const dataInput = req.body;

    res.status(200).json({
        dataInput,
    });
});

//=== using routes
app.use(router);

const port = 4000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
