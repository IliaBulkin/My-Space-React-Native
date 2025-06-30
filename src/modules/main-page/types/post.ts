import { IUser } from "../../auth/context/context.types";

export interface IUserPost {
	id?: number;
	author_id?: number;

	title: string;
	content: string;
	images: string[];
	existingTags: string[]; 
	newTags: string[];
	link: string[];

	likes?: number;
	views?: number;
	data?: any;
}

export type IUserPostWithUser = IUserPost & { user: IUserFromBackend };

export interface IUserFromBackend {
	id: number;
	email: string;
	first_name: string | null;
	last_name: string | null;
	username: string | null;
	profile: {
		dateOfBirth: string | null;
		avatars: { url: string }[]; // или просто string[] если ты так возвращаешь
	};
}

export type IUserAdditionalInfo = Omit<
	IUserFromBackend,
	"id" | "email" | "profile"
> & {
	profile: {
		dateOfBirth: string | null;
	};
};

export interface IPostFromBackend {
	id: number;
	userId: number;
	title: string;
	text: string;
	views: number;
	likes: number;
	link: string[] | null;
	tags: string[];
	images: string[];
	user: IUserFromBackend;
}
