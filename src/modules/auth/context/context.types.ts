import { ReactNode } from "react";
import { IReturnError } from "../../../shared/types/response";

export interface IUser {
	id: number;
    name?: string;
    surname?: string
    email?: string;
    phoneNumber?: string
    birthDate?: Date
    image?: string
    username?: string
}

export interface IAuthContext {
	user: IUser | null;
	token: string | null;
	justRegistered: boolean;
	setJustRegistered: (value: boolean) => void;
	login: (email: string, password: string) => Promise<IReturnError[] | string>;
	register: (
		email: string,
		password: string,
	) => Promise<IReturnError[] | string>;
	isAuthenticated: () => boolean;
	logout: () => void;
	registerEmail: (email: string, password: string, code: number) => Promise<string | IReturnError[]>;
	getData: (token: string) => Promise<void>;
}

export interface IAuthContextProviderProps {
	children?: ReactNode;
}
// export { IReturnError };

