const express =  require( "express");
// const  { protectRoute } = require( "../middleware/auth.middleware");
const { getUsersForSidebar, getMessages, sendMessages } =  require( "../controllers/message.controller");

const router = express.Router();

router.get("/users", getUsersForSidebar);
router.get("/:id", getMessages);

router.post("/send/:id", sendMessages);

module.exports = router;