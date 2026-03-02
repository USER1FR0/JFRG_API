import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Client } from 'pg';
import { Task } from './entities/task.entity';
import { isNull } from 'util';
import { CreateTaskDto } from './dto/create-task.dto';
import { updateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(@Inject('POSTGRES_CONNECTION') private pg: Client) {}

  public async getAllTasks(): Promise<Task[]> {
    const query = `SELECT * FROM tasks ORDER BY name ASC`;

    const result = await this.pg.query(query);

    return result.rows as Task[];
  }

  public async getTaskById(id: number): Promise<Task[]> {
    const query = `SELECT * FROM tasks WHERE id = ${id}`;

    const result = await this.pg.query(query);

    return result.rows as Task[];
  }

  public async inserTask(task: CreateTaskDto): Promise<Task[]> {
    const sql = `INSERT INTO tasks
                (name,description,priority,user_id)
                VALUES ($1,$2,$3,$4)
                RETURNING id
                `;
    const values = [task.name, task.description, task.priority, task.user_id];

    const result = await this.pg.query(sql, values);
    const insertId = result.rows[0].id;

    return await this.getTaskById(insertId);
  }

  public async updateTask(id: number, updateTask: updateTaskDto): Promise<Task[]> {
    const sql = `
    UPDATE tasks
    SET 
      name = COALESCE($1, name),
      description = COALESCE($2, description),
      priority = COALESCE($3, priority)
    WHERE id = $4
    RETURNING *
  `;

    const values = [
      updateTask.name ?? null,
      updateTask.description ?? null,
      updateTask.priority ?? null,
      id,
    ];

    const result = await this.pg.query(sql, values);

    return result.rows[0];
  }

  public async delete(id: number): Promise<boolean> {
    const sql = `
    DELETE FROM tasks
    WHERE id = $1
  `;

    const result = await this.pg.query(sql, [id]);

    if (!result.rowCount || result.rowCount === 0) {
      throw new NotFoundException(`Tarea con id ${id} no encontrada`);
    }

    return result.rowCount > 0;
  }
}
