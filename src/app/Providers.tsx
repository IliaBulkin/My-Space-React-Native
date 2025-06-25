import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ReactNode, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, View } from "react-native";
import { AuthContextProvider } from "../modules/auth/context";
import { customMainFonts } from "../shared/tools/customMainFont";
import { ModalProvider } from "../modules/auth/context"

export function Providers({ children }: { children: ReactNode }) {
	const [fontsLoaded] = customMainFonts();

	if (!fontsLoaded) return null;
	return (
		<SafeAreaProvider>
			<AuthContextProvider>
				<ModalProvider>
					<StatusBar style="auto" />
					{/* #E9E5EE */}
					<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
						{children}
					</SafeAreaView>
				</ModalProvider>
			</AuthContextProvider>
		</SafeAreaProvider>
	);
}
