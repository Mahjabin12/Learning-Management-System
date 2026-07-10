import User from "../models/User.js";

const seedUsers = async () => {
  try {
    const defaultUsers = [
      {
        name: "Admin",
        email: "admin@lms.com",
        password: "123456",
        role: "admin",
      },
      {
        name: "Instructor",
        email: "ins@lms.com",
        password: "123456",
        role: "instructor",
      },
      {
        name: "Student User",
        email: "student@lms.com",
        password: "123456",
        role: "student",
      },
    ];

    for (const userData of defaultUsers) {
      const existingUser = await User.findOne({ email: userData.email });

      if (!existingUser) {
        await User.create(userData);
        console.log(`Seeded user: ${userData.email}`);
      }
    }
  } catch (error) {
    console.error(`Seed user error: ${error.message}`);
  }
};

export default seedUsers;