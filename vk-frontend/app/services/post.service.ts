import { IPost, IPostField } from '@/types/post.interface';

import { axiosAuth, axiosClassic } from '../api/interceptors';

export const PostService = {
	async getAll() {
		return axiosClassic.get<IPost[]>(`/post`);
	},

	async getByUserId(userId: number) {
		return axiosClassic.get<IPost[]>(`/post/by-userId/${userId}`);
	},

	async create(body: IPostField) {
		return axiosAuth.post<IPost>(`/post`, body);
	},

	async delete(postId: number) {
		return axiosAuth.delete(`/post/${postId}`);
	}
};
