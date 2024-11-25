import connectDb from "@/lib/mongodb";
import Task from "@/models/Task";

export async function DELETE(req) {
  const { id } = await req.json();

  if (!id) {
    return new Response(
      JSON.stringify({ error: "Task ID is required" }),
      { status: 400 }
    );
  }

  try {
    await connectDb();

    await Task.findByIdAndDelete(id);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to delete task" }),
      { status: 500 }
    );
  }
}
