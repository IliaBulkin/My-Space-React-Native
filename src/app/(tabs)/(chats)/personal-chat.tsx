import { View } from "react-native";
import { ChatsPageHeader } from "../../../modules/chats/ui/chats-page-header/chats-page-header";
import { PersonalChatPage } from "../../../modules/chats/ui/personal-chat/personal-chat";

export default function PersonalChat() {
    return (
        <View style={{ flex: 1 }}>
            <ChatsPageHeader></ChatsPageHeader>
            <PersonalChatPage></PersonalChatPage>
        </View>
    );
}
