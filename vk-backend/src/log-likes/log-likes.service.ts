import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from '../post/entities/post.entity';
import { LogLikesEntity } from './entities/log-likes.entity';

@Injectable()
export class LogLikesService {
	constructor(
		@InjectRepository(LogLikesEntity)
		private readonly logLikesRepository: Repository<LogLikesEntity>,
		@InjectRepository(PostEntity)
		private readonly postRepository: Repository<PostEntity>
	) {}

	async checkExists(userId: number, postId: number) {
		return this.logLikesRepository
			.find({
				where: { user: { id: userId }, post: { id: postId } }
			})
			.then((res) => !!res.length);
	}

	async getAllCount(postId: number) {
		const count = await this.logLikesRepository
			.findAndCount({
				where: { post: { id: postId } }
			})
			.then((count) => count[1]);

		return count;
	}

	async toggle(userId: number, postId: number) {
		const post = await this.postRepository.findOne({
			where: { id: postId }
		});
		if (!post) {
			throw new HttpException('Post is not found', HttpStatus.NOT_FOUND);
		}

		const values = {
			user: { id: +userId },
			post: { id: +postId }
		};
		const isExists = await this.checkExists(+userId, +postId);
		if (isExists) {
			return this.logLikesRepository.delete(values).then((res) => false);
		}
		const logLikes = this.logLikesRepository.create(values);
		return this.logLikesRepository.save(logLikes).then((res) => true);
	}
}
