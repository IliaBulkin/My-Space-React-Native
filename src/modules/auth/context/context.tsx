import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import {
	IUser,
	IAuthContext,
	IAuthContextProviderProps,
} from "./context.types";
import { Response } from "../../../shared/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { IReturnError } from "../../../shared/types/response";


const initialValue: IAuthContext = {
	user: null,
	token: null,
	justRegistered: false,
	setJustRegistered: (value: boolean) => {},
	login: async (
		email: string,
		password: string
	): Promise<IReturnError[] | string> => "",
	register: async (
		email: string,
		password: string
	): Promise<IReturnError[] | string> => "",
	isAuthenticated: () => false,
	logout: () => {},
	registerEmail: async (email: string, password: string, code: number) => {
		return "";
	},
	getData: async (token: string) => {}
};

const authContext = createContext<IAuthContext>(initialValue);

export function useAuthContext() {
	return useContext(authContext);
}

export function AuthContextProvider(props: IAuthContextProviderProps) {
	const [user, setUser] = useState<IUser | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [justRegistered, setJustRegistered] = useState<boolean>(false);

	const router = useRouter();

	const BASE_URL = "http://192.168.3.11:3011";

	async function registerEmail(
		email: string,
		password: string,
		code: number
	) {
		try {
			const response = await fetch(`${BASE_URL}/user/verify-email-code`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: email,
					password: password,
					code: code,
				}),
			});

			const result = await response.json();
			if (result.status === "error") {
				return result.message;
			}

			await AsyncStorage.setItem("token", result.data);

			// const meResponse = await fetch(`${BASE_URL}/user/me`, {
			// 	headers: { Authorization: `Bearer ${result.data}` },
			// });
			// const meResult: Response<IUser> = await meResponse.json();

			// if (meResult.status === "success") {
			// 	const userData = meResult.data;
			// 	await AsyncStorage.setItem("user", JSON.stringify(userData));
			// 	setUser(userData);
			// }
			await getData(result.data);
			await getToken()
			setJustRegistered(true);

			

			router.replace("/main/");
			return "";
		} catch (error) {
			console.error(error);
			return "";
		}
	}

	async function getData(token: string) {
		try {
			const response = await fetch(`${BASE_URL}/user/me`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			const result: Response<IUser> = await response.json();
			if (
				result.status === "error" ||
				result.status === "error-validation"
			) {
				return;
			}
			setUser(result.data);
		} catch (error) {
			console.error(error);
		}
	}

	async function login(email: string, password: string) {
		try {
			const response = await fetch(`${BASE_URL}/user/auth`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			const result: Response<string> = await response.json();
			if (result.status === "error") {
				return result.message;
			}
			if (result.status === "error-validation") {
				return result.data;
			}
			await AsyncStorage.setItem("token", result.data);
			// await AsyncStorage.setItem("userEmail", email);
			await getData(result.data);
			await getToken()
			router.replace("/main/");
			return "";
		} catch (error) {
			console.error(error);
			return "";
		}
	}

	async function register(email: string, password: string) {
		try {
			const response = await fetch(`${BASE_URL}/user/reg`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email,
					password,
				}),
			});

			const result: Response<string> = await response.json();
			if (result.status === "error") {
				return result.message;
			}
			if (result.status === "error-validation") {
				return result.data;
			}

			await fetch(`${BASE_URL}/user/send-email-code`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});

			router.replace({
				pathname: "/register-email/",
				params: { email: email, password: password },
			});
			return "";
		} catch (error) {
			console.error(error);
			return "";
		}
	}

	function isAuthenticated() {
		return !!user;
	}

	async function logout() {
		await AsyncStorage.removeItem("token");
		setUser(null);
		setToken(null);
		router.replace("/login/");
	}

	async function getToken() {
		const token = await AsyncStorage.getItem("token");
		if (!token) return;
		setToken(token);
	}


	return (
		<authContext.Provider
			value={{
				user,
				token,
				justRegistered,
				setJustRegistered,
				login,
				register,
				isAuthenticated,
				logout,
				registerEmail,
				getData, 
			}}
		>
			{props.children}
		</authContext.Provider>
	);
}

// modal context

type ModalContextType = {
	isCreateVisible: boolean;
	isEditVisible: boolean;
	openCreateModal: () => void;
	closeCreateModal: () => void;
	openEditModal: (postId: number) => void;
	closeEditModal: () => void;
	editPostId: number | null;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [isCreateVisible, setCreateVisible] = useState(false);
	const [isEditVisible, setEditVisible] = useState(false);

	const [editPostId, setEditPostId] = useState<number | null>(null);

	const openEditModal = (postId: number) => {
		setCreateVisible(false);
		setEditVisible(true);
		setEditPostId(postId);
	};

	const closeEditModal = () => {
		setEditVisible(false);
		setEditPostId(null);
	};

	const openCreateModal = () => {
		setEditVisible(false);
		setEditPostId(null);
		setCreateVisible(true);
	};

	const closeCreateModal = () => setCreateVisible(false);

	return (
		<ModalContext.Provider
			value={{
				isCreateVisible,
				isEditVisible,
				openCreateModal,
				closeCreateModal,
				openEditModal,
				closeEditModal,
				editPostId,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
};

export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) throw new Error("useModal must be used inside ModalProvider");
	return context;
};
