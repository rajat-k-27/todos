import connectDb from "@/lib/mongodb";
import mongoose from "mongoose";
import Task from '@/models/Task' 


export async function GET() {
  try {
    await connectDb();
    const tasks = await Task.find({});
    return new Response(JSON.stringify({ success: true, tasks }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch tasks" }), {
      status: 500,
    });
  }
}
