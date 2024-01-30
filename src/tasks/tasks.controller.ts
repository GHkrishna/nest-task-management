// Implemented until 48


import { Controller, Get, Post, Body, Param, Delete, Patch, Query, NotFoundException } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from "./dto/createTask.dto";
import { GetTaskFilter } from "./dto/get-task-filter.dto";
import { UpdateStatusDto } from "./dto/update-status-dto";
import { Task } from "./task.entity";


@Controller("tasks")
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get('/:id')
  async getTasks(@Param('id') id: string): Promise<Task>{
    return await this.taskService.getTaskById(id);
  }


  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  // @Get()
  // getTasks(@Query() filterDto: GetTaskFilter): Task[] | string{
  //   // If filter defined call by filter
  //   if(Object.keys(filterDto).length > 0){
  //   // if(filterDto.search != undefined || filterDto.status != undefined){
  //     return this.taskService.getTaskFiltered(filterDto)
  //   }else{
  //     // If filter not defined call getAllTasks()
  //     return this.taskService.getAllTasks();
  //   }
  // }


  // @Get('/:id')
  // getTAskById(@Param('id') id: string){
  //   const task: Task= this.taskService.getTaskById(id);
  //   return task;
  // }

  // @Delete('/:id')
  // deleteTaskById(@Param('id') id: string): Task | string{
  //   return this.taskService.deleteTaskById(id);
  // }

  // @Patch('/:id')
  // patchTaskById(@Param('id') id: string, @Body() statusDto: UpdateStatusDto): Task | string{
  //   // if(Object.values(TaskStatus).includes(status)){
  //     const status = statusDto.status;
  //     const updatedTask = this.taskService.updateStatusById(id, status);
  //     return updatedTask;
  //   // }
  //   // return 'Invalid Status'
  // }
}
