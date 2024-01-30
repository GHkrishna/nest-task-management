import { DataSource, Repository } from "typeorm";
import { Task } from "./task.entity";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class TasksRepository extends Repository<Task> {
    constructor(private dataSource: DataSource) {
        super(Task, dataSource.createEntityManager());
      }
}