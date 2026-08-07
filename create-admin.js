const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: ".env.local" });

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);

  const AdminSchema = new mongoose.Schema({
    username: String,
    password: String,
  });

  const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

  const hashedPassword = await bcrypt.hash("0000", 10);

  await Admin.findOneAndUpdate(
    { username: "aman" },
    {
      username: "aman",
      password: hashedPassword,
    },
    {
      upsert: true,
      new: true,
    }
  );

  console.log("✅ Admin created successfully");

  await mongoose.disconnect();
}

main().catch(console.error);