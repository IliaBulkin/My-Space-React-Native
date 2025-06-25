import { View, Text, TouchableOpacity } from "react-native";
import { HeaderNavigationSettingsPages } from "../header-navigation-settings-pages";
import { ICONS } from "../../../../shared/ui/icons";
import { AlbumImage } from "../album-image";
import { styles } from "./albums-settings-page.styles";
import { ScrollView } from "react-native-virtualized-view";
import { AlbumCard } from "../album-card";
import { MyPhoto } from "../album-card/album-card";

export function AlbumsSettingsPage() {
	return (
		<ScrollView style={{ flexDirection: "column" }} overScrollMode="never">
			<View style={{ gap: 8 }}>
				<HeaderNavigationSettingsPages />
				<View style={styles.container1}>
					<View style={styles.myPhotoTop}>
						<Text style={{ fontWeight: 500, fontSize: 16 }}>
							Мої фото
						</Text>
						<TouchableOpacity style={styles.addPhotoButt}>
							<ICONS.ImageIcon />
							<Text>Додати фото</Text>
						</TouchableOpacity>
					</View>
					<MyPhoto></MyPhoto>
				</View>
				<View style={styles.container2}>
					<Text style={{ fontWeight: 500, fontSize: 16 }}>
						Немає ще жодного альбому
					</Text>
					<TouchableOpacity>
						<ICONS.PlusIcon></ICONS.PlusIcon>
					</TouchableOpacity>
				</View>
				<AlbumCard></AlbumCard>
			</View>
		</ScrollView>
	);
}
