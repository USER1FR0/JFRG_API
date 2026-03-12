import { Inject, Injectable } from "@nestjs/common";
import { User } from "./../entities/user.entity";
import { Client } from "pg";
import { PrismaService } from "src/common/services/prisma.service";
import { UpdateUserDto } from "./../dto/update-user.dto";
import { CreateUserDto } from "./../dto/create-user.dto";


@Injectable()
export class UserService{
    
    constructor(
        @Inject('POSTGRES_CONNECTION') private pg: Client,
        private prisma: PrismaService
    ){}

    public async getAllUsers(): Promise<User[]>{
        const users = await this.prisma.user.findMany({
            orderBy: [{name: "asc"}],
            select: {
                id: true,
                name: true,
                lastName: true,
                username: true,
                password: false
            }
        })
        return users;
    }

    public async getUserById(id: number): Promise<User | null>{
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                lastName: true,
                username: true,
                password: false
            }
        })
        return user;
    }

    public async insertUser(user: CreateUserDto): Promise<User>{
        const userCreated = await this.prisma.user.create({
            data: user,
            select: {
                id: true,
                name: true,
                lastName: true,
                username: true,
                password: false
            }
        })
        return userCreated;
    }

    public async updateUser(id: number, userUpdate: UpdateUserDto): Promise<User>{
        const userUpdated = await this.prisma.user.update({
            where: { id },
            data: userUpdate,
            select: {
                id: true,
                name: true,
                lastName: true,
                username: true,
                password: false
            }
        })
        return userUpdated;
    }

    public async deleteUser(id: number): Promise<User | null>{

        //Primero eliminar las tareas del usuario (Considerar segun la logica del negocio, lo ideal seria 
        //que el usuario no pueda ser eliminado si tiene tareas)
        await this.prisma.task.deleteMany({
            where: { user_id: id }
        })

        //Luego eliminar el usuario 
        const userDeleted = await this.prisma.user.delete({
            where: { id },
            select: {
                id: true,
                name: true,
                lastName: true,
                username: true,
                password: false
            }
        })
        return userDeleted;
    }   
}