import { Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";



@Controller("api/task")
export class TaskController {
    constructor(private taskService: TaskService) {}
    @Get()
    public list(): string {
        return this.taskService.task();
    }

    @Post("create")
    public create(task: any): string {
        return this.taskService.create(task);
    }

   
    @Delete("delete/:id")
    public delete(id:number): string {
        return this.taskService.delete(id);
    }

    @Put("update")
    public update(@Param("id") id:number): string {
        return this.taskService.update(id, "datos de la tarea");
    }   
          
    @Get(":id")
    public findById(@Param("id") id:String): string {
        return this.taskService.findById(Number(id));
    }

    
}   