import { Controller, Get, Post, Body } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./tasks.model";

@Controller("tasks")
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(): Task[] {
    console.log("Getting tasks");
    return this.taskService.getAllTasks();
  }

  @Post()
  createTask(@Body("title") title, @Body("description") description): Task {
    console.log("This is title::", title);
    const task: Task = this.taskService.createTask(title, description);
    return task;
  }
}
