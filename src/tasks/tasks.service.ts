import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from "./dto/createTask.dto";
import { GetTaskFilter } from "./dto/get-task-filter.dto";
import { TasksRepository } from "./tasks.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { User } from "../auth/user.entity";

@Injectable()
export class TasksService {
  constructor(
    // Instance of Injectable TaskRepository
    // @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository
  ) {}

  // async getAllTasks(filterDto: GetTaskFilter, user: User): Promise<Task[]> {
  //   // Call the repository function and return the Task array
  //   return this.tasksRepository.getTasks(filterDto, user);
  // }

  // async getTaskById(id: string, user: User): Promise<Task> {
  //   const found = await this.tasksRepository.findOneBy({ id, user });

  //   if (!found) {
  //     throw new NotFoundException(`Task with ID::: ' ${id} ' not found`);
  //   }

  //   return found;
  // }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<any> {
    const task = this.tasksRepository.createTask(createTaskDto, user);
    return task;
  }

  // async deleteTask(id: string, user: User): Promise<string> {
  //   // Returns deleted, i.e. rows affected
  //   const deleteResult = await this.tasksRepository.delete({ id, user });

  //   // If no rows affected after deletion, i.e. no rows with such id and user exist
  //   if (deleteResult.affected === 0) {
  //     throw new NotFoundException();
  //   }

  //   console.log("Delete Result", deleteResult);
  //   return "deleted successfully";
  // }

  // async updateStatusById(
  //   id: string,
  //   status: TaskStatus,
  //   user: User
  // ): Promise<Task> {
  //   const toBeUpdated = await this.getTaskById(id, user);

  //   // Update status from returned object
  //   toBeUpdated.status = status;
  //   // Save the object in db
  //   const updatedTask = await this.tasksRepository.save(toBeUpdated);
  //   console.log("Updated task:::", updatedTask);
  //   return updatedTask;
  // }
}
