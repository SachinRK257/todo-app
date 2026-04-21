"use client";
import { useEffect, useState } from "react";

type Todo = {
  id: number;
  text: string;
};

export default function Home() {
  const [text, setText] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  // Fetch todos
  const getTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  // Add todo
  const addTodo = async () => {
    if (!text.trim()) return;

    await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    setText("");
    getTodos();
  };

  // Delete todo
  const deleteTodo = async (id: number) => {
    await fetch("/api/todos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    getTodos();
  };

  // Update todo
  const updateTodo = async (id: number) => {
    const newText = prompt("Enter new text:");
    if (!newText) return;

    await fetch("/api/todos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, text: newText }),
    });

    getTodos();
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-10 bg-gray-100 text-black">
      <h1 className="text-3xl font-bold mb-6">Todo App</h1>

      {/* Input */}
      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 rounded w-64 text-black"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter todo..."
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* List */}
      <ul className="w-full max-w-md">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-white p-3 mb-2 rounded shadow"
          >
            <span className="text-black">{todo.text}</span>

            <div className="flex gap-2">
              <button
                onClick={() => updateTodo(todo.id)}
                className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
              >
                Update
              </button>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}