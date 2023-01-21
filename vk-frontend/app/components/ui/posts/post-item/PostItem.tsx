import { useQuery } from '@tanstack/react-query';
import { Card, Image } from 'antd';
import { FC, useState } from 'react';

import styles from '@/components/ui/posts/Post.module.scss';
import DeletePostButton from '@/components/ui/posts/post-item/DeletePostButton';
import UserInfo from '@/components/ui/posts/post-item/UserInfo';
import PostActions from '@/components/ui/posts/post-item/post-actions/PostActions';
import PostComments from '@/components/ui/posts/post-item/post-actions/post-comments/PostComments';

import { CommentService } from '@/services/comment.service';

import { IPost } from '@/types/post.interface';

import { useAuth } from '@/hooks/useAuth';

const PostItem: FC<{ post: IPost; refetchPosts: any }> = ({
	post,
	refetchPosts
}) => {
	const { user } = useAuth();

	const commentsQuery = useQuery(
		['get comments', post.id],
		() => CommentService.getByPostId(post.id),
		{
			enabled: !!post.id,
			select: ({ data }) => data
		}
	);
	const [isOpenComment, setIsOpenComment] = useState(false);
	return (
		<Card
			className={styles.item}
			bodyStyle={{
				transition: 'all .4s ease-in-out'
			}}
		>
			<UserInfo postDate={post.createdAt} user={post.user} />
			<p>{post.content}</p>
			{post.image && <Image width={400} src={post.image} alt='' />}
			<PostActions
				postId={post.id}
				countComments={commentsQuery.data?.length || 0}
				toggleComments={() => setIsOpenComment(!isOpenComment)}
			/>
			{isOpenComment && (
				<PostComments commentsQuery={commentsQuery} postId={post.id} />
			)}
			{post.user.id === user?.id && (
				<DeletePostButton postId={post.id} refetch={refetchPosts} />
			)}
		</Card>
	);
};

export default PostItem;
