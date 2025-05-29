import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreatePostDTO, UpdatePostDTO } from "./post.dto";
import { Post, PostDocument } from "./post.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

@Injectable()
export class PostService {

    constructor(@InjectModel(Post.name) private readonly postModel: Model<PostDocument>) { };

    async create(data: CreatePostDTO, user: any) {

        try {

            const post = await this.postModel.create({
                title: data.title,
                content: data.content,
                isPublished: data.isPublished,
                user: new Types.ObjectId(user.id),
                date: new Date().toISOString()
            });

            return { message: "Post Successfully Added", post };

        } catch (error) {

            throw new BadRequestException("Post Not Added");

        }

    };

    async findAll() {

        return this.postModel.find().populate("user", "-password").exec();

    };

    async findOne(id: string) {

        const post = await this.postModel.findById(id).populate("user", "-password").exec();

        if (!post) {

            throw new BadRequestException("Post Not Found");

        }

        return post;

    };

    async findByAuthor(userId: string) {

        const posts = await this.postModel.find({ user: new Types.ObjectId(userId) }).populate("user", "-password").exec();

        if (!posts || posts.length === 0) {

            throw new BadRequestException("No Posts Found");

        }

        return posts;

    };

    async update(id: string, update: UpdatePostDTO, userId: string) {

        const post = await this.postModel.findById(id).exec();

        if (!post) {

            throw new NotFoundException("Post Not Found");

        }

        if (post.user.toString() !== userId.toString()) {

            throw new NotFoundException("Unauthorized To Update This Post");

        }

        try {

            post.title = update.title ?? post.title;

            post.content = update.content ?? post.content;

            post.isPublished = update.isPublished ?? post.isPublished;

            await post.save();

            return { message: "Post Successfully Updated", post };

        } catch (error) {

            throw new BadRequestException("Post Not Updated");

        }

    };

    async remove(id: string, userId: string) {

        const post = await this.postModel.findById(id).exec();

        if (!post || post.user.toString() !== userId.toString()) {

            throw new NotFoundException("Invalid Post Or Unauthorized");

        }

        try {

            await this.postModel.deleteOne({ _id: id }).exec();

            return "Post Successfully Deleted";

        } catch (error) {

            throw new BadRequestException("Post Not Removed");

        }

    };

};