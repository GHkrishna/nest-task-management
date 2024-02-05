import { IsNotEmpty, IsNumber, IsString, Validate, ValidateNested } from "class-validator";
import { isValid } from "../sample/custom-validations";
import { Type } from "class-transformer";

export class TestDto{
    @Validate(isValid)
    @IsNumber()
    @IsNotEmpty()
    var1: number;
}