import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UseGuards,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/createTask.dto";
import { GetTaskFilter } from "./dto/get-task-filter.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";
import { Task } from "./task.entity";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "../auth/get-user.decorator";
import { User } from "../auth/user.entity";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@Controller("tasks")
@ApiTags("tasks")
@ApiBearerAuth()
// AuthGuard a functionality of Passport defined for all handlers under the controller to use authorization
@UseGuards(AuthGuard())
export class TasksController {
  constructor(
    // taskService instance created
    private taskService: TasksService
  ) {
  }

  @Get()
  async getAllTasks(
    @Query() filterDto: GetTaskFilter,
    // Custom decorator
    // From execution context gets the 'user' from request
    @GetUser() user: User
    // Since it awaits for response hence Promise returned
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
    const status = statusDto.status;
    return this.taskService.updateStatusById(id, status, user);
  }
}
