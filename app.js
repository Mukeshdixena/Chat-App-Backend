require('dotenv').config();
const express = require('express');
const path = require('path');

const sequelize = require('./src/util/database.js');

const userRouter = require('./src/router/userRouter');
const messageRouter = require('./src/router/messageRouter');
const chatGroupRouter = require('./src/router/chatGroupRouter');

const User = require('./src/models/user.js')
const ChatGroup = require('./src/models/ChatGroup.js')
const Message = require('./src/models/message.js')

const cors = require('cors');


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
app.use(express.static(path.join(__dirname, 'src/view')));


app.use(userRouter);
app.use(messageRouter);
app.use(chatGroupRouter);

User.hasMany(Message);
ChatGroup.hasMany(Message);

User.belongsToMany(ChatGroup, { through: 'UserChatGroup' });
ChatGroup.belongsToMany(User, { through: 'UserChatGroup' });



app.get("/test", (req, res) => {
    res.send("Hello, Express!");
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/view', 'index.html'));
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