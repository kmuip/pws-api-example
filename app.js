const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const logsRoutes = require("./routes/logs");
const containersRoutes = require("./routes/containers");
const ousRoutes = require("./routes/ous");

app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    limit: "150mb",
    parameterLimit: 100000,
    extended: false,
  })
);
app.use(bodyParser.json({ limit: "150mb" }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/logs", logsRoutes);
app.use("/containers", containersRoutes);
app.use("/ous", ousRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
