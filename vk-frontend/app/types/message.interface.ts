import { IUser } from '@/types/user.interface';

export interface IMessage {
	id: number;
	text: string;
	userFrom: IUser;
	userTo: IUser;
}

export interface IMessageFields {
	text: string;
	userToId: number | undefined;
	conversationId: number;
	userFromId: number | undefined;
}

export interface IDeleteMessageFields
	extends Pick<IMessageFields, 'conversationId'> {
	messageId: number;
}

export interface IConversation {
	id: number;
	messages: IMessage[];
}
