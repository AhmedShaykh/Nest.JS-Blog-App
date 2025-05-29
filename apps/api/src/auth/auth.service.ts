import { BadRequestException, Injectable } from "@nestjs/common";
import { User, UserDocument } from "src/user/user.model";
import { LoginDTO, RegisterDTO } from "./auth.dto";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { Model } from "mongoose";

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService
    ) { };

    async signup(data: RegisterDTO) {

        const emailExist = await this.userModel.findOne({ email: data.email }).exec();

        if (emailExist) {

            throw new BadRequestException("Email Already Exists");

        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = new this.userModel({
            name: data.name,
            email: data.email,
            password: hashedPassword
        });

        await user.save();

        const payload = {
            id: user._id,
            name: user.name,
            email: user.email
        };

        return { token: await this.jwtService.signAsync(payload) };

    };

    async signin(data: LoginDTO) {

        const user = await this.userModel.findOne({ email: data.email }).exec();

        if (!user) {

            throw new BadRequestException("Invalid Email");

        }

        const isMatch = await bcrypt.compare(data.password, user.password);

        if (!isMatch) {

            throw new BadRequestException("Invalid Password");

        }

        const payload = {
            id: user._id,
            name: user.name,
            email: user.email
        };

        return { token: await this.jwtService.signAsync(payload) };

    };

};