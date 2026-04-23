import db from "@/lib/db";

export const dynamic = "force-dynamic";    // always fetch fresh data, disable caching

// GET all todos from database
export async function GET() {
  const [rows] = await db.query("SELECT * FROM todos");   // run SQL query to get all tasks
  return Response.json(rows);    // send tasks to frontend in JSON format
}

// POST API to add new todo
export async function POST(req: Request) {
  const body = await req.json();   // get data sent from frontend

  await db.query(
    "INSERT INTO todos (text) VALUES (?)",
    [body.text]    // insert new task into database
  );

  return Response.json({ message: "Added" });   // send success response
}

// PUT API to update todo
export async function PUT(req: Request) {
  const body = await req.json();    // get old and new text from frontend

  await db.query(
    "UPDATE todos SET text = ? WHERE text = ?",
    [body.newText, body.oldText]
  );    // update task in database

  return Response.json({ message: "Updated" });     // send success response
}  

// DELETE API to remove todo
export async function DELETE(req: Request) {
  const body = await req.json();   // get text from frontend

  await db.query(
    "DELETE FROM todos WHERE text = ?",
    [body.text]     
  );    // delete task from database

  return Response.json({ message: "Deleted" });   // send success response
}