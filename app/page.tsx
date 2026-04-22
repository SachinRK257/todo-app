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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: #0f0f13;
          min-height: 100vh;
          color: #e8e8f0;
        }

        .app-wrapper {
          min-height: 100vh;
          background: #0f0f13;
          background-image:
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.15) 0%, transparent 70%),
            radial-gradient(ellipse 40% 30% at 80% 80%, rgba(236,72,153,0.06) 0%, transparent 60%);
          padding: 48px 20px 80px;
        }

        .container { max-width: 680px; margin: 0 auto; }

        /* header */
        .header {
          margin-bottom: 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo-area { display: flex; align-items: center; gap: 12px; }

        .logo-icon {
          width: 40px; height: 40px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; color: white; font-weight: 700;
          box-shadow: 0 4px 20px rgba(99,102,241,0.4);
        }

        .app-title { font-size: 22px; font-weight: 700; color: #f0f0fa; letter-spacing: -0.3px; }
        .app-subtitle { font-size: 12px; color: #6b6b8a; margin-top: 1px; }

        .count-badge {
          background: rgba(99,102,241,0.15);
          border: 1px solid rgba(99,102,241,0.25);
          color: #a5b4fc;
          font-size: 12px; font-weight: 600;
          padding: 6px 14px; border-radius: 20px;
          font-family: 'DM Mono', monospace;
        }

        /* card */
        .card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px; padding: 28px;
          margin-bottom: 16px;
        }

        .card-label {
          font-size: 11px; font-weight: 600;
          color: #6366f1;
          text-transform: uppercase; letter-spacing: 1.2px;
          margin-bottom: 14px;
        }

        /* add input row */
        .add-row { display: flex; gap: 10px; }

        .main-input {
          flex: 1;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px; padding: 14px 18px;
          font-size: 14px; font-family: 'DM Sans', sans-serif;
          color: #e8e8f0; outline: none; transition: all 0.2s;
        }

        .main-input::placeholder { color: #4a4a6a; }

        .main-input:focus {
          border-color: rgba(99,102,241,0.5);
          background: rgba(255,255,255,0.08);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
        }

        .btn-primary {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white; border: none; border-radius: 12px;
          padding: 14px 24px; font-size: 14px; font-weight: 600;
          font-family: 'DM Sans', sans-serif; cursor: pointer;
          transition: all 0.2s; white-space: nowrap;
          box-shadow: 0 4px 15px rgba(99,102,241,0.3);
        }

        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(99,102,241,0.4);
        }

        /* search row */
        .search-row { display: flex; gap: 10px; }

        .id-input {
          width: 140px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px; padding: 12px 16px;
          font-size: 14px; font-family: 'DM Mono', monospace;
          color: #e8e8f0; outline: none; transition: all 0.2s;
        }

        .id-input::placeholder { color: #4a4a6a; }

        .id-input:focus {
          border-color: rgba(16,185,129,0.5);
          box-shadow: 0 0 0 3px rgba(16,185,129,0.1);
        }

        .btn-search {
          background: rgba(16,185,129,0.15);
          border: 1px solid rgba(16,185,129,0.3);
          color: #34d399; border-radius: 12px;
          padding: 12px 20px; font-size: 13px; font-weight: 600;
          font-family: 'DM Sans', sans-serif; cursor: pointer;
          transition: all 0.2s;
        }

        .btn-search:hover {
          background: rgba(16,185,129,0.25);
          transform: translateY(-1px);
        }

        .btn-clear {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: #9ca3af; border-radius: 12px;
          padding: 12px 16px; font-size: 13px; font-weight: 500;
          font-family: 'DM Sans', sans-serif; cursor: pointer;
          transition: all 0.2s;
        }

        .btn-clear:hover { background: rgba(255,255,255,0.1); }

        /* found todo card */
        .found-card {
          background: rgba(16,185,129,0.06);
          border: 1px solid rgba(16,185,129,0.2);
          border-radius: 16px; padding: 20px 24px;
          margin-bottom: 16px;
          display: flex; align-items: center;
          justify-content: space-between; gap: 12px;
        }

        .found-label {
          font-size: 10px; font-weight: 600; color: #34d399;
          text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;
        }

        .found-text {
          font-size: 15px; color: #e8e8f0;
          display: flex; align-items: center; gap: 8px;
        }

        /* list */
        .list-header {
          display: flex; align-items: center;
          margin-bottom: 12px; padding: 0 4px;
        }

        .list-title {
          font-size: 12px; font-weight: 600; color: #6b6b8a;
          text-transform: uppercase; letter-spacing: 1px;
        }

        /* todo item */
        .todo-item {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; padding: 16px 20px;
          margin-bottom: 8px;
          display: flex; align-items: center;
          justify-content: space-between; gap: 12px;
          transition: all 0.2s;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .todo-item:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.12);
          transform: translateX(2px);
        }

        .todo-left {
          display: flex; align-items: center;
          gap: 14px; flex: 1; min-width: 0;
        }

        .todo-id {
          font-family: 'DM Mono', monospace;
          font-size: 11px; font-weight: 500; color: #6366f1;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.2);
          padding: 3px 9px; border-radius: 6px;
          white-space: nowrap; flex-shrink: 0;
        }

        .todo-text {
          font-size: 14px; color: #d0d0e8;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .todo-actions { display: flex; gap: 8px; flex-shrink: 0; }

        .btn-edit {
          background: rgba(245,158,11,0.12);
          border: 1px solid rgba(245,158,11,0.25);
          color: #fbbf24; border-radius: 8px;
          padding: 7px 14px; font-size: 12px; font-weight: 600;
          font-family: 'DM Sans', sans-serif; cursor: pointer;
          transition: all 0.2s;
        }

        .btn-edit:hover {
          background: rgba(245,158,11,0.22);
          transform: translateY(-1px);
        }

        .btn-del {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.25);
          color: #f87171; border-radius: 8px;
          padding: 7px 14px; font-size: 12px; font-weight: 600;
          font-family: 'DM Sans', sans-serif; cursor: pointer;
          transition: all 0.2s;
        }

        .btn-del:hover {
          background: rgba(239,68,68,0.2);
          transform: translateY(-1px);
        }

        /* empty state */
        .empty-state {
          text-align: center; padding: 48px 20px; color: #4a4a6a;
        }

        .empty-icon { font-size: 40px; margin-bottom: 12px; opacity: 0.5; }
        .empty-text { font-size: 14px; color: #5a5a7a; }

        /* loading dots */
        .loading-row {
          display: flex; gap: 8px;
          padding: 24px; justify-content: center;
        }

        .dot {
          width: 7px; height: 7px;
          background: #6366f1; border-radius: 50%;
          animation: bounce 1.2s infinite ease-in-out;
        }

        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <div className="app-wrapper">
        <div className="container">

          {/* header */}
          <div className="header">
            <div className="logo-area">
              <div className="logo-icon">✓</div>
              <div>
                <div className="app-title">TaskFlow</div>
                <div className="app-subtitle">Manage your tasks efficiently</div>
              </div>
            </div>
            <div className="count-badge">
              {todos.length} task{todos.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* add task card */}
          <div className="card">
            <div className="card-label">New Task</div>
            <div className="add-row">
              <input
                className="main-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                placeholder="What needs to be done?"
              />
              <button className="btn-primary" onClick={handleAdd}>
                + Add Task
              </button>
            </div>
          </div>

          {/* search by id card */}
          <div className="card">
            <div className="card-label">Search by ID</div>
            <div className="search-row">
              <input
                className="id-input"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearchById()}
                placeholder="Enter ID..."
                type="number"
              />
              <button className="btn-search" onClick={handleSearchById}>
                🔍 Search
              </button>
              {foundTodo && (
                <button className="btn-clear" onClick={handleClearSearch}>
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* found todo result */}
          {foundTodo && (
            <div className="found-card">
              <div>
                <div className="found-label">✓ Result Found</div>
                <div className="found-text">
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "12px", color: "#34d399" }}>
                    #{foundTodo.id}
                  </span>
                  {foundTodo.text}
                </div>
              </div>
              <div className="todo-actions">
                <button className="btn-edit" onClick={() => handleUpdate(foundTodo.id)}>
                  Edit
                </button>
                <button className="btn-del" onClick={() => handleDelete(foundTodo.id)}>
                  Delete
                </button>
              </div>
            </div>
          )}

          {/* all tasks list */}
          <div className="list-header">
            <span className="list-title">All Tasks</span>
          </div>

          {/* loading animation */}
          {loading ? (
            <div className="loading-row">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          ) : todos.length === 0 ? (

            /* empty state message */
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <div className="empty-text">no tasks yet — add one above!</div>
            </div>

          ) : (

            /* loop through all todos */
            todos.map((todo) => (
              <div
                key={todo.id} // unique key for each todo
                className="todo-item"
                style={{ opacity: deletingId === todo.id ? 0.4 : 1 }} // fade when deleting
              >
                <div className="todo-left">
                  <span className="todo-id">#{todo.id}</span> {/* id badge */}
                  <span className="todo-text">{todo.text}</span> {/* todo text */}
                </div>
                <div className="todo-actions">
                  <button className="btn-edit" onClick={() => handleUpdate(todo.id)}>
                    Edit
                  </button>
                  <button className="btn-del" onClick={() => handleDelete(todo.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </>
  );
}