const express = require('express');

const sequelize = require('./src/util/database.js');

const userRouter = require('./src/router/userRouter');

const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.use(userRouter);

app.get("/", (req, res) => {
    res.send("Hello, Express!");
});

sequelize
    // .sync({ force: true })
    .sync()
    .then(result => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error(err));