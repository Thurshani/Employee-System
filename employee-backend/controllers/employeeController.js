const Employee = require("../models/employee");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validate role (optional but recommended)
    const allowedRoles = ["admin", "employee"];
    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role specified." });
    }

    // Check for existing user
    const existing = await Employee.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // If no role provided, Mongoose default ('employee') will apply
    const employee = new Employee({ username, email, password, role });
    await employee.save();

    res.status(201).json({ 
      message: "Employee registered successfully", 
      employeeId: employee._id,
      role: employee.role,
    });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const isMatch = await employee.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        employeeId: employee._id,
        email: employee.email,
        username: employee.username,
        role: employee.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Signin successful",
      employeeId: employee._id,
      role: employee.role,
      username: employee.username,  // <-- Added username here
      token,
    });
    
  } catch (err) {
    res.status(500).json({ message: "Signin failed", error: err.message });
  }
};
