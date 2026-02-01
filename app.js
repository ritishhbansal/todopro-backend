// Core Module
const path = require('path');

// External Module
const express = require('express');
const DB_Path = "mongodb+srv://ritishhbansal:ritishbansal@airbnb.j0tresv.mongodb.net/?appName=Airbnb";
const session = require("express-session");
const Mongodbstore = require("connect-mongodb-session")(session);


//Local Module
const rootDir = require("./utils/pathUtil");
const {mongoConnect} = require('./utils/databaseUtil');
const taskRouter = require("./routers/taskRouter"); 
const authRouter = require('./routers/authRouter');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new Mongodbstore({
    uri: DB_Path,
    databaseName: 'todo',
    collection:'sessions'
})

app.use(session ({
    secret: "todolist",
    resave: false,
    saveUninitialized: false,
    store: store,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/api', taskRouter);
app.use('/api', authRouter);


const PORT = 3608;
mongoConnect(() => {
    app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
});
})