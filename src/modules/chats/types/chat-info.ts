export interface IContactCard {
	image?: string;
	name?: string;
	surname?: string;
	text?: string;
	date?: string;
	wasWatched?: boolean;
	attachedImage?: string
}

export interface IMyMessage {
	text: string;
	date: Date;
	wasWatched: boolean;
}

export interface IAnotherUserMessage {
	image?: string;
	name: string;
	surname: string;
	text: string;
	date: Date;
	wasWatched: boolean;
}

export interface IGroupCard {
	image?: string;
	name: string;
	text?: string;
	date?: Date;
	wasWatched?: boolean;
}
export interface IChatInfo{
	name: string
	avatar?: string
	members: {
		profile_id: number
		profile: {
			user: {
				id: number
				username: string
				first_name: string
				last_name: string
				email: string
			},
			avatars: [
				{
					image: string
				}
			]
		}
	}[]
}
