export interface FriendCard {
	id: number;
	user: {
		first_name: string;
		last_name: string;
		username: string;
		id: number;
	};
	avatars: [
		{
			image: string;
		}
	];
}

export interface FriendRequestType {
	id: number;
	profile1: {
		user: {
			first_name: string;
			last_name: string;
			username: string;
			id: number;
		};
		avatars: [
			{
				image: string;
			}
		];
	};
}
