"use client"; // tells next.js this file runs in the browser

// importing react hooks
import { useEffect, useState } from "react";

// importing todo type
import { Todo } from "@/types/todo";

// importing all api functions
import * as todoService from "@/services/todoService";

export default function Home() {

  // stores what user types in input box
  const [text, setText] = useState("");

  // stores the id user types in search box
  const [searchId, setSearchId] = useState("");

  // stores the todo found by id search
  const [foundTodo, setFoundTodo] = useState<Todo | null>(null);

  // stores all todos from backend
  const [todos, setTodos] = useState<Todo[]>([]);

  // shows loading animation while fetching
  const [loading, setLoading] = useState(false);

  // tracks which todo is being deleted
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // gets all todos from backend
  const loadTodos = async () => {
    try {
      setLoading(true); // start loading
      const data = await todoService.getTodos(); // call api
      setTodos(data); // save to state
    } catch (err) {
      console.error(err); // show error in console
    } finally {
      setLoading(false); // stop loading
    }
  };

  // runs once when page loads
  useEffect(() => {
    loadTodos();
  }, []);

  // adds a new todo
  const handleAdd = async () => {
    if (!text.trim()) return; // stop if empty
    await todoService.addTodo(text); // send to backend
    setText(""); // clear input
    loadTodos(); // refresh list
  };

  // deletes a todo by id
  const handleDelete = async (id: number) => {
    setDeletingId(id); // mark as deleting
    await todoService.deleteTodo(id); // send to backend
    if (foundTodo?.id === id) setFoundTodo(null); // clear search if deleted
    setDeletingId(null); // clear deleting state
    loadTodos(); // refresh list
  };

  // updates a todo by id
  const handleUpdate = async (id: number) => {
    const newText = prompt("Enter new text:"); // ask for new text
    if (!newText) return; // stop if cancelled
    await todoService.updateTodo(id, newText); // send to backend
    loadTodos(); // refresh list
  };

  // searches todo by id number
  const handleSearchById = () => {
    if (!searchId.trim()) return; // stop if empty
    const result = todos.find((todo) => todo.id === Number(searchId)); // find matching todo
    if (result) {
      setFoundTodo(result); // save found todo
    } else {
      setFoundTodo(null); // clear if not found
      alert("no todo found with this id"); // tell user
    }
  };

  // clears the search result
  const handleClearSearch = () => {
    setSearchId(""); // clear id input
    setFoundTodo(null); // clear result
  };

  return (

    // main wrapper — dark background full screen
    <div className="min-h-screen bg-gray-950 text-gray-100 px-5 py-12">

      {/* container — centered with max width */}
      <div className="max-w-2xl mx-auto">

        {/* ── HEADER ── */}
        <div className="flex items-center justify-between mb-12">

          {/* logo and title */}
          <div className="flex items-center gap-3">

            {/* logo icon */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/30">
              ✓
            </div>

            {/* app name */}
            <div>
              <p className="text-xl font-bold text-white tracking-tight">TaskFlow</p>
              <p className="text-xs text-gray-500 mt-0.5">Manage your tasks efficiently</p>
            </div>

          </div>

          {/* task count badge */}
          <div className="bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold px-4 py-1.5 rounded-full">
            {todos.length} task{todos.length !== 1 ? "s" : ""}
          </div>

        </div>

        {/* ── ADD TASK CARD ── */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-7 mb-4">

          {/* card label */}
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">
            New Task
          </p>

          {/* input and button row */}
          <div className="flex gap-3">

            {/* text input */}
            <input
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-100 placeholder-gray-600 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 transition-all"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()} // press enter to add
              placeholder="What needs to be done?"
            />

            {/* add button */}
            <button
              onClick={handleAdd}
              className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30 transition-all whitespace-nowrap"
            >
              + Add Task
            </button>

          </div>
        </div>

        {/* ── SEARCH BY ID CARD ── */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-7 mb-4">

          {/* card label */}
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">
            Search by ID
          </p>

          {/* search row */}
          <div className="flex gap-3">

            {/* id input */}
            <input
              className="w-36 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-100 placeholder-gray-600 outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 transition-all font-mono"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearchById()} // press enter to search
              placeholder="Enter ID..."
              type="number"
            />

            {/* search button */}
            <button
              onClick={handleSearchById}
              className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold text-sm px-5 py-3 rounded-xl hover:bg-emerald-500/25 hover:-translate-y-0.5 transition-all"
            >
              🔍 Search
            </button>

            {/* clear button — only shows when result found */}
            {foundTodo && (
              <button
                onClick={handleClearSearch}
                className="bg-white/5 border border-white/10 text-gray-400 font-medium text-sm px-4 py-3 rounded-xl hover:bg-white/10 transition-all"
              >
                Clear
              </button>
            )}

          </div>
        </div>

        {/* ── FOUND TODO RESULT ── */}
        {foundTodo && (
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl px-6 py-5 mb-4 flex items-center justify-between gap-3">

            {/* found info */}
            <div>
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                ✓ Result Found
              </p>
              <div className="flex items-center gap-2 text-gray-100 text-sm">
                <span className="font-mono text-xs text-emerald-400">#{foundTodo.id}</span>
                {foundTodo.text}
              </div>
            </div>

            {/* action buttons */}
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => handleUpdate(foundTodo.id)}
                className="bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-semibold px-4 py-2 rounded-lg hover:bg-amber-500/20 hover:-translate-y-0.5 transition-all"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(foundTodo.id)}
                className="bg-red-500/10 border border-red-500/25 text-red-400 text-xs font-semibold px-4 py-2 rounded-lg hover:bg-red-500/20 hover:-translate-y-0.5 transition-all"
              >
                Delete
              </button>
            </div>

          </div>
        )}

        {/* ── ALL TASKS LIST ── */}
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">
          All Tasks
        </p>

        {/* loading dots */}
        {loading ? (
          <div className="flex gap-2 justify-center py-10">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>

        ) : todos.length === 0 ? (

          // empty state
          <div className="text-center py-16">
            <p className="text-4xl mb-3 opacity-40">📋</p>
            <p className="text-sm text-gray-500">no tasks yet — add one above!</p>
          </div>

        ) : (

          // todo list
          todos.map((todo) => (
            <div
              key={todo.id} // unique key for each item
              className="bg-white/[0.04] border border-white/[0.07] rounded-2xl px-5 py-4 mb-2 flex items-center justify-between gap-3 hover:bg-white/[0.07] hover:border-white/[0.12] hover:translate-x-0.5 transition-all"
              style={{ opacity: deletingId === todo.id ? 0.4 : 1 }} // fade when deleting
            >
              {/* left side — id and text */}
              <div className="flex items-center gap-3 flex-1 min-w-0">

                {/* id badge */}
                <span className="font-mono text-xs font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-md shrink-0">
                  #{todo.id}
                </span>

                {/* todo text */}
                <span className="text-sm text-gray-300 truncate">{todo.text}</span>

              </div>

              {/* right side — buttons */}
              <div className="flex gap-2 shrink-0">

                {/* edit button */}
                <button
                  onClick={() => handleUpdate(todo.id)}
                  className="bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-semibold px-3.5 py-1.5 rounded-lg hover:bg-amber-500/20 hover:-translate-y-0.5 transition-all"
                >
                  Edit
                </button>

                {/* delete button */}
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="bg-red-500/10 border border-red-500/25 text-red-400 text-xs font-semibold px-3.5 py-1.5 rounded-lg hover:bg-red-500/20 hover:-translate-y-0.5 transition-all"
                >
                  Delete
                </button>

              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}