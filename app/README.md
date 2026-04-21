# Todo App

a simple todo list app built with react, tailwind and next.js

## features
- add a todo
- view all todos
- update a todo
- delete a todo

## technologies used
- react js — frontend ui
- tailwind css — styling
- next js — backend api routes

## documentation types used
1. inline comments — notes written inside code explaining each line
   advantage: easy to understand, saves time, helps in debugging

2. jsdoc — structured comments above each function
   advantage: vscode shows hints, professional standard, easy to use

3. readme — project overview file
   advantage: anyone can run project, looks professional on github

4. api documentation — explains all backend routes
   advantage: frontend and backend work separately, easy to test

## api routes
- GET    /api/todos — returns all todos
- POST   /api/todos — adds a new todo
- PUT    /api/todos — updates a todo
- DELETE /api/todos — deletes a todo

## how to run
1. clone the repo
   git clone https://github.com/SachinRK257/todo-app.git
2. install packages
   npm install
3. start the app
   npm run dev
4. open browser
   http://localhost:3000

## note
data is temporary and clears when server restarts.
real database will be added in next phase.