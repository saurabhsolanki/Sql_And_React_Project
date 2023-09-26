const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "crud_contact",
});

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Get all the contact
app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM contact_db";
  db.query(sqlGet, (err, result) => {
    console.log("result");
    res.send(result);
  });
});

// Post the contact
app.post("/api/post", (req, res) => {
  const { name, email, contact } = req.body;
  const sqlInsert =
    "INSERT INTO contact_db (name,email,contact) VALUES (?,?,?)";
  db.query(sqlInsert, [name, email, contact], (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

// Delete the Contact
app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM contact_db WHERE id=?";
  db.query(sqlRemove, id, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

// Get single contact by using Id
app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM contact_db where id=?";

  db.query(sqlGet, id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Update the contact
app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, contact } = req.body;

  const sqlUpdate =
    "UPDATE contact_db SET name=?, email=?, contact=? WHERE id=?";

  db.query(sqlUpdate, [name, email, contact, id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.get("/", (req, res) => {
  // const sqlInsert="INSERT INTO contact_db (name, email, contact) VALUES ('john', 'john@gmail.com', 8323234)"
  // db.query(sqlInsert,(err,result)=>{
  //     console.log('error',err)
  //     console.log('result', result)
  //     res.send("Hello Express")
  // })
  res.send("Hello Express");
});

app.listen(5000, () => {
  console.log("server started at port 5000");
});
