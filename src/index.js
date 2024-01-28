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
    origin: "http://tocvietxuanloc.com",
    //origin: "http://localhost:3000",
    //origin: "https://8a1f-2402-800-639d-9dc9-f0b0-5ee1-48df-a20f.ngrok-free.app",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
routes(app);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
