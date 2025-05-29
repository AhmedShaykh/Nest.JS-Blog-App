import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, Req } from "@nestjs/common";
import { CreatePostDTO, UpdatePostDTO } from "./post.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { PostService } from "./post.service";

@UseGuards(AuthGuard)
@Controller("post")
export class PostController {

    constructor(private readonly postService: PostService) { };

    @Post("/")
    create(@Body() data: CreatePostDTO, @Request() req) {
        return this.postService.create(data, req.user);
    };

    @Get("/")
    findAll() {
        return this.postService.findAll();
    };

    @Get("/posts")
    myPosts(@Req() req) {

        const id = req.user.id;

        return this.postService.findByAuthor(id);

    };

    @Get("/:id")
    findOne(@Param("id") id: string) {
        return this.postService.findOne(id);
    };

    @Get("/author/:id")
    findByAuthor(@Param("id") id: string) {
        return this.postService.findByAuthor(id);
    };

    @Put("/:id")
    update(@Param("id") id: string, @Body() updatePostDto: UpdatePostDTO, @Request() req) {
        return this.postService.update(id, updatePostDto, req.user.id);
    };

    @Delete("/:id")
    remove(@Param("id") id: string, @Request() req) {
        return this.postService.remove(id, req.user.id);
    };

};