import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { getTypeOrmConfig } from './config/typeorm.config';
import { ConversationModule } from './conversation/conversation.module';
import { MediaModule } from './file/media.module';
import { LogLikesModule } from './log-likes/log-likes.module';
import { MessageModule } from './message/message.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({
	imports: [
		ConfigModule.forRoot(),

		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getTypeOrmConfig
		}),

		UserModule,
		AuthModule,
		MessageModule,
		PostModule,
		CommentModule,
		LogLikesModule,
		ConversationModule,
		MediaModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
