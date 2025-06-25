import { View } from "react-native";
import { UserProfilePage } from "../../modules/profile-page/ui/user-profile-page"

export default function UserProfile() {
    return (
        <View style={{flex: 1}}>
            <UserProfilePage/>
        </View>
    );
}