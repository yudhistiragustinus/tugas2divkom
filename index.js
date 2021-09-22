// Library
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
// import express as express

// memanggil express functions
const app = express();

// panggil cors dan bodyparser
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Setting client(front-end)
app.set("view engine", "ejs");

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
});

// Route
app.get("/form", (req, res) => {
  res.render("form"); //res->response, mengirimkan feedback ke client
});

// ambil data + show data
app.get("/readdata", (req, res) => {
  const sql = "SELECT * FROM matkul";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});


// post data
app.post("/postdata", (req, res) => {
  const namaMk = req.body.nama;
  const dosenMk = req.body.dosen;
  console.log(namaMk);
  console.log("test");
  console.log(dosenMk);
  const sql = "INSERT INTO matkul (Matkul, Dosen) VALUES (?, ?)";
  const values = [namaMk, dosenMk]; //[namaMk, dosenMk]
  db.query(sql, values, (err, response) => {
    if (err) throw err;
    res.send({message: "Data Submitted"});
  });

  // console.log(req.params); //untuk data dari client dengan url, format /:<nama>
  // console.log(req.body); untuk data dari client bentuk form/JSON
});


// update data
app.put("/editdata/:id", (req,res)=>{
  const dosenMk = req.body.dosen;
  const id = req.params.id;
  const sql = "UPDATE matkul SET dosen=? WHERE idmatkul=?";
  const values = [dosenMk, id];
  db.query(sql, values, (err, result) => {
    if (err) throw err;
    res.send("Data Updated");
  });
})

// Delete data
app.delete("/deletedata/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM matkul WHERE id = ?"
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    res.send("Data Deleted");
  });



})

// Start server
app.listen(3001, () => {
  console.log("Server Start...");
});
