const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require("connect-mongo");

const tasksRouter = require('./routes/tasksRouter');
const authRouter = require('./routes/authRouter');


const app = express();

// ********* CORS SETUP *************
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    );
    next();
  });

  app.use(
    cors({
      credentials: true,
      allowedHeaders: ["Origin, X-Requested-With, Content-Type, Accept"],
    })
  );
  app.set("trust proxy", 1);
// ********* CORS SETUP *************


dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const sessionStore = new MongoStore({
  mongoUrl: process.env.MONGO_DB,
  collection: "sessions",
});

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SECRET,
  store: sessionStore,
  unset: "destroy",
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    secure: process.env.NODE_ENV !== "development",
    sameSite: true
  }
}));

// if (process.env.NODE_ENV !== "development") {
//   options.cookie.sameSite = "none";
// }

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport-config");

//app.use(express.static("public"));
//app.use('/uploads', express.static('./uploads')); //for multer uploads

app.use('/', express.static('./public'));
app.use('/tasks', tasksRouter);
app.use('/users', authRouter);


const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_DB, {useNewUrlParser: true})
    .then(() => {
        console.log('Database connection successful')
        app.listen(port, "0.0.0.0", (err) =>{
            if(err) console.log("Server could not be started" + err);
            else console.log(`Server listening at port ${port}...."`)
        })
    })
    .catch(err => {
        console.error('Database connection error')
    });
