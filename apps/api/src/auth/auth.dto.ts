import { IsString } from "class-validator";

export class LoginDTO {
    @IsString()
    email: string;

    @IsString()
    password: string;
};

export class RegisterDTO {
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string;
};