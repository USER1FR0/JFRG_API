import { Injectable, Inject } from '@nestjs/common';
import { Client } from 'pg';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(@Inject('POSTGRES_CONNECTION') private pg: Client) {}

  public async getAllTasks(): Promise<Task[]> {
    const query = `SELECT * FROM tasks ORDER BY name ASC`;

    const result = await this.pg.query(query);

    return result.rows as Task[];
  }

  public async task(): Promise<string> {
    const tasks = await this.getAllTasks();
    return JSON.stringify(tasks);
  }

  public create(task: any): string {
    return task;
  }

  public update(id: number, task: any): string {
    return `tarea actualizada con id: ${id} y datos: ${task}`;
  }
  public delete(id: number): string {
    return `tarea eliminada con id: ${id}`;
  }
  public findById(id: number): string {
    return `tarea encontrada por id: ${id}`;
  }
}
