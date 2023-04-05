const express = require("express");
const multer = require("multer");
const path = require("path");
var mysql = require("mysql");
var con = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12611351",
  password: "uUG5gTsVMH",
  database: "sql12611351",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!!!");
});

const app = express();
app.use(express.static(path.join(__dirname)));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/upload", upload.single("avatar"), (req, res) => {
  var sql = "SELECT * FROM users";
  con.query(sql, function (err, results) {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(1234, () => {
  console.log("Listening");
});
