const experss = require("express");
const router = experss.Router();

// const {  isAuthenticatedUser } = require("../middlewares/authMiddleware");
const {requestAppointment ,getAppointment,deleteAppointment,getAllAppointment,appointmentAction} = require("../controllers/appointmentcontroller")
router.post("/request", requestAppointment);
router.post("/action", appointmentAction);
router.get("/:user_id", getAppointment);
router.get("/all/appointment", getAllAppointment);
router.delete("/delete/:appointment_id", deleteAppointment);



module.exports = router;
