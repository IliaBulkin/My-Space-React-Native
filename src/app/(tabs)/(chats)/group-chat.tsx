import { View } from "react-native";
import { ChatsPageHeader } from "../../../modules/chats/ui/chats-page-header/chats-page-header";
import { GroupChatPage } from "../../../modules/chats/ui/group-chat/group-chat";

export default function GroupChat() {
    return (
        <View style={{ flex: 1 }}>
            <ChatsPageHeader></ChatsPageHeader>
            <GroupChatPage></GroupChatPage>
        </View>
    );
}
