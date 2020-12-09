const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const session = require("express-session");
const db = require("./models");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("./client"));


db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
});