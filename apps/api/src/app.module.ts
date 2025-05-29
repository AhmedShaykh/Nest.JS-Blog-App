import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { PostModule } from "./post/post.module";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => {
        if (!config.DATABASE_URL) {
          throw new Error("DATABASE URL Is Not Defined In The Environment Variables.");
        }
        return config;
      }
    }),
    MongooseModule.forRoot(
      process.env.DATABASE_URL!
    ),
    AuthModule,
    UserModule,
    PostModule
  ],
  controllers: [],
  providers: []
})
export class AppModule { };