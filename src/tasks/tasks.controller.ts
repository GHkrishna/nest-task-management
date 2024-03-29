import { Controller, Get, Post, Body, Param, Delete, Patch, Query, NotFoundException } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task, TaskStatus } from "./tasks.model";
import { CreateTask } from "./dto/createTask.dto";
import { GetTaskFilter } from "./dto/get-task-filter.dto";
import { UpdateStatusDto } from "./dto/update-status-dto";


@Controller("tasks")
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilter): Task[] | string{
    // If filter defined call by filter
    if(Object.keys(filterDto).length > 0){
    // if(filterDto.search != undefined || filterDto.status != undefined){
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
  deleteTaskById(@Param('id') id: string): Task | string{
    return this.taskService.deleteTaskById(id);
  }

  @Patch('/:id')
  patchTaskById(@Param('id') id: string, @Body() statusDto: UpdateStatusDto): Task | string{
    // if(Object.values(TaskStatus).includes(status)){
      const status = statusDto.status;
      const updatedTask = this.taskService.updateStatusById(id, status);
      console.log('This is patched', id, 'This is status', status);
      return updatedTask;
    // }
    // return 'Invalid Status'
  }
}
