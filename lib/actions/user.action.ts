"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";

export async function getUserById(params: any) {
  try {
    // connect to DB
    connectToDatabase();

    // Get the user by id
    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    // Return the user
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
