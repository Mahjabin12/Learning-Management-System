import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import instructorRoutes from "./routes/instructorRoutes.js";
import seedUsers from "./utils/seedUsers.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();


const app = express();

app.use(
  cors({ 
    origin:"http://localhost:5173",
    credentials:true,
  })
);

app.use(express.json());



app.get("/", (req,res)=>{

  res.send(
    "Skillora LMS Backend API is running..."
  );

});



// AUTH ROUTES

app.use(
  "/api/auth",
  authRoutes
);

app.use(
"/api/instructor",
instructorRoutes
);

app.use(
"/api/categories",
categoryRoutes
);


// ADMIN ROUTES

app.use(
  "/api/admin",
  adminRoutes
);

const PORT = process.env.PORT || 5000;


const startServer = async()=>{

  try{

    await connectDB();

    await seedUsers();


    app.listen(PORT,()=>{

      console.log(
        `Server running on port ${PORT}`
      );

    });

  }
  catch(error){

    console.error(
      `Server startup failed: ${error.message}`
    );

    process.exit(1);

  }
};

startServer();