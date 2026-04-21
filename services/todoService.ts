// this is the main API path where all todo requests go
const BASE_URL = "/api/todos";


// this function gets all todos from backend
export const getTodos = async () => {
  // calling backend API
  const res = await fetch(BASE_URL);

  // if something goes wrong, show error
  if (!res.ok) throw new Error("failed to fetch todos");

  // convert response into json and return it
  return res.json();
};


// this function adds a new todo
export const addTodo = async (text: string) => {
  // sending data to backend
  const res = await fetch(BASE_URL, {
    method: "POST", // post means adding new data

    headers: {
      "Content-Type": "application/json", // telling backend we send json
    },

    body: JSON.stringify({ text }), // sending the todo text
  });

  // if adding fails, show error
  if (!res.ok) throw new Error("failed to add todo");

  // return the newly added todo
  return res.json();
};


// this function deletes a todo using id
export const deleteTodo = async (id: number) => {
  // sending delete request to backend
  await fetch(BASE_URL, {
    method: "DELETE", // delete means removing data

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ id }), // sending which todo to delete
  });
};


// this function updates a todo
export const updateTodo = async (id: number, text: string) => {
  // sending updated data to backend
  await fetch(BASE_URL, {
    method: "PUT", // put means updating existing data

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ id, text }), // sending id + new text
  });
};