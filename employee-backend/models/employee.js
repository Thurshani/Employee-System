const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');


const employeeSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "employee"],  // restrict to these values
      default: "employee",           // default role
      required: true,
    },
  },
  { timestamps: true }
);

// Hash password before saving
employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

// Match plain password with hashed
employeeSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
