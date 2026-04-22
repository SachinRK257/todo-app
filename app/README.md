# Todo App

a simple todo list application built with react, tailwind css and next.js

## live demo
https://todo-app-azure-five-55.vercel.app

## github
https://github.com/SachinRK257/todo-app

## features
- add a new todo
- view all todos
- update an existing todo
- delete a todo

## technologies used
- react js — frontend ui
- tailwind css — styling
- next js — backend api routes
- typescript — type safety

## 4 types of documentation used

### 1. inline comments
notes written inside the code using //
advantages:
- anyone reading code understands it instantly
- saves time when you come back after weeks
- makes debugging faster
- helps teammates understand your code quickly

### 2. jsdoc
structured comments written above functions using /** */
advantages:
- vscode shows hints automatically when you type function name
- anyone can understand function without reading full code
- professional standard used in real companies
- helps catch mistakes early

### 3. readme
a file that explains the whole project on github
advantages:
- makes your github look professional
- anyone can run project just by following the steps
- no need to explain project verbally
- every real company project has a readme

### 4. api routes
- GET    /api/todos — returns all todos
- POST   /api/todos — adds a new todo
- PUT    /api/todos — updates an existing todo
- DELETE /api/todos — deletes a todo


## how to run locally
1. clone the repo
   git clone https://github.com/SachinRK257/todo-app.git

2. go to project folder
   cd todo-app

3. install packages
   npm install

4. start the app
   npm run dev

5. open in browser
   http://localhost:3000

## project structure
- app/page.tsx        — frontend ui code
- app/api/todos/route.ts — backend api routes
- services/todoService.ts - API calling functions
- types/todo.ts - Type definition
 
## note
data is stored temporarily in memory.
it clears when the server restarts.


