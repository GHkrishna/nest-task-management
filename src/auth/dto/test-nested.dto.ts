import { Type } from "class-transformer";
import { IsNotEmpty, IsNotEmptyObject, IsNumber, IsString, ValidateNested } from "class-validator";
import { TestDto } from "./test.dto";

export class NestedDto{
    @ValidateNested({each: true})
    @Type(() => TestDto)
    var1: TestDto[];
}

export class Blog{
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string
}

export class NestedArrayDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @ValidateNested({each: true})
    @Type(() => Blog)
    @IsNotEmptyObject()
    blogs : Blog[]
}