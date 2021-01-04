const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const db = require("./models");

// Declare auth
const cors = require("cors");
const passport = require("passport");
// Hidden Variebles
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// Declare Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
const userRoutes = require("./routes/user_routes");
app.use("/users", userRoutes);


// Deploy to Heroku
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "client", "build", "index.html")
        );
    });
}

db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
});