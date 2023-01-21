import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from './decorators/user.decorator';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	//--------------------Create--------------------//
	//--------------------Read----------------------//
	@Get('profile')
	@Auth()
	async getProfile(@CurrentUser('id') id: number) {
		const user = await this.userService.byId(id);

		return user;
	}

	@Get('by-id/:id')
	async getUser(@Param('id') id: number) {
		return this.userService.byId(id);
	}

	@Get('find/:searchTerm')
	async searchUser(@Param('searchTerm') searchTerm: string) {
		return this.userService.searchUser(searchTerm);
	}

	//--------------------Update--------------------//
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Patch('profile')
	async updateProfile(@CurrentUser('id') id: number, @Body() dto: UserDto) {
		return this.userService.updateProfile(id, dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put(':id')
	async updateUser(@Param('id') id: number, @Body() dto: UserDto) {
		return this.userService.updateProfile(id, dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Patch(':friendId')
	@Auth()
	async toggleFriend(
		@CurrentUser('id') currentUserId: number,
		@Param('friendId') friendId: number
	) {
		return this.userService.toggleFriend(+currentUserId, +friendId);
	}

	//--------------------Delete--------------------//

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.userService.remove(+id);
	}
}
