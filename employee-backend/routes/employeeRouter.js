const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

// POST /api/employee/register
router.post("/register", employeeController.register);

// POST /api/employee/signin
router.post("/signin", employeeController.signin);

module.exports = router;
