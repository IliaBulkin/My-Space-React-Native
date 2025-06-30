import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { IClientEvents, IServerEvents } from "../types/socket.types";
import { useAuthContext } from "../../auth/context";
import { HOST, HTTPS_HOST } from "../../../shared/base-url/base-url";
import { FriendCard } from "../../friends-page/types/friend-info";
import {
	Control,
	useForm,
	UseFormHandleSubmit,
	UseFormSetValue,
} from "react-hook-form";
import { IGroupChat } from "../ui/messages/messages.types";

export interface ICreateGroupChatContext {
	setSelectedFriends: (value: FriendCard[]) => void;
	selectedFriends: FriendCard[];
	setTotalSelected: (value: number) => void;
	totalSelected: number;
	avatar: string;
	setAvatar: (value: string) => void;
	handleSubmit: UseFormHandleSubmit<{ name: string }>;
	control: Control<{ name: string }, any>;
	setValue: UseFormSetValue<{ name: string }>;
	step: "none" | "one" | "two";
	setStep: (value: "none" | "one" | "two") => void;
	getGroups: () => void;
	chats: IGroupChat[]
}

interface ICreateGroupChatContextProviderProps {
	children?: ReactNode;
}

const createGroupChatContext = createContext<ICreateGroupChatContext | null>(
	null
);

export function useCreateGroupChatContext() {
	const ctx = useContext(createGroupChatContext);
	if (!ctx) throw new Error("UseCreateGroupChatContext is not in Provider");
	return ctx;
}

export function CreateGroupChatContextProvider({
	children,
}: ICreateGroupChatContextProviderProps) {
	const { handleSubmit, control, setValue } = useForm<{ name: string }>({
		defaultValues: {
			name: "",
		},
	});
	const [selectedFriends, setSelectedFriends] = useState<FriendCard[]>([]);
	const [totalSelected, setTotalSelected] = useState<number>(0);
	const [avatar, setAvatar] = useState<string>("");
	const [step, setStep] = useState<"none" | "one" | "two">("none");
	const {token} = useAuthContext()

	const [chats, setChats] = useState<IGroupChat[]>([]);
	async function getGroups() {
		const response = await fetch(HTTPS_HOST + "/chat/group-chats", {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});

		const result = await response.json();

		if (result.status === "success") {
			setChats(result.chats);
		} else {
			alert("Помилка завантаження чатів");
		}
	}

	return (
		<createGroupChatContext.Provider
			value={{
				selectedFriends: selectedFriends,
				setSelectedFriends: setSelectedFriends,
				setAvatar: setAvatar,
				avatar: avatar,
				totalSelected: totalSelected,
				setTotalSelected: setTotalSelected,
				handleSubmit: handleSubmit,
				setValue: setValue,
				control: control,
				step: step,
				setStep: setStep,
				chats,
				getGroups
			}}
		>
			{children}
		</createGroupChatContext.Provider>
	);
}
