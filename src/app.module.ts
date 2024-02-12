import { Module } from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PrismaModule } from "prisma/prisma.module";

@Module({
  imports: [
    // Config module defined to use variables from env depending on STAGE
    // STAGE: dev, prod. Defined in start command
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),

    // Imports
    AuthModule,
    TasksModule,
    PrismaModule

    // // TypeORM used as a data connectivity between our app and postres DB
    // // TypeOrmModule asynchronously waits for,
    // TypeOrmModule.forRootAsync({
    //   // Modules defined in Imports and
    //   imports: [ConfigModule],
    //   // Services defined in inject, to be loaded
    //   inject: [ConfigService],
    //   // useFactory used to create providers dynamically
    //   useFactory: async (configService: ConfigService) => {
    //     return {
    //       type: "postgres",
    //       host: configService.get("DB_HOST"),
    //       port: configService.get("DB_PORT"),
    //       username: configService.get("DB_USERNAME"),
    //       password: configService.get("DB_PASSWORD"),
    //       database: configService.get("DB_DATABASE"),
    //       autoLoadEntities: true,
    //       synchronize: true,
    //     };
    //   },
    // }),

    // Used if configs are give statically
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
