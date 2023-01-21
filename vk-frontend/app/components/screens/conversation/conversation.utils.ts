import { IMessage } from '@/types/message.interface';

export const isCurrentUserMessage = (item: IMessage, currentUserId?: number) =>
	currentUserId === item.userFrom.id;
