import { Module } from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";
// import { TasksController } from "./tasks/tasks.controller";
// import { TasksService } from "./tasks/tasks.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./tasks/task.entity";

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
      autoLoadEntities: true,
      synchronize: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
