import { IsEmail, IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email formati noto‘g‘ri' })
  @IsNotEmpty({ message: 'Email kiritish shart' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak' })
  @IsNotEmpty({ message: 'Parol kiritish shart' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Foydalanuvchi to‘liq ismini kiriting' })
  fullName: string;

  @IsUUID()
  @IsNotEmpty({ message: 'Role ID kiritish shart' })
  roleId: string;
}

