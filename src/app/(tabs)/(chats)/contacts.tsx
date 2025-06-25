import { View } from "react-native";
import { ContactsPage } from "../../../modules/chats/ui/contacts/contacts";
import { ChatsPageHeader } from "../../../modules/chats/ui/chats-page-header/chats-page-header";

export default function Contacts() {
	return (
		<View style={{ flex: 1 }}>
			<ChatsPageHeader></ChatsPageHeader>
			<ContactsPage></ContactsPage>
		</View>
	);
}
