export interface FriendCard {
	id: string;
	image: string;
	name: string;
	surname: string;
	username: string;
}

export interface FriendRequestType {
	id: number;
	fromUser: number;
	toUser: number;
	isAccepted: boolean;
	fromUserDetails: FriendCard;
}