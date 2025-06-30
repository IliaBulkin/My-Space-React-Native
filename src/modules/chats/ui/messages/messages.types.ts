export interface IMessage {
	id: number;
	members: {
		profile_id: number;
		profile: {
			user: {
				id: number;
				username: string;
				first_name: string;
				last_name: string;
				email: string;
			};
			avatars: {
				image: string;
			}[];
		};
	}[];
	messages: {
		id: number;
		content: string;
		sent_at: string;
		attached_image: string;
		author_id: number;
		chat_group_id: number;
		author: {
			id: number;
			user_id: number;
		};
	}[];
}

// admin_id: bigint;
// admin: {
// 	id: bigint;
// 	date_of_birth: Date;
// 	signature: string | null;
// 	user_id: number;
// };

export interface IGroupChat {
	id: number;
	name: string;
	avatar: string;
	admin_id: number
	members: {
		profile_id: number;
		profile: {
			user: {
				id: number;
				username: string;
				first_name: string;
				last_name: string;
				email: string;
			};
			avatars: {
				image: string;
			}[];
		};
	}[];
	messages: {
		id: number;
		content: string;
		sent_at: string;
		attached_image: string;
		author_id: number;
		chat_group_id: number;
		author: {
			id: number;
			user_id: number;
		};
	}[];
}

// {
//     "status": "success",
//     "chats": [
//         {
//             "id": 12,
//             "name": "Group 1",
//             "avatar": "images/avatars/1750889613625-r4xux7.",
//             "members": [],
//             "messages": []
//         }
//     ]
// }

export interface IMessageData {
	id: number;
	content: string;
	sent_at: string;
	attached_image: string;
	author_id: number;
	chat_group_id: number;
	author: {
		user: {
			id: number;
			first_name: string;
			last_name: string;
			email: string;
			username: string;
		};
		avatars: {
			image: string;
		}[];
	};
}
