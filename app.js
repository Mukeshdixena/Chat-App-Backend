const express = require('express');

const sequelize = require('./src/util/database.js');

const userRouter = require('./src/router/userRouter');
const messageRouter = require('./src/router/messageRouter');

const user = require('./src/models/user.js')
const massage = require('./src/models/message.js')

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
app.use(messageRouter);

user.hasMany(massage);
massage.belongsTo(user);


app.get("/", (req, res) => {
    res.send("Hello, Express!");
});

sequelize
    .sync({ force: true })
    // .sync()
    .then(result => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error(err));