import { Brackets, DataSource, Repository } from "typeorm";
import { Task } from "./task.entity";
import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/createTask.dto";
// import { TaskStatus } from "@prisma/client";
import { GetTaskFilter } from "./dto/get-task-filter.dto";
import { User } from "../auth/user.entity";
import { PrismaService } from "prisma/prisma.service";
import { task as taskModel, user as userModel, TaskStatus } from "@prisma/client";
import { connect } from "rxjs";

@Injectable()
// Extend Repository with entity Task
export class TasksRepository{
  constructor(
    // private dataSource: DataSource
    private prismaService: PrismaService
    ) {
    // super(Task, dataSource.createEntityManager());
  }

  async createTask(createTaskDto: CreateTaskDto, user: userModel): Promise<taskModel> {
    const { title, description } = createTaskDto;
    // create object
    const task: any = this.prismaService.task.create({
      data: {
        title,
        description,
        status: TaskStatus.ACTIVE,
        // status: 'ACTIVE',
        // userId: user.id,
        user: {
          connect: {
            id: user.id,
          }
        }
      }
    });
    // save object
    // await this.save(task);

    return task;
  }

  // async getTasks(filterDto: GetTaskFilter, user: User): Promise<Task[]> {
  //   const { search, status } = filterDto;

  //   // create a new query 'task'
  //   const query = this.createQueryBuilder("task");
  //   query.where({ user });

  //   if (status) {
  //     query.andWhere("task.status = :status", { status });
  //   }

  //   if (search) {
  //     // search logic
  //     // query.andWhere(
  //     //   "(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))",
  //     //   { search: `%${search}%}` } // % = the term may have any characters before and after
  //     // );

  //     query.andWhere(
  //       // The new Brackets tell to add this query separately if both query are passed
  //       // Similar to the above commented code of 'search logic'
  //       new Brackets((qb) => {
  //         qb.where("(title ILIKE :search OR description ILIKE :search)", {
  //           search: `%${search}%`,
  //         });
  //       })
  //     );
  //   }

  //   const allTasks = await query.getMany();
  //   return allTasks;
  // }
}
