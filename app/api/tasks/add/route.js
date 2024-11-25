import connectDb from "@/lib/mongodb";
import mongoose from "mongoose";
import Task from '@/models/Task'; 


export async function POST(req) {
  const { title, date, time } = await req.json();

  if (!title || !date || !time) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
    });
  }

  try {
    await connectDb();

    const newTask = new Task({ title, date, time });
    await newTask.save();

    return new Response(JSON.stringify({ success: true, task: newTask }), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to add task" }),
      { status: 500 }
    );
  }
}
