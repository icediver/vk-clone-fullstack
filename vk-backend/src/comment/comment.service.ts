import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
	constructor(
		@InjectRepository(CommentEntity)
		private readonly commentRepository: Repository<CommentEntity>
	) {}

	async byPostId(postId: number) {
		return await this.commentRepository.find({
			where: {
				post: { id: postId }
			},
			relations: { user: true },
			select: { user: { name: true, avatarPath: true, isVerified: true } },
			order: { createdAt: 'desc' }
		});
	}

	async create(userId: number, dto: CreateCommentDto) {
		const comment = this.commentRepository.create({
			message: dto.message,
			user: { id: userId },
			post: { id: dto.postId }
		});
		return this.commentRepository.save(comment);
	}
}
