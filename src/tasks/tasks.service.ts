import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./tasks.model";
// a module to auto-generate id
import { v4 as uuid } from "uuid";
import { CreateTask } from "./dto/createTask.dto";

@Injectable()
export class TasksService {
  private input: Task[] = [];

  getAllTasks(): Task[] {
    return this.input;
  }

  createTask(createTask: CreateTask): Task {
    const { title, description } = createTask;
    const task: Task = {
      id: uuid(),
      title: title,
      description: description,
      status: TaskStatus.ACTIVE,
    };

    console.log("Updated task", task);
    this.input.push(task);
    return task;
  }

  getTaskById(taskId: string){
    return this.input.find((task) => {
      return task.id === taskId;
    })
  }

  deleteTaskById(taskId:string): string{
    const removedInput: Task[] = this.input.filter((task, index) =>{
      return this.input[index].id !== taskId
    })
    this.input = removedInput;
    console.log('removed Input:::', removedInput);
    return 'success';
  }
}
