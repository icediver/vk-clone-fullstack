import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import { ChangeEvent } from 'react';

import { MediaService } from '@/services/media.service';

import { errorCatch } from '../../../api/api.utils';

export const useUploadFile = (
	onChange: (...event: any) => void,
	folder?: string
) => {
	const { mutateAsync } = useMutation(
		['upload file'],
		(data: FormData) => MediaService.upload(data, folder),
		{
			onSuccess: ({ data }) => {
				onChange(data);
			},
			onError: (error: any) => {
				notification.error({
					message: errorCatch(error)
				});
			}
		}
	);
	const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files?.length) return;

		const formData = new FormData();
		formData.append('media', files[0]);

		await mutateAsync(formData);
	};
	return { uploadFile };
};
