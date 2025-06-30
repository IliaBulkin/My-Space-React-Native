import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ReactNode, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, View } from "react-native";
import { AuthContextProvider } from "../modules/auth/context";
import { customMainFonts } from "../shared/tools/customMainFont";
import { ModalProvider } from "../modules/auth/context";
import { SocketContextProvider } from "../modules/chats/context/socket.context";
import { CreateGroupChatContextProvider } from "../modules/chats/context/create-group-chat.context";
import { UpdateGroupChatContextProvider } from "../modules/chats/context/update-group-chat.context";

export function Providers({ children }: { children: ReactNode }) {
	const [fontsLoaded] = customMainFonts();

	if (!fontsLoaded) return null;
	return (
		<SafeAreaProvider>
			<AuthContextProvider>
				<SocketContextProvider>
					<ModalProvider>
						<CreateGroupChatContextProvider>
							<UpdateGroupChatContextProvider>
								<StatusBar style="auto" />
								{/* #E9E5EE */}
								<SafeAreaView
									style={{
										flex: 1,
										backgroundColor: "white",
									}}
									edges={["bottom", "top"]}
								>
									{children}
								</SafeAreaView>
							</UpdateGroupChatContextProvider>
						</CreateGroupChatContextProvider>
					</ModalProvider>
				</SocketContextProvider>
			</AuthContextProvider>
		</SafeAreaProvider>
	);
}
