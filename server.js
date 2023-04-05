const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "uploads")));

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

app.post("/upload", upload.single("avatar"), (req, res) => {
  res.json(req.file);
});

app.listen(1234, () => {
  console.log("Listening");
});
