import { Controller, Get, Post, Body, Param, Delete, Patch, Query, NotFoundException } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/createTask.dto";
import { GetTaskFilter } from "./dto/get-task-filter.dto";
import { UpdateStatusDto } from "./dto/update-status-dto";
import { Task } from "./task.entity";


@Controller("tasks")
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  async getAllTasks(@Query() filterDto: GetTaskFilter): Promise<Task[]>{
    return await this.taskService.getAllTasks(filterDto);
  }

  @Get('/:id')
  async getTasks(@Param('id') id: string): Promise<Task>{
    return await this.taskService.getTaskById(id);
  }


  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTaskId(@Param('id') id: string): Promise<string>{
    return this.taskService.deleteTask(id);
  }

  @Patch('/:id')
  updateStatus(@Param('id') id: string, @Body() statusDto: UpdateStatusDto): Promise<Task>{
    // if(Object.values(TaskStatus).includes(status)){
      const status = statusDto.status;
      return this.taskService.updateStatusById(id, status);
    // }
    // return 'Invalid Status'
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


}
