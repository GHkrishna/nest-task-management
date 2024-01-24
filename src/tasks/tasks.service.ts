import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private input: string[] = ['TS', 'JS'];

  getAllTasks(): string[]{
    return (this.input);
  }
}
