import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
// import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksRepository } from "./tasks.repository";
// import { Task } from "./task.entity";
import { AuthModule } from "../auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { PrismaService } from "prisma/prisma.service";
import { PrismaModule } from "prisma/prisma.module";

@Module({
  // TypeOrmModule defined for 'Task' entity
  // AuthModule imported for Authentications (Guards)
  // ConfigModule used for accessing env vars depending on STAGE
  imports: [
    // TypeOrmModule.forFeature([Task]), 
    PrismaModule,
    AuthModule, 
    ConfigModule],
  controllers: [TasksController],
  // TasksRepository set for DB operations
  providers: [TasksService, TasksRepository, PrismaService],
})
export class TasksModule {}
