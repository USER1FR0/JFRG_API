import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/interfaces/auth.module';
import { TaskModule } from './modules/task/interfaces/task.module';
import { UserModule } from './modules/user/interfaces/user.module';
import { UtilService } from './common/services/util.service';
import { ConfigModule } from '@nestjs/config';
import { LogsModule } from './modules/logs/interfaces/logs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    AuthModule, 
    TaskModule,
    UserModule,
    LogsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
