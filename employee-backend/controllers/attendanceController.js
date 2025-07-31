const Attendance = require("../models/attendance");

exports.createRecord = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["checkin", "checkout"].includes(status)) {
      return res.status(400).json({ message: "Invalid status, must be 'checkin' or 'checkout'." });
    }

    const attendance = new Attendance({
      username: req.user.username,
      email: req.user.email,
      status,
    });

    await attendance.save();
    res.status(201).json({ message: `${status} recorded successfully`, attendance });
  } catch (err) {
    res.status(500).json({ message: "Failed to record attendance", error: err.message });
  }
};

//  Only Admins can use this
exports.getAllRecords = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const records = await Attendance.find().sort({ time: -1 });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch records", error: err.message });
  }
};

// Employee can see their own logs
exports.getMyLogs = async (req, res) => {
  try {
    const records = await Attendance.find({ email: req.user.email }).sort({ time: -1 });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch your attendance logs", error: err.message });
  }
};
