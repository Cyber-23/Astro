const experss = require("express");
const router = experss.Router();

// const {  isAuthenticatedUser } = require("../middlewares/authMiddleware");
const {signup,signin,signout,getAllUser ,deleteUser} = require("../controllers/authcontroller")
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);
router.get("/all/user",getAllUser);
router.delete("/delete/:user_id", deleteUser);

module.exports = router;
