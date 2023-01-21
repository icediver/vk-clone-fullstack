import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';

import AddPost from '@/components/ui/posts/AddPost';
import Posts from '@/components/ui/posts/Posts';

import { PostService } from '@/services/post.service';

const ProfilePosts: FC<{ userId: number }> = ({ userId }) => {
	const { data, isLoading, refetch } = useQuery(
		['get post by user id', userId],
		() => PostService.getByUserId(userId),
		{
			select: ({ data }) => data,
			enabled: !!userId
		}
	);
	return (
		<div>
			<AddPost refetch={refetch} col={2} />
			<Posts posts={data || []} isLoading={isLoading} refetchPosts={refetch} />
		</div>
	);
};

export default ProfilePosts;
