import connectDb from "@/lib/mongodb";
import mongoose from "mongoose";
import Task from '@/models/Task'; 


export async function PATCH(req) {
  const { id, completed } = await req.json();

  if (!id || typeof completed !== "boolean") {
    return new Response(
      JSON.stringify({ error: "Invalid task data" }),
      { status: 400 }
    );
  }

  try {
    await connectDb();
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { completed },
      { new: true }
    );

    return new Response(JSON.stringify({ success: true, task: updatedTask }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to update task" }),
      { status: 500 }
    );
  }
}
