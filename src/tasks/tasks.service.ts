import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./tasks.model";
// a module to auto-generate id
import { v4 as uuid } from "uuid";

@Injectable()
export class TasksService {
  private input: Task[] = [];

  getAllTasks(): Task[] {
    return this.input;
  }

  createTask(_title: string, _description: string): Task {
    const task: Task = {
      id: uuid(),
      title: _title,
      description: _description,
      status: TaskStatus.ACTIVE,
    };

    console.log("This is tak", task);
    this.input.push(task);
    return task;
  }
}
