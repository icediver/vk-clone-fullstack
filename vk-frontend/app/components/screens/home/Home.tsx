import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';

import Layout from '@/components/layout/Layout';
import AddPost from '@/components/ui/posts/AddPost';
import Posts from '@/components/ui/posts/Posts';

import { PostService } from '@/services/post.service';

const Home: FC = () => {
	const { data, isLoading, refetch } = useQuery(
		['get all posts'],
		() => PostService.getAll(),
		{
			select: ({ data }) => data
		}
	);

	return (
		<Layout title='Главная'>
			<AddPost refetch={refetch} />
			<Posts posts={data || []} isLoading={isLoading} refetchPosts={refetch} />
		</Layout>
	);
};

export default Home;
