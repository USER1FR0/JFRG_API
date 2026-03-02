import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { isEmpty } from 'rxjs';
import { Task } from './entities/task.entity';
import { updateTaskDto } from './dto/update-task.dto';

@Controller('api/task')
export class TaskController {
  constructor(private taskSvc: TaskService) {}

  @Get()
  async task() {
    return await this.taskSvc.getAllTasks();
  }

  @Post()
  public async insertTask(@Body() task: CreateTaskDto): Promise<Task[]> {
    console.error('insert ', typeof task);
    return this.taskSvc.inserTask(task);
  }

  @Put('update/:id')
  public async update(@Param('id') id: string, @Body() task: updateTaskDto): Promise<Task[]> {
    const result = await this.taskSvc.updateTask(Number(id), task);

    if (result == undefined) {
      throw new HttpException(`Tarea con id ${id} no encontrada `, HttpStatus.NOT_FOUND);
      throw new Error('Esa Tarea no Existe');
    }

    return result;
  }

  @Get(':id')
  public async findById(@Param('id', ParseIntPipe) id: number): Promise<Task[]> {
    const result = await this.taskSvc.getTaskById(id);
    console.log('TIPO DE DATO: ', typeof result);

    if (result.length == 0) {
      throw new HttpException(`Tarea con id ${id} no encontrada `, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Delete(':id')
  public delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.taskSvc.delete(id);
  }
}
