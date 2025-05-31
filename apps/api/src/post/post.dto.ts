import { IsBoolean, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class CreatePostDTO {
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsBoolean()
    isPublished: boolean;
};

export class UpdatePostDTO extends PartialType(CreatePostDTO) { };