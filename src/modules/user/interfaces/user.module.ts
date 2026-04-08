import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { pgProvider } from "src/common/providers/pg.provider";
import { PrismaService } from "src/common/services/prisma.service"; 
import { UtilService } from "src/common/services/util.service";
import { JwtService } from '@nestjs/jwt';

@Module({
    controllers: [UserController],
    providers: [UserService, pgProvider, PrismaService, UtilService, JwtService],
    exports: [UserService, PrismaService, UtilService, JwtService]
})
export class UserModule { }