require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const routes = require("./routes");
const db = require("./config/db");

// Connect to DB
db.connect();

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
routes(app);

const PORT = 5000;

// Serve frontend
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../frontend/build")));

    app.get("*", (req, res) =>
        res.sendFile(
            path.resolve(__dirname, "../../", "frontend", "build", "index.html")
        )
    );
} else {
    app.get("/", (req, res) => res.send("Please set to production"));
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
