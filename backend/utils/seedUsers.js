import User from "../models/User.js";

const seedUsers = async () => {
  try {
    const adminEmail = (
      process.env.ADMIN_EMAIL || "admin@lms.com"
    )
      .trim()
      .toLowerCase();

    const adminPassword =
      process.env.ADMIN_PASSWORD || "123456";

    const adminName =
      process.env.ADMIN_NAME || "Skillora Admin";

    let admin = await User.findOne({
      email: adminEmail,
    });

    if (!admin) {
      admin = await User.create({
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        role: "admin",
        status: "active",
      });

      console.log(
        `Admin account created: ${admin.email}`
      );

      return;
    }

    let isUpdated = false;

    if (admin.role !== "admin") {
      admin.role = "admin";
      isUpdated = true;
    }

    if (admin.status !== "active") {
      admin.status = "active";
      isUpdated = true;
    }

    if (admin.name !== adminName) {
      admin.name = adminName;
      isUpdated = true;
    }

    if (isUpdated) {
      await admin.save();

      console.log(
        `Admin account updated: ${admin.email}`
      );
    } else {
      console.log(
        `Admin account already exists: ${admin.email}`
      );
    }
  } catch (error) {
    console.error(
      `Admin seed error: ${error.message}`
    );

    throw error;
  }
};

export default seedUsers;