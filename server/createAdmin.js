require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI);

async function createAdmin() {
  const hashedPassword = await bcrypt.hash("abuak19@", 10);

  await Admin.create({
    email: "abuakyt@gmail.com",
    password: hashedPassword,
  });

  console.log("Admin Created 🔥");
  process.exit();
}

createAdmin();