import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from "class-validator";

export class AuthCredentialsDto {
  @MinLength(2)
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  username: string;

  // @MinLength(2)
  // @MaxLength(20)
  // Matches()
  @IsStrongPassword(
    {},
    {
      message:
        "Password must be of minimum 8 characters with atleast one Capital Letter, one Number and one Special Character",
    }
  )
  @IsString()
  @IsNotEmpty()
  password: string;
}
