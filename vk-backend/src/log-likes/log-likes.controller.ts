import { Controller, Get, HttpCode, Param, Put } from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from '../user/decorators/user.decorator';
import { LogLikesService } from './log-likes.service';

@Controller('log-like')
export class LogLikesController {
	constructor(private readonly logLikesService: LogLikesService) {}

	//--------------------Create--------------------//
	@HttpCode(200)
	@Put('/:postId')
	@Auth()
	async createLog(
		@Param('postId') postId: number,
		@CurrentUser('id') userId: number
	) {
		return this.logLikesService.toggle(+userId, +postId);
	}

	//--------------------Read----------------------//

	@Get('check-exists/:postId')
	@Auth()
	async checkExists(
		@Param('postId') postId: number,
		@CurrentUser('id') userId: number
	) {
		return this.logLikesService.checkExists(userId, postId);
	}

	@Get('get-count/:postId')
	async getAllCount(@Param('postId') postId: number) {
		return this.logLikesService.getAllCount(postId);
	}

	//--------------------Update--------------------//
	//--------------------Delete--------------------//
}
