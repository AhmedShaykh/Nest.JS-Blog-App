import { BadRequestException, Injectable } from "@nestjs/common";
import { User, UserDocument } from "./user.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { };

    async findAll() {

        return this.userModel.find({}, { password: 0 }).exec();

    };

    async findOne(id: string) {

        const user = await this.userModel.findById(id, { password: 0 }).exec();

        if (!user) {

            throw new BadRequestException("No User Found");

        }

        return user;

    };

    async remove(id: string) {

        const result = await this.userModel.deleteOne({ _id: id }).exec();

        if (!result.deletedCount) {

            throw new BadRequestException(`User with id ${id} not found or already removed.`);

        }

        return { message: `User #${id} Removed Successfully.` };

    }

};