import { Brackets, DataSource, Repository } from "typeorm";
import { Task } from "./task.entity";
import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/createTask.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTaskFilter } from "./dto/get-task-filter.dto";

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

  async getTasks(filterDto: GetTaskFilter): Promise<Task[]>{
    const {search, status} = filterDto;

    const query = this.createQueryBuilder('task');

    if(status){
      query.andWhere('task.status = :status', {status});
    }

    if(search){
      // search logic
      // query.andWhere(
      //   'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
      //   {search: `%${search}%}`}, // % = the term may have any characters before and after
      //   )

      query.andWhere(
        // The new Brackets tell to add this query separately if both query are passed
        new Brackets((qb) => {
          qb.where('title ILIKE :search OR description ILIKE :search', {
          search: `%${search}%`,
          });
        }),
        )
    }

    const allTasks = await query.getMany();
    return allTasks;
  }
}
