import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';

import { UserService } from '@/services/user.service';

import { useDebounce } from '@/hooks/useDebounce';
import { useOutside } from '@/hooks/useOutside';

export const useSearch = () => {
	const visible = useOutside(false);

	const [searchTerm, setSearchTerm] = useState('');
	const debounceSearch = useDebounce(searchTerm, 500);

	const { data, isLoading } = useQuery(
		['search users', debounceSearch],
		() => UserService.findUsers(debounceSearch),
		{
			select: ({ data }) => data,
			enabled: !!debounceSearch,
			onSuccess: () => {
				visible.setIsShow(true);
			}
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	return {
		handleSearch,
		setSearchTerm,
		isLoading,
		data,
		searchTerm,
		visible
	};
};
