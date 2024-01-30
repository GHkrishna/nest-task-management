import { DataSource, Repository } from "typeorm";
import { Task } from "./task.entity";
import { Inject, Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/createTask.dto";
import { TaskStatus } from "./task-status.enum";

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const {title, description} = createTaskDto;
    const task: Task = this.create({
      title,
      description,
      status: TaskStatus.ACTIVE,
    })
    await this.save(task);

    return task;
  }
}
