require("./database/index.js");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("errorhandler");
const cookieParser = require("cookie-parser");

const env = require(`./environment/${process.env.NODE_ENV}.js`);
const indexRouter = require("./routes/index.js");
const port = env.port;

const app = express();

exports.app = app;

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
};

// Middlewares
app.use(cookieParser());
app.use("/", morgan("short"));
app.use("/", express.json());
app.use("/", express.urlencoded({ extended: true }));
app.use("/", cors(corsOptions));
app.use(errorHandler());
app.use("/", indexRouter);

app.listen(port);