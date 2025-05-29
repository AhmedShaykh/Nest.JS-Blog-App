import { Body, Controller, Post } from "@nestjs/common";
import { LoginDTO, RegisterDTO } from "./auth.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {

    constructor(private readonly authService: AuthService) { };

    @Post("/register")
    Signup(@Body() data: RegisterDTO) {
        return this.authService.signup(data);
    };

    @Post("/login")
    Signin(@Body() data: LoginDTO) {
        return this.authService.signin(data);
    };

};