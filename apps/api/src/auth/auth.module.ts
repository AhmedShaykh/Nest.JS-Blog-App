import { ConfigModule, ConfigService } from "@nestjs/config";
import { User, UserSchema } from "src/user/user.model";
import { AuthController } from "./auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>("JWT_SECRET"),
                signOptions: { expiresIn: "6d" }
            }),
        })
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { };