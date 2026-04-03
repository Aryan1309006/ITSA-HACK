require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 8000;

const expressError = require("./utils/expressError");
const wrapAsync = require("./utils/wrapAsync");

app.use(express.static(path.join(__dirname, "public")));

const mongoose = require("mongoose");
const DB_URL = process.env.ATLASDB_URL;
const CLIENT_URL = process.env.CLIENT_URL;

main()
  .then(() => {
    console.log("Connection with DB is successful!");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(DB_URL);
}

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", require("./routes/auth"));

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).json({ error: message });
});

app.listen(port, () => {
  console.log("App listening at port 8000");
});
