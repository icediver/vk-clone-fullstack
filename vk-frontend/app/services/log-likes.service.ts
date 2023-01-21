import { axiosAuth, axiosClassic } from '../api/interceptors';

export const LogLikeService = {
	async getCountLikesByPostId(postId: number) {
		return axiosClassic.get<number>(`/log-like/get-count/${postId}`);
	},

	async checkExists(postId: number) {
		return axiosAuth.get<boolean>(`/log-like/check-exists/${postId}`);
	},

	async toggleLike(postId: number) {
		return axiosAuth.put(`/log-like/${postId}`);
	}
};
