import { Module } from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";
// import { TasksController } from "./tasks/tasks.controller";
// import { TasksService } from "./tasks/tasks.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./tasks/task.entity";
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory:async (configService: ConfigService) => {
        return{
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_DATABASE'),
            autoLoadEntities: true,
            synchronize: true,
      }
      }
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'postgres',
    //   database: 'task-management',
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
