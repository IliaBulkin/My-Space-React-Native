import { View } from "react-native";
import { FriendRecommendationPage } from "../../../modules/friends-page/ui/friend-recommendation-page/friend-recommendation-page"

export default function PersonalInfoSettings() {
    return (
        <View style={{flex: 1}}>
            <FriendRecommendationPage/>
        </View>
    );
}