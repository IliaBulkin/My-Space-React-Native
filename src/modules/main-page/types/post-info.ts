import { IUser } from "./user";

export interface IBackendPost{
    id: number;
    title: string;
    text: string;
    views: number;
    likes: number;
    link: string[] | null;
    userId: number;
    tags: string[];
    images: string[];
    user: IUser
}

export interface IPostProps  {
    id?: number,
    name: string,
    // avatar: string,
    text: string,
    hashtags?: string[],
    photo?: string[],
    likes: number,
    views: number,
    user: IUser,
    onRefresh?: () => void;
}
