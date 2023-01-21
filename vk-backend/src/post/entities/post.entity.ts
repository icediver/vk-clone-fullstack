import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { LogLikesEntity } from '../../log-likes/entities/log-likes.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { Base } from '../../utils/base';

@Entity('Post')
export class PostEntity extends Base {
	@Column()
	content: string;

	@Column({ default: '' })
	image?: string;

	// @OneToMany(() => CommentEntity, (comment) => comment.post)
	// comments: CommentEntity[];
	@ManyToOne(() => UserEntity)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity;

	@OneToMany(() => LogLikesEntity, (like) => like.post)
	likes: LogLikesEntity[];
}
