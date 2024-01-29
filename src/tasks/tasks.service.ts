import { Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./tasks.model";
// a module to auto-generate id
import { v4 as uuid } from "uuid";
import { CreateTask } from "./dto/createTask.dto";
import { GetTaskFilter } from "./dto/get-task-filter.dto";

@Injectable()
export class TasksService {
  private input: Task[] = [];

  getAllTasks(): Task[] {
    return this.input;
  }

  getTaskFiltered(filterDto: GetTaskFilter): Task[]{
    const { search, status } = filterDto;
    console.log('::::Also Reached Here::::');

    let copyList: Task[] = this.input;

    if(status){
      copyList = copyList.filter((task) => {
        return task.status === status
      })
    }
    if(search){
      copyList = copyList.filter((task) =>{
        if(task.title.includes(search) || task.description.includes(search))
        return true;
      else
      return false;
      })
    }
    return copyList;

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

  getTaskById(taskId: string): Task{
    const specificTask = this.input.find((task) => {
      return task.id === taskId;
    })
    if(!specificTask){
      throw new NotFoundException;
    }
    return specificTask;
  }

  deleteTaskById(taskId:string): string{
    const toBeRemoved: Task[] = this.input.filter((task) =>{
      return task.id !== taskId
    })
    if(toBeRemoved.length === this.input.length){
      throw new NotFoundException;
    }
    this.input = toBeRemoved;
    console.log('removed Input:::', toBeRemoved);
    return 'success';
  }

  updateStatusById(taskId: string, status: TaskStatus): Task{
      const taskToBeUpdated:Task = this.getTaskById(taskId);
      if(!taskToBeUpdated){
        throw new NotFoundException(`Not able to update the task of taskId: ${taskId}`);
      }
      taskToBeUpdated.status = status;

      return taskToBeUpdated;
  }

  //   this.input.indexOf(taskToBeUpdated)

  //   if(taskToBeUpdated.status === status)
  // }
}
