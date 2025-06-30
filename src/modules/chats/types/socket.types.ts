
export interface IServerEvents {
	newMessage: (data: any) => void;
	chatUpdate: (data: any) => void;
}

export interface IClientEvents {
	joinChat: (data: any) => void;
	leaveChat: (data: any) => void;
    sendMessage: (
        data: any
    ) => void
}