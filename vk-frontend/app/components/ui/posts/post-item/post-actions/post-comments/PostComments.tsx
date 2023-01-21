import { Skeleton } from 'antd';
import { FC } from 'react';

import AddComment from '@/components/ui/posts/post-item/post-actions/post-comments/AddComment';
import CommentItem from '@/components/ui/posts/post-item/post-actions/post-comments/CommentItem';

import { IComment } from '@/types/comment.interface';

import { useAuth } from '@/hooks/useAuth';

import styles from './PostComments.module.scss';

interface IQueryData {
	refetch: any;
	data?: IComment[];
	isLoading: boolean;
}

const PostComments: FC<{ commentsQuery: IQueryData; postId: number }> = ({
	commentsQuery: { refetch, data, isLoading },
	postId
}) => {
	const { user } = useAuth();

	return (
		<div className={'fade '}>
			{user && <AddComment postId={postId} refetch={refetch} />}
			{isLoading ? (
				<Skeleton />
			) : data?.length ? (
				<div className={styles.grid}>
					{data.map(comment => (
						<CommentItem comment={comment} key={comment.id} />
					))}
				</div>
			) : (
				<p>Comments not found</p>
			)}
		</div>
	);
};

export default PostComments;
