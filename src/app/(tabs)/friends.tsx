import { ScrollView, Text } from "react-native";
import { FriendRequestPage } from "../../modules/friends-page/ui/friend-request-page/friend-request-page"
import { Redirect } from "expo-router";

export default function Friends() {
    // return (
    //     <ScrollView style={{ backgroundColor: "#FAF8FF" }}>
    //         <FriendRequestPage/>
    //     </ScrollView>
    // );
    return <Redirect href={"/friend-main"}/>
}
