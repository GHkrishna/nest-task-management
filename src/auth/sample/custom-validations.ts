import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsersRepository } from "../users.repository";

@ValidatorConstraint({name: 'isValid'})
@Injectable()
export class isValid implements ValidatorConstraintInterface{
    constructor(private usersRepository: UsersRepository){}
    
    validate(var1: number ): boolean {
        if(var1 > 5){
            return true;
        }
        else
        return false;
    }

    defaultMessage(args: ValidationArguments): string {
        return 'var1 must be greater than 5';
    }
}