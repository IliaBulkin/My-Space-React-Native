import { IUser } from "./user";

export interface IUserPost {
	id?: number;
	userId?: number;

	name: string;
	description: string;
	image: string[];
	defaultTags: string[];
	customTags: string[];
	link: string[];

	// avatar?: string;
	likes?: number;
	views?: number;
	data?: any;
}

export type IUserPostWithUser = IUserPost & { user: IUser };

export interface IUserFromBackend {
	name: string | null;
	id: number;
	email: string;
	surname: string | null;
	phoneNumber: string | null;
	birthDate: Date | null;
	image: string | null;
	username: string | null;
}

export type IUserAdditionalInfo = Omit<IUserFromBackend, "id" | "phoneNumber" | "birthDate" | "image" | "email">

export interface IPostFromBackend {
	userId: number;
	id: number;
	title: string;
	text: string;
	views: number;
	likes: number;
	link: string[] | null;
	tags: string[];
	images: string[];
	user: IUserFromBackend;
}
