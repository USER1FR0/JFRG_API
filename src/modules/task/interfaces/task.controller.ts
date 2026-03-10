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
import { CreateTaskDto } from '../dto/create-task.dto';
import { updateTaskDto } from '../dto/update-task.dto';
import { Task } from '@prisma/client'; 

@Controller('api/task')
export class TaskController {
  constructor(private taskSvc: TaskService) {}

  @Get()
  async task(): Promise<Task[]> {
    return await this.taskSvc.getAllTasks();
  }

  @Post()
  // Prisma devuelve el objeto creado, no un array
  public async insertTask(@Body() task: CreateTaskDto): Promise<Task> {
    return this.taskSvc.insertTask(task); // Verifica que en el service sea "insertTask" (con 't')
  }

  @Put('update/:id')
  // El retorno es una Task única
  public async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() task: updateTaskDto
  ): Promise<Task> {
    try {
      return await this.taskSvc.updateTask(id, task);
    } catch (error) {
      // Prisma lanza error si no encuentra el ID al hacer update
      throw new HttpException(`Tarea con id ${id} no encontrada`, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  public async findById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    const result = await this.taskSvc.getTaskById(id);

    // Prisma devuelve null si findUnique no encuentra nada
    if (!result) {
      throw new HttpException(`Tarea con id ${id} no encontrada`, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Delete(':id')
  public delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.taskSvc.delete(id);
  }
}
