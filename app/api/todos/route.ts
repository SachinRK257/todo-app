import db from "@/lib/db"; // importing database connection we created in lib/db.ts

// GET — fetch all todos from database
export async function GET() {
  const [rows] = await db.query("SELECT * FROM todos"); // get all rows from todos table
  return Response.json(rows); // send all todos to frontend
}

// POST — add new todo to database
export async function POST(req: Request) {
  const body = await req.json(); // read the todo text sent from frontend

  await db.query(
    "INSERT INTO todos (text) VALUES (?)", // add new row to todos table
    [body.text] // the todo text from frontend
  );

  // get the newly added todo to send back
  const [rows] = await db.query(
    "SELECT * FROM todos ORDER BY id DESC LIMIT 1" // get last inserted row
  );

  return Response.json(rows); // send new todo back to frontend
}

// PUT — update existing todo in database
export async function PUT(req: Request) {
  const body = await req.json(); // read id + new text from frontend

  await db.query(
    "UPDATE todos SET text = ? WHERE id = ?", // find the row by id and update its text
    [body.text, body.id] // new text and which id to update
  );

  return Response.json({ message: "Updated" }); // confirm success to frontend
}

// DELETE — remove todo from database
export async function DELETE(req: Request) {
  const body = await req.json(); // read which id to delete from frontend

  await db.query(
    "DELETE FROM todos WHERE id = ?", // find the row by id and delete it
    [body.id] // the id to delete
  );

  return Response.json({ message: "Deleted" }); // confirm success to frontend
}