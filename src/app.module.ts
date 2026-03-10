import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './modules/task/interfaces/task.module';

@Module({
  imports: [AuthModule, TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
