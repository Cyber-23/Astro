const experss = require("express");
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const db = require("./config/database");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config({ path: "backend/config/config.env" });
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/errorMiddleware");



const app = experss();
app.use(experss.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(cookieParser());

app.use(cors("origin", "*"));

app.get('/home',(req, res)=>{
  res.send("hii")
})


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/appointment", appointmentRoutes);



app.use(errorMiddleware);
module.exports = app;

