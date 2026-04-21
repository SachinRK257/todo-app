let todos: { id: number; text: string }[] = [];

export async function GET() {
  return Response.json(todos);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newTodo = {
    id: Date.now(),
    text: body.text,
  };

  todos.push(newTodo);
  return Response.json(newTodo);
}

export async function PUT(req: Request) {
  const body = await req.json();

  todos = todos.map((t) =>
    t.id === body.id ? { ...t, text: body.text } : t
  );

  return Response.json({ message: "Updated" });
}

export async function DELETE(req: Request) {
  const body = await req.json();

  todos = todos.filter((t) => t.id !== body.id);

  return Response.json({ message: "Deleted" });
}