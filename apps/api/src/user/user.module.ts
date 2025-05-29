import { UserController } from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.model";
import { UserService } from "./user.service";
import { JwtService } from "@nestjs/jwt";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    controllers: [UserController],
    providers: [
        UserService,
        JwtService
    ]
})
export class UserModule { };