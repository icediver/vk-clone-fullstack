import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../post/entities/post.entity';
import { LogLikesEntity } from './entities/log-likes.entity';
import { LogLikesController } from './log-likes.controller';
import { LogLikesService } from './log-likes.service';

@Module({
	imports: [TypeOrmModule.forFeature([LogLikesEntity, PostEntity])],
	controllers: [LogLikesController],
	providers: [LogLikesService]
})
export class LogLikesModule {}
