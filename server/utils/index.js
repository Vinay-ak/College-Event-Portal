import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("DB connection established");
  } catch (error) {
    console.log("DB Error: " + error);
    throw error; // Rethrow the error to be caught by the caller if needed
  }
};
export default dbConnection;

export const createJWT = (res, userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set secure and sameSite attributes based on environment
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    };

    res.cookie("token", token, cookieOptions);
  } catch (error) {
    console.log("Error creating JWT:", error);
    throw error; // Rethrow the error to be caught by the caller if needed
  }
};
