import { View } from "react-native";
import { MessagesPage } from "../../../modules/chats/ui/messages/messages";
import { ChatsPageHeader } from "../../../modules/chats/ui/chats-page-header/chats-page-header";

export default function Messages() {
	return (
		<View style={{ flex: 1 }}>
			<ChatsPageHeader></ChatsPageHeader>
			<MessagesPage></MessagesPage>
		</View>
	);
}
