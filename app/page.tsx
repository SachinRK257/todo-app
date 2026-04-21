
"use client";

// importing react hooks for state and lifecycle
import { useEffect, useState } from "react";

// this is what a todo looks like
type Todo = {
  id: number; // unique id for each todo
  text: string; // the todo message
};

export default function Home() {

  // stores what user is typing right now
  const [text, setText] = useState<string>("");

  // stores all the todos shown on screen
  const [todos, setTodos] = useState<Todo[]>([]);

  // gets all todos from backend and shows on screen
  const getTodos = async () => {
    const res = await fetch("/api/todos"); // calling backend api
    const data = await res.json(); // converting reply to js object
    setTodos(data); // updating the screen
  };

  // runs once automatically when page loads
  useEffect(() => {
    getTodos();
  }, []);

  // adds a new todo when user clicks add button
  const addTodo = async () => {
    if (!text.trim()) return; // stop if input is empty

    await fetch("/api/todos", {
      method: "POST", // post means we are adding data
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }), // sending the todo text to backend
    });

    setText(""); // clear the input box
    getTodos(); // refresh the list
  };

  // removes a todo when user clicks delete
  const deleteTodo = async (id: number) => {
    await fetch("/api/todos", {
      method: "DELETE", // delete means we are removing data
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }), // sending which todo to delete
    });

    getTodos(); // refresh the list
  };

  // updates a todo when user clicks update
  const updateTodo = async (id: number) => {
    const newText = prompt("Enter new text:"); // browser popup for new text
    if (!newText) return; // stop if user cancels

    await fetch("/api/todos", {
      method: "PUT", // put means we are updating data
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, text: newText }), // sending id + new text
    });

    getTodos(); // refresh the list
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-10 bg-gray-100 text-black">
      <h1 className="text-3xl font-bold mb-6">Todo App</h1>

      {/* input box and add button */}
      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 rounded w-64 text-black"
          value={text} // shows current typed value
          onChange={(e) => setText(e.target.value)} // updates on every keystroke
          placeholder="Enter todo..."
        />
        <button
          onClick={addTodo} // calls addTodo when clicked
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* list of all todos */}
      <ul className="w-full max-w-md">
        {todos.map((todo) => ( // loop through each todo
          <li
            key={todo.id} // unique key for each item
            className="flex justify-between items-center bg-white p-3 mb-2 rounded shadow"
          >
            <span className="text-black">{todo.text}</span>

            <div className="flex gap-2">
              <button
                onClick={() => updateTodo(todo.id)} // update this todo
                className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
              >
                Update
              </button>

              <button
                onClick={() => deleteTodo(todo.id)} // delete this todo
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