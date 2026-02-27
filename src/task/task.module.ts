import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { pgProvider } from 'src/providers/pg.provider';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [TaskService, pgProvider],
})
export class TaskModule {}
