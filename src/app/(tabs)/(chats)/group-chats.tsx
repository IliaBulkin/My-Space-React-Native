import { View } from "react-native";
import { GroupChatsPage } from "../../../modules/chats/ui/group-chats/group-chats";
import { ChatsPageHeader } from "../../../modules/chats/ui/chats-page-header/chats-page-header";

export default function GroupChats() {
	return (
		<View style={{ flex: 1 }}>
			<ChatsPageHeader></ChatsPageHeader>
			<GroupChatsPage></GroupChatsPage>
		</View>
	);
}
