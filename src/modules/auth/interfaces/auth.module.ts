import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from "../../user/interfaces/user.module";
import { PrismaService } from "src/common/services/prisma.service";
import { UtilService } from "src/common/services/util.service";

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_ACCESS_SECRET'),
                signOptions: { expiresIn: '60s' },
            }),
        }),
        UserModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, PrismaService, UtilService]
})
export class AuthModule { }
