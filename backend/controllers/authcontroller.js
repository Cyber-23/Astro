const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const sendToken = require("../utils/jwtToken");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
// const multer = require("multer");
const db = require("../config/database");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
dotenv.config({ path: "backend/config/config.env" });


exports.signup = catchAsyncErrors(async (request, response, next) => {
  const { name,phone,address,country,pincode,state,city,email,password } = request.body;
  console.log(request.body)

  const sql = `INSERT INTO users (name,phone,address,country,pincode,state,city,email,password) VALUES (?, ?, ?, ?,?, ?, ?, ?,?)`;
 
  db.query(sql, [ name,phone,address,country,pincode,state,city,email,password], (err, result) => {
    if (err) {
      console.error("Error during signup:", err);
      return next(new ErrorHandler("Error during signup!", 500));
    }
    if (result.affectedRows > 0) {
      const user = { id: result.insertId, email, name, phone };
      sendToken(user, 201, response);
    } else {
      return response.status(400).json({ message: "User could not be created" });
    }
  });
});

exports.signin = catchAsyncErrors(async (request, response, next) => {
  const { email, password } = request.body;

  const table = "users";
  const sql = `SELECT * FROM ${table} WHERE email=? AND password=?;`;

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error("Error during login:", err);
      return next(new ErrorHandler("Error during login !", 500));
    }
    if (result.length > 0) {
      const user = result[0];
      sendToken(user, 201, response);
    } else {
      return response
        .status(404)
        .json({ message: "User not found with provided credentials" });
    }
  });
});

exports.signout = catchAsyncErrors(async (request, response, next) => {
  console.log("logout")
  response.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  response.status(200).json({
    success: true,
    message: "Logout successfully !",
  });
});

exports.getAllUser = asyncHandler(async (req, res, next) => {
  let sql = ` SELECT * FROM users where role="user"`; 
  db.query(sql,(err, result) => {
    if (err) {
      console.error("Error during retrieval:", err);
      return next(new ErrorHandler("Error during retrieval", 500));
    }
    res.status(200).json({ success: true, alluser: result });
  });
});
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const {user_id} = req.params;
  if (!user_id) {
    return next(new ErrorHandler("appointment id (ID) is required", 400));
  }

  const sql = `DELETE FROM users WHERE user_id = ?`;

  db.query(sql, [user_id], (err, result) => {
    if (err) {
      console.error("Error during deletion:", err);
      return next(new ErrorHandler("Error during deletion", 500));
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ success: true, message: "Deletion successful" });
    } else {
      return next(
        new ErrorHandler("user not found or no changes applied", 404)
      );
    }
  });
});