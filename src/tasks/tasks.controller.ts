import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./tasks.model";
import { CreateTask } from "./dto/createTask.dto";

@Controller("tasks")
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(): Task[] {
    console.log("Getting tasks");
    return this.taskService.getAllTasks();
  }

  @Post()
  createTask(@Body() createTask: CreateTask): Task {
    const task: Task = this.taskService.createTask(createTask);
    return task;
  }

  @Get('/:id')
  getTAskById(@Param('id') id: string){
    const task: Task= this.taskService.getTaskById(id);
    return task;
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): string{
    console.log(this.taskService.deleteTaskById(id));
    return 'deleted'
  }
}
