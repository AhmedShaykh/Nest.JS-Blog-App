import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "../user/user.model";

export type PostDocument = Post & Document;;

@Schema({ timestamps: true })
export class Post {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ default: false })
    isPublished: boolean;

    @Prop({ type: Types.ObjectId, ref: "User", required: true })
    user: User;

    @Prop()
    date: string;
};

export const PostSchema = SchemaFactory.createForClass(Post);