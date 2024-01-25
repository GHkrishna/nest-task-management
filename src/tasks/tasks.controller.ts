import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task, TaskStatus } from "./tasks.model";
import { CreateTask } from "./dto/createTask.dto";
import { GetTaskFilter } from "./dto/get-task-filter.dto";

@Controller("tasks")
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilter): Task[] | string{

    // If filter defined call by filter
    if(Object.keys(filterDto).length){
      return this.taskService.getTaskFiltered(filterDto)
    }else{
      // If filter not defined call getAllTasks()
      return this.taskService.getAllTasks();
    }
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

  @Patch('/:id')
  patchTaskById(@Param('id') id: string, @Body('status') status: TaskStatus): Task | string{
    if(Object.values(TaskStatus).includes(status)){
      const updatedTask = this.taskService.updateStatusById(id, status);
      console.log('This is patched', id, 'This is status', status);
      return updatedTask;
    }
    return 'Invalid Status'
  }
}
