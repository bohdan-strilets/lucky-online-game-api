const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
// const { corsOptions } = require("./options");

require("dotenv").config();
const app = express();

const {
  authRouter,
  userRouter,
  betsRouter,
  levelRouter,
  statisticsRouter,
  storeRouter,
} = require("./routes");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(
  cors({
    origin: "https://bohdan-strilets.github.io/lucky-online-game",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static("./public"));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/bets", betsRouter);
app.use("/api/v1/level", levelRouter);
app.use("/api/v1/statistics", statisticsRouter);
app.use("/api/v1/store", storeRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found." });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
