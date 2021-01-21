const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../config/middleware/auth");
const db = require("../models");


router.get("/api", (req, res) => {
    res.send({ msg: "success" });
});

// register a new user
router.post("/register", async (req, res) => {
    try {
        let {
            email,
            password,
            passwordCheck,
            userName,
            firstName,
            lastName,
            idnumber
        } = req.body;
        // validation
        if (!email || !password || !passwordCheck)
            return res.status(400).json({ msg: "Not all fields have been entered" });

        if (password.length < 5)
            return res
                .status(400)
                .json({ msg: "Password needs to be at least 5 characters long" });

        if (password !== passwordCheck)
            return res
                .status(400)
                .json({ msg: "Enter the same password twice for verification" });

        const existingUser = await db.User.findOne({ where: { email: email, idnumber: idnumber } });

        if (existingUser)
            return res
                .status(400)
                .json({ msg: "Account with this email already exists" });

        if (!userName) userName = email;
        let newUser = await db.User.create({
            email,
            password,
            userName,
            firstName,
            lastName,
            idnumber
        });

        res.json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// login user
router.post("/login", async (req, res) => {
    try {
        const { email, password, idnumber } = req.body;

        if (!email || !password || !idnumber)
            return res.status(400).json({ msg: "Not all field have been entered" });

        const user = await db.User.findOne({ where: { email: email } });
        if (!user)
            return res
                .status(400)
                .json({ msg: "No account with this email has been registered" });
        const isMatch = await bcrypt.compareSync(password, user.password, () => {
            if (!isMatch)
                return res.status(400).json({ msg: "Invalid login credentials" });
        });
        const isMatchId = await bcrypt.compareSync(idnumber, user.idnumber, () => {
            if (!isMatchId)
                return res.status(400).json({ msg: "Invalid login credentials" });
        });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.json({
            token,
            user: {
                id: user.id,
                userName: user.userName,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                idnumber: user.idnumber
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

// delete user
router.delete("/delete", auth, async (req, res) => {
    try {
        const deletedUser = await db.User.destroy(req.user);
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.json(false);

        const user = await db.User.findByPk(verified.id);
        if (!user) return res.json(false);

        return res.json(true);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// get a user by id
router.get("/", auth, async (req, res) => {
    const user = await db.User.findByPk(req.user);
    res.json({ userName: user.userName, idnumber: user.idnumber });
});

router.get("/one/:id", (req, res) => {
    db.User.findOne({
        where: { idnumber: req.params.idnumber },
    })
        .then((user) => res.json(user))
        .catch((err) => res.send(err));
});

router.patch("/update", (req, res) => {
    db.User.update(
        {
            userName: req.body.userName,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        },
        { where: { id: req.body.UserId } }
    )
        .then(() => res.send("Success!"))
        .catch((err) => res.send(err));
});

// User Calendar

router.post("/usercalendar", (req, res) => {
    db.Month.create({
        day: req.body.day,
        month: req.body.month,
        year: req.body.year,
        title: req.body.title,
        UserIdnumber: req.body.UserIdnumber,
    }).then((resonse) => {
        console.log(resonse)
        res.send("Success")
    }).catch(err => res.send(err));
})

module.exports = router;
