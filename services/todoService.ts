const BASE_URL = "/api/todos";   // Store backend API path in a variable

export const getTodos = async () => {  //I created an async function to fetch all todos from backend using API
  const res = await fetch(BASE_URL);   // call backend API to get todos
  return res.json();  // convert response to JSON and return data
};

export const addTodo = async (text: string) => {    // function to add new todo
  await fetch(BASE_URL, {    // send POST request to backend
    method: "POST",      // add new data
    headers: { "Content-Type": "application/json" },  // sending JSON
    body: JSON.stringify({ text }),   // convert text into JSON and send
  });
};

export const deleteTodo = async (text: string) => {     // function to delete a todo
  await fetch(BASE_URL, {      // send DELETE request to backend
    method: "DELETE",    //remove data
    headers: { "Content-Type": "application/json" },  //sending JSON
    body: JSON.stringify({ text }),    // send which task to delete
  });
};

export const updateTodo = async (oldText: string, newText: string) => {
  await fetch(BASE_URL, {     // send PUT request to backend
    method: "PUT",    // update data
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ oldText, newText }),       // send old value and new value to update  
  });
};