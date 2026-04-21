// temporary database — just an array stored in memory
// note: data will clear when server restarts
let todos: { id: number; text: string }[] = [];

// GET — returns all todos to the frontend
export async function GET() {
  return Response.json(todos); // send the full list
}

// POST — adds a new todo
export async function POST(req: Request) {
  const body = await req.json(); // read the data sent from frontend

  const newTodo = {
    id: Date.now(), // unique id using current timestamp
    text: body.text, // the todo text from frontend
  };

  todos.push(newTodo); // add to our array
  return Response.json(newTodo); // send back the new todo
}

// PUT — updates an existing todo
export async function PUT(req: Request) {
  const body = await req.json(); // read id + new text from frontend

  todos = todos.map((t) =>
    t.id === body.id // find the matching todo
      ? { ...t, text: body.text } // replace its text
      : t // leave others unchanged
  );

  return Response.json({ message: "Updated" }); // confirm success
}

// DELETE — removes a todo
export async function DELETE(req: Request) {
  const body = await req.json(); // read which id to delete

  todos = todos.filter((t) => t.id !== body.id); // remove matching todo

  return Response.json({ message: "Deleted" }); // confirm success
}