import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./album-card.styles";
import { ICONS } from "../../../../shared/ui/icons";
import { AlbumImage } from "../album-image";
import { createContext, useContext } from "react";

interface IALbumCard {
	name: string;
	year: number;
	isHidden: boolean;
}
export function AlbumCard() {
	return (
		<View style={styles.container}>
			<View style={styles.container1}>
				<View style={{ flexDirection: "row", gap: 10 }}>
					<Text style={{ fontWeight: 500, fontSize: 16 }}>
						Настрій
					</Text>
					<Text
						style={{
							fontWeight: 400,
							fontSize: 16,
							color: "#81818D",
						}}
					>
						2025 рік
					</Text>
				</View>

				<View
					style={{
						flexDirection: "row",
						gap: 10,
						alignItems: "center",
					}}
				>
					<TouchableOpacity style={styles.button}>
						<ICONS.EyeIconWithoutFill
							fill={"#543C52"}
							width={20}
							height={20}
						></ICONS.EyeIconWithoutFill>
					</TouchableOpacity>
					<TouchableOpacity>
						<ICONS.DotsIcon width={20} height={20}></ICONS.DotsIcon>
					</TouchableOpacity>
				</View>
			</View>
			<Text style={{ fontWeight: 500, fontSize: 16 }}>Фотографії</Text>
			<ScrollView horizontal={true} overScrollMode="never">
				<TouchableOpacity
					style={{
						width: 200,
						height: 200,
						borderRadius: 10,
						borderWidth: 1,
						borderStyle: "dashed",
						alignItems: "center",
						justifyContent: "center",
						marginHorizontal: 8,
					}}
				>
					<ICONS.PlusIcon></ICONS.PlusIcon>
				</TouchableOpacity>
				<AlbumImage></AlbumImage>
				<AlbumImage></AlbumImage>
				<AlbumImage></AlbumImage>
				<AlbumImage></AlbumImage>
				<AlbumImage></AlbumImage>
				<AlbumImage></AlbumImage>
			</ScrollView>
		</View>
	);
}
export function MyPhoto() {
	return (
		<ScrollView horizontal={true} overScrollMode="never">
			<AlbumImage></AlbumImage>
			<AlbumImage></AlbumImage>
			<AlbumImage></AlbumImage>
		</ScrollView>
	);
}
