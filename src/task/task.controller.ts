import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('api/task')
export class TaskController {
  constructor(private taskSvc: TaskService) {}

  @Get()
  public list(): string {
    return this.taskSvc.task();
  }

  @Post()
  public insertTask(@Body() task: CreateTaskDto): any{
    console.error("insert ", typeof task);
    return this.taskSvc.create(task);
  }

  @Delete('delete/:id')
  public delete(id: number): string {
    return this.taskSvc.delete(id);
  }

  @Put('update')
  public update(@Param('id') id: number): string {
    return this.taskSvc.update(id, 'datos de la tarea');
  }

  @Get(':id')
  public findById(@Param('id') id: String): string {
    return this.taskSvc.findById(Number(id));
  }
}
