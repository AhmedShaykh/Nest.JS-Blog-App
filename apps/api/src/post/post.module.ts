import { PostController } from "./post.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Post, PostSchema } from "./post.model";
import { PostService } from "./post.service";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: "6d" }
        })
    ],
    controllers: [PostController],
    providers: [PostService]
})
export class PostModule { };