const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");
const { authenticateUser } = require("../middleware/auth");


// POST /api/attendance - create checkin or checkout record
router.post("/log", authenticateUser, attendanceController.createRecord);

// GET /api/attendance - list all attendance records (optional: add filters later)
router.get("/logsAll", authenticateUser, attendanceController.getAllRecords);

// Employee: view their own logs
router.get("/employeeLogs", authenticateUser, attendanceController.getMyLogs);

module.exports = router;
