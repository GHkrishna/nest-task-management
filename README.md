# nest-task-management
Task Management using NestJs

## To run

1. Clone the repo
2. ```npm install```
3. ```npm run start:dev``` to watch changes or ```npm start``` to build <br>
The app is by default hosted on http://localhost:3000

## Available handlers and endpoints
All the functionalities are available at '/tasks' controller

### Post() : create tasks
To create a task, 
1. POST at 'http://localhost:3000/tasks'
2. body parameters include, `title`:string and `description`:string

### Get()
1. 'http://localhost:3000/tasks' returns all the created tasks

2. Tasks can be filtered on two query parameters `status` and `search` <br>
  a. `status` defines the status of the task and is either `ACTIVE`, `IN_PROGRESS`, `COMPLETED` <br>
  b. `search` defines substring present in [title] or [description] <br>
