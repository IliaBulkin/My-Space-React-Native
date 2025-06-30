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
import { HOST } from "../../../shared/base-url/base-url";

export interface ISocketContext {
	socket: Socket<IServerEvents, IClientEvents> | null;
}

interface ISocketContextProviderProps {
	children?: ReactNode;
}

const SocketContext = createContext<ISocketContext | null>(null);

export function useSocketContext() {
	const ctx = useContext(SocketContext);
	if (!ctx) throw new Error("UseSocketContext is not in Provider");
	return ctx;
}
export function SocketContextProvider({
	children,
}: ISocketContextProviderProps) {
	const [socket, setSocket] = useState<Socket<
		IServerEvents,
		IClientEvents
	> | null>(null);

	const [totalUnreadCount, setTotalUnreadCount] = useState<number>(0);
	const [unreadCounts, setUnreadCounts] = useState<{
		[chatId: number]: number;
	}>({});

	// useEffect(() => {
	// 	console.log(totalUnreadCount)
	// }, [totalUnreadCount])

	// useEffect(() => {
	// 	console.log(unreadCounts)
	// }, [unreadCounts])

	const { token } = useAuthContext();

	useEffect(() => {
		if (!token) return;
		const newSocket = io(`ws://${HOST}`, { auth: { token } });

		newSocket.on("connect", () => {
			// alert("Socket connected");
	 	});

		newSocket.on("disconnect", () => {
			// alert("Socket disconnected");
		});

		// newSocket.on("chatUpdate", (data) => {
		// 	setUnreadCounts((prev) => {
		// 		const updated = {
		// 			...prev,
		// 			[data.chatId]: ((prev && prev[data.chatId]) || 0) + 1,
		// 		};

		// 		setTotalUnreadCount(
		// 			Object.values(updated).reduce((a, b) => a + b, 0)
		// 		);
		// 		return updated;
		// 	});
		// });

		setSocket(newSocket);
		return () => {
			socket?.disconnect();
		};
	}, [token]);

	return <SocketContext value={{ socket }}>{children}</SocketContext>;
}
