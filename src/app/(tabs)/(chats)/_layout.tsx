import { Stack } from "expo-router";
import { Header } from "../../../shared/ui/header";
import { NewGroupModalOne } from "../../../modules/chats/ui/modals/ui/new-group-modal-one/new-group-modal-one";
import { useCreateGroupChatContext } from "../../../modules/chats/context/create-group-chat.context";
import { NewGroupModalTwo } from "../../../modules/chats/ui/modals/ui/new-group-modal-two/new-group-modal-two";

export default function RootLayout() {
	const { step, setStep, getGroups } = useCreateGroupChatContext();
	return (
		<>
			<Stack
				screenOptions={{
					headerShown: false,
					contentStyle: { backgroundColor: "#FAF8FF" },
				}}
			></Stack>
			<NewGroupModalOne
				visible={step === "one"}
				onClose={() => setStep("none")}
				onNext={() => setStep("two")}
			/>
			<NewGroupModalTwo
				visible={step === "two"}
				onClose={() => setStep("none")}
				onBack={() => setStep("one")}
				onRefresh={getGroups}
			/>
		</>
	);
}
