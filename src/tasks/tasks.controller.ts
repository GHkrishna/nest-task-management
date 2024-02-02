import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  NotFoundException,
  UseGuards,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/createTask.dto";
import { GetTaskFilter } from "./dto/get-task-filter.dto";
import { UpdateStatusDto } from "./dto/update-status-dto";
import { Task } from "./task.entity";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "../auth/get-user.decorator";
import { User } from "../auth/user.entity";
import { ConfigService } from "@nestjs/config";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  constructor(
    private taskService: TasksService,
    private configService: ConfigService
  ) {
    console.log(configService.get("TEST_VALUE"));
  }

  @Get()
  async getAllTasks(
    @Query() filterDto: GetTaskFilter,
    @GetUser() user: User
  ): Promise<Task[]> {
    return await this.taskService.getAllTasks(filterDto, user);
  }

  @Get("/:id")
  async getTasks(
    @Param("id") id: string,
    @GetUser() user: User
  ): Promise<Task> {
    return await this.taskService.getTaskById(id, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
  }

  @Delete("/:id")
  deleteTaskId(
    @Param("id") id: string,
    @GetUser() user: User
  ): Promise<string> {
    return this.taskService.deleteTask(id, user);
  }

  @Patch("/:id")
  updateStatus(
    @Param("id") id: string,
    @Body() statusDto: UpdateStatusDto,
    @GetUser() user: User
  ): Promise<Task> {
    // if(Object.values(TaskStatus).includes(status)){
    const status = statusDto.status;
    return this.taskService.updateStatusById(id, status, user);
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
