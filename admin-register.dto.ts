import {
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
  MinLength,
} from 'class-validator';
import { MESSAGE, REGEX } from 'src/app.utils';

export class AdminRegisterRequestDto {
  @IsNotEmpty()
  @IsEmail()
  @MinLength(4)
  email: string;

  @IsNotEmpty()
  @MinLength(4)
  username: string;

  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGE.PASSWORD_RULE_MESSAGE })
  password: string;

  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE)
  confirmPassword: string;
}
