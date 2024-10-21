const express = require("express")
const router = express.Router();

const authenticate = require("../middlewares/authMiddleware");
const {newDevice, updateStatus, getDevices, removeDevice} = require("../controllers/deviceController");

router.post("/new", authenticate, newDevice);
router.get("/retrieveall", authenticate, getDevices);
router.put("/update/:id", authenticate, updateStatus);
router.delete("/delete/:id", authenticate, removeDevice);

module.exports = router;