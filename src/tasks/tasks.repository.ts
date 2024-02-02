import { Brackets, DataSource, Repository } from "typeorm";
import { Task } from "./task.entity";
import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/createTask.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTaskFilter } from "./dto/get-task-filter.dto";
import { User } from "../auth/user.entity";

@Injectable()
// Extend Repository with entity Task
export class TasksRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    // create object
    const task: Task = this.create({
      title,
      description,
      status: TaskStatus.ACTIVE,
      user,
    });
    // save object
    await this.save(task);

    return task;
  }

  async getTasks(filterDto: GetTaskFilter, user: User): Promise<Task[]> {
    const { search, status } = filterDto;

    // create a new query 'task'
    const query = this.createQueryBuilder("task");
    query.where({ user });

    if (status) {
      query.andWhere("task.status = :status", { status });
    }

    if (search) {
      // search logic
      // query.andWhere(
      //   "(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))",
      //   { search: `%${search}%}` } // % = the term may have any characters before and after
      // );

      query.andWhere(
        // The new Brackets tell to add this query separately if both query are passed
        // Similar to the above commented code of 'search logic'
        new Brackets((qb) => {
          qb.where("(title ILIKE :search OR description ILIKE :search)", {
            search: `%${search}%`,
          });
        })
      );
    }

    const allTasks = await query.getMany();
    return allTasks;
  }
}
