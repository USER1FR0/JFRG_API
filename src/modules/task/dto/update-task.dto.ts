import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";


export class updateTaskDto{
    @IsOptional()
    @IsString()
    @MinLength(3,{message: `Debe tener almenos 3 caracteres`})
    name: string;

    @MinLength(3,{message: `Debe tener almenos 3 caracteres`})
    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsBoolean()
    priority: boolean
}