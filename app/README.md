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


## 4 types of documentation and advantages

### 1. inline comments
notes written inside the code using //
- anyone reading code understands it instantly
- saves time when you come back after weeks
- makes debugging faster
- helps teammates understand your code quickly

### 2. jsdoc
structured comments written above functions using /** */
- vscode shows hints automatically when you type function name
- anyone can understand function without reading full code
- professional standard used in real companies
- helps catch mistakes early

### 3. readme
a file that explains the whole project on github
- makes your github look professional
- anyone can run project just by following the steps
- no need to explain project verbally
- every real company project has a readme

### 4. api documentation
explains all backend routes — url, method, data
- frontend and backend can work separately
- easy to test each route using postman
- no confusion about what data to send or expect back
- all real apps like swiggy and github have api docs