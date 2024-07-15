const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const sendToken = require("../utils/jwtToken");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
// const multer = require("multer");
const db = require("../config/database");
dotenv.config({ path: "backend/config/config.env" });



exports.requestAppointment = catchAsyncErrors(async (request, response, next) => {
    const { user_id, name, email, phone, message, appointment_type } = request.body;
    console.log(request.body);
  
    const checkSql = `SELECT * FROM appointments WHERE user_id = ? AND status = 'pending'`;
    const insertSql = `INSERT INTO appointments (user_id, name, email, phone, message, appointment_type) VALUES (?, ?, ?, ?, ?, ?)`;
  
    db.query(checkSql, [user_id], (err, result) => {
      if (err) {
        console.error("Error during appointment check:", err);
        return next(new ErrorHandler("Error during appointment check!", 500));
      }
  
      if (result.length > 0) {
        return response.status(400).json({ message: "Request already present" });
      } else {
        db.query(insertSql, [user_id, name, email, phone, message, appointment_type], (err, result) => {
          if (err) {
            console.error("Error during appointment request:", err);
            return next(new ErrorHandler("Error during appointment request!", 500));
          }
  
          if (result.affectedRows > 0) {
            response.status(200).json({ success: true, message: "Appointment request send successful" });
          } else {
            return response.status(400).json({ message: "Request could not be created" });
          }
        });
      }
    });
  });
  
exports.getAppointment = asyncHandler(async (req, res, next) => {
    const {user_id} = req.params;
    let sql = ` SELECT * FROM appointments WHERE user_id = ?`; 
    db.query(sql, [user_id], (err, result) => {
      if (err) {
        console.error("Error during retrieval:", err);
        return next(new ErrorHandler("Error during retrieval", 500));
      }
      res.status(200).json({ success: true, appointment: result });
    });
});

exports.getAllAppointment = asyncHandler(async (req, res, next) => {
  let sql = `SELECT appointments.*, users.* FROM appointments 
             INNER JOIN users ON appointments.user_id = users.user_id`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error during retrieval:", err);
      return next(new ErrorHandler("Error during retrieval", 500));
    }
    res.status(200).json({ success: true, allappointment: result });
  });
});
exports.deleteAppointment = asyncHandler(async (req, res, next) => {
  const {appointment_id} = req.params;
  if (!appointment_id) {
    return next(new ErrorHandler("appointment id (ID) is required", 400));
  }

  const sql = `DELETE FROM appointments WHERE appointment_id = ?`;

  db.query(sql, [appointment_id], (err, result) => {
    if (err) {
      console.error("Error during deletion:", err);
      return next(new ErrorHandler("Error during deletion", 500));
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ success: true, message: "Deletion successful" });
    } else {
      return next(
        new ErrorHandler("company not found or no changes applied", 404)
      );
    }
  });
});



exports.appointmentAction = catchAsyncErrors(async (request, response, next) => {
  const {id,action}=request.body
  const sql = `update appointments set status='${action}' WHERE appointment_id = ${id}`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error during appointment update:", err);
      return next(new ErrorHandler("Error during appointment update!", 500));
    }
  else {
        if (result.affectedRows > 0) {
          response.status(200).json({ success: true, message: "Appointment request update successful" });
        } else {
          return response.status(400).json({ message: "Request could not be updated" });
        }
    }
  });
});
