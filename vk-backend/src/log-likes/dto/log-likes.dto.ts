import { IsNumber } from 'class-validator';

export class CreateLogLikesDto {
	@IsNumber()
	postId: number;
}
