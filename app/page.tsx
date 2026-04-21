"use client"; // this tells Next.js that this file runs on browser (client side)


// importing react hooks for state and lifecycle
import { useEffect, useState } from "react";

// importing Todo type (structure of todo)
import { Todo } from "@/types/todo";

// importing all API functions from service file
import * as todoService from "@/services/todoService";


export default function Home() {

  // this stores what user types in input box
  const [text, setText] = useState("");

  // this stores all todos coming from backend
  const [todos, setTodos] = useState<Todo[]>([]);

  // this is used to show loading while fetching data
  const [loading, setLoading] = useState(false);


  // this function gets all todos from backend
  const loadTodos = async () => {
    try {
      setLoading(true); // start loading

      const data = await todoService.getTodos(); // call API
      setTodos(data); // store todos in state

    } catch (err) {
      console.error(err); // if error happens, show in console
    } finally {
      setLoading(false); // stop loading
    }
  };


  // this runs automatically when page loads first time
  useEffect(() => {
    loadTodos(); // call function to load todos
  }, []);


  // this function adds a new todo
  const handleAdd = async () => {

    // if input is empty, stop here
    if (!text.trim()) return;

    // send new todo to backend
    await todoService.addTodo(text);

    setText(""); // clear input box after adding

    loadTodos(); // refresh todo list
  };


  // this function deletes a todo
  const handleDelete = async (id: number) => {

    // send delete request with id
    await todoService.deleteTodo(id);

    loadTodos(); // refresh list after delete
  };


  // this function updates a todo
  const handleUpdate = async (id: number) => {

    // ask user for new text using popup
    const newText = prompt("Enter new text:");

    // if user cancels, stop
    if (!newText) return;

    // send updated data to backend
    await todoService.updateTodo(id, newText);

    loadTodos(); // refresh list after update
  };


  return (

    // main container (full screen + center + background color)
    <div className="min-h-screen flex flex-col items-center p-10 bg-gray-100 text-black">
      
      {/* heading */}
      <h1 className="text-3xl font-bold mb-6">Todo App</h1>


      {/* input box and add button */}
      <div className="flex gap-3 mb-6">

        {/* input field */}
        <input
          className="border p-3 rounded w-80"
          value={text} // bind input with state
          onChange={(e) => setText(e.target.value)} // update state on typing
          placeholder="Enter todo..."
        />

        {/* add button */}
        <button
          onClick={handleAdd} // call add function
          className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>

      </div>


      {/* todo list container */}
      <div className="w-full max-w-md space-y-4">

        {/* show loading text when fetching */}
        {loading && <p className="text-gray-500">Loading...</p>}


        {/* loop through all todos */}
        {todos.map((todo) => (

          <div
            key={todo.id} // unique id for each todo
            className="flex justify-between items-center bg-white p-4 rounded shadow"
          >

            {/* show todo text */}
            <span>{todo.text}</span>


            {/* buttons section */}
            <div className="flex gap-3">

              {/* update button */}
              <button
                onClick={() => handleUpdate(todo.id)} // update this todo
                className="bg-yellow-400 px-4 py-1 rounded hover:bg-yellow-500"
              >
                Update
              </button>


              {/* delete button */}
              <button
                onClick={() => handleDelete(todo.id)} // delete this todo
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}