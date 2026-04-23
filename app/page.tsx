"use client";  //tells next.js this code runs in browser

import { useEffect, useState } from "react";
//useState=store data
//useEffect=runs code automatically(like on page loading)

import * as todoService from "@/services/todoService";
// import all API functions (get, add, delete, update) from service file

export default function Home(){
// main component of page (UI starts here)

  const [text, setText] = useState("");  
  // text = current input value, setText = function to update it

  const [todos, setTodos] = useState<any[]>([]);  
  // todos = array to store all tasks from backend, setTodos = update list
  //useState=storedata
  //<any[]> = array of anything
  //[] = initial value (empty array)

  // load todos
  const loadTodos = async () => {   //async()=> = this function can handle API calls
    const data = await todoService.getTodos();  //await=wait until API response comes, todoService.getTodos=calling API function
    // fetch all todos from backend API

    setTodos(data);  //Put the data inside todos
    // store
  };

  useEffect(() => {  //useEffect=run code automatically when page opens
    loadTodos();  //loadTodos()=get all tasks from backend
  }, []); //[]=run only once(when page loads)

  // add
  const handleAdd = async () => {   //handleAdd=this function runs when Add button is clicked
    if(!text.trim()) return;   //!text=not input value, .trim=remove extra space

    await todoService.addTodo(text);  //.addTodo=add a new task
    

    setText("");  // clear input box after adding task
    loadTodos();  // refresh UI with updated data
  };

  // delete a task
  const handleDelete = async (todo: string) => {   
    await todoService.deleteTodo(todo);  
    // send selected task text to backend to delete it from database
    
    loadTodos();   // reload updated task list after delete
  };

  // update a task
  const handleUpdate = async (todo: string) => {
    const newText = prompt("Enter new task");  // ask user for new value
    if(!newText) return;  //stop if user cancels or empty

    await todoService.updateTodo(todo, newText);  //use types new value in popup box

    loadTodos();
  };

  return(
    
    <div className="min-h-screen bg-white flex flex-col items-center p-10">
      

      {/* Heading section */}
      <h1 className="text-4xl text-black font-bold mb-8">  Todo App </h1>
      
      
      {/* input section */}
      <div className="flex gap-3 mb-8 text-black">
        
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}  // store input
          placeholder="Enter todo..."
          className="border border-black p-3 w-80 rounded outline-none placeholder-gray-400"/>
        

        <button
          onClick={handleAdd}    // button to add task (calls handleAdd function on click)
          className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"> Add </button>
      
      </div>


      {/* list */}
      <ul className="w-full max-w-xl">
        
        {todos.map((todo, index) => (    // loop through all todos and display each task

          <li
            key={index}   //unique number for each task
            className="bg-white flex justify-between items-center p-4 mb-4 rounded shadow">
          
          
            <span className="text-black">
              {todo.text}    
            </span>
            {/* display task text from todo object */}

            <div className="flex gap-3">
              {/* buttons side by side */}

              <button
                onClick={() => handleUpdate(todo.text)}
                className="bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-500"> Update </button>
              {/* update button (calls handleUpdate with task text) */}

              <button
                onClick={() => handleDelete(todo.text)}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"> Delete </button>
              {/* delete button (calls handleDelete with task text) */}

            </div>

          </li>

        ))}
      </ul>

    </div>
  );
}