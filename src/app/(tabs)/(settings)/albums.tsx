import { View } from "react-native";
import { AlbumsSettingsPage } from "../../../modules/personal-info-settings-page/ui/albums-settings-page/albums-settings-page";

export default function PersonalInfoSettings() {
    return (
        <View style={{flex: 1}}>
            <AlbumsSettingsPage />			
        </View>
    );
}