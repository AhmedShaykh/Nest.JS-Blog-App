import { Controller, Delete, Get, Param, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { UserService } from "./user.service";

@UseGuards(AuthGuard)
@Controller("user")
export class UserController {

    constructor(private readonly userService: UserService) { };

    @Get("/")
    findAll() {
        return this.userService.findAll();
    };

    @Get("/me")
    getMyInfo(@Req() req) {
        return req.user;
    };

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.userService.findOne(id);
    };

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.userService.remove(id);
    };

};