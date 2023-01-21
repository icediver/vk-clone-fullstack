import { IsEnum, IsString } from 'class-validator';
import { EnumGender } from '../user.interface';

export class UserDto {
	@IsString()
	name: string;

	@IsString()
	city: string;

	@IsString()
	birthDate: string;

	@IsEnum(EnumGender)
	gender: string;

	@IsString()
	avatarPath: string;
}
