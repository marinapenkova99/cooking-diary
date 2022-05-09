const express = require("express");
const admin = require("firebase-admin");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const userRouter = require("./routes/user");
const recipesRouter = require("./routes/recipes");
const newsletterRouter = require("./routes/newsletter");
const categoriesRouter = require("./routes/category");
const commentsRouter = require("./routes/comments");
const contactsRouter = require("./routes/contacts");
const bodyParser = require("body-parser");
const app = express();

const firebaseConfig = {
  apiKey: "AIzaSyCRafQGcJNVbPONqct5uuNooj6XYxhWpxQ",
  authDomain: "cookingdiary-a39d8.firebaseapp.com",
  projectId: "cookingdiary-a39d8",
  storageBucket: "cookingdiary-a39d8.appspot.com",
  messagingSenderId: "689295795268",
  appId: "1:689295795268:web:ef977a9b98a23341f88811",
  measurementId: "G-LC2L7CYS3F",
};
// view engine setup
app.set("views", path.join(__dirname, "views"));

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.use("/", userRouter);
app.use("/", recipesRouter);
app.use("/", categoriesRouter);
app.use("/", newsletterRouter);
app.use("/", commentsRouter);
app.use("/", contactsRouter);

admin.initializeApp(firebaseConfig);

module.exports = app;
