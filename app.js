const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { CLIENT_URL } = process.env;
require("dotenv").config();
const app = express();

const { authRouter } = require("./routes");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.static("/public"));

app.use("/api/v1/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found." });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
