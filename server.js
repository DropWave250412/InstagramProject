const express = require("express");
const createDB = require("./database");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const session = require("express-session");
const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.use(express.static(__dirname));
app.use(express.json());

app.use(session({
    secret: "mySuperSecretKey123",
    resave: false,
    saveUninitialized: false,

    cookie: {
        expires: false
    }
}));

let db;
const ADMIN_USERNAME = "Aditya";
const ADMIN_PASSWORD = "2";

// save user
app.post("/save-user", async (req, res) => {
    const { username, password } = req.body;

    await db.run(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, password]
    );

    io.emit("newUser");

    res.json({ success: true });
});

// get users
app.get("/users", async (req, res) => {
    const users = await db.all(
        "SELECT * FROM users ORDER BY id DESC"
    );

    res.json(users);
});

app.delete("/delete-user/:id", async (req, res) => {

    const id = req.params.id;

    await db.run(
        "DELETE FROM users WHERE id = ?",
        [id]
    );

    io.emit("newUser");

    res.json({
        success: true
    });

});

app.post("/admin-login", (req, res) => {

    const { username, password } = req.body;

    if (
        username === ADMIN_USERNAME &&
        password === ADMIN_PASSWORD
    ) {

        req.session.adminLoggedIn = true;

        return res.json({
            success: true
        });
    }

    res.json({
        success: false
    });

});

// admin page
app.get("/admin", (req, res) => {

    if (!req.session.adminLoggedIn) {

        return res.redirect("/admin-login.html");

    }

    res.sendFile(
        path.join(__dirname, "data.html")
    );

});

app.get("/logout", (req, res) => {

    req.session.destroy(() => {

        res.redirect("/admin-login.html");

    });

});
async function startServer() {
    db = await createDB();

   const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
}

startServer();