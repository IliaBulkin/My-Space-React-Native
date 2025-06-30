import { IUserFromBackend } from "./post";
import { IUser } from "../../auth/context/context.types";

export interface IBackendPost {
	tags: string[];
    links: string[];
    images: string[];
    likes: number;
    views: number;
    author: {
        user: {
            id: number;
            username: string;
            first_name: string;
            last_name: string;
            email: string;
            profile: {
                avatars: {
					image: string;
				}[];
            } | null;
        };
    };
    id: number;
    title: string;
    content: string;
    author_id: number;
}


// export interface IPostProps {
// 	id?: number;
// 	name: string;
// 	text: string;
// 	hashtags?: string[];
// 	photo?: string[];
// 	link?: string[];
// 	likes: number;
// 	views: number;
// 	user: IUser; 
// 	onRefresh?: () => void;
// }

export interface IPostProps{
	tags: string[];
    links: string[];
    images: string[];
    likes: number;
    views: number;
    author: {
        user: {
            id: number;
            username: string;
            first_name: string;
            last_name: string;
            email: string;
            profile: {
                avatars: {
					image: string;
				}[];
            } | null;
        };
    };
    id: number;
    title: string;
    content: string;
    author_id: number;
}