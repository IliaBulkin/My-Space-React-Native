import { View, Text, Image } from "react-native";
import { IContactCard } from "../../types/chat-info";
import { ICONS } from "../../../../shared/ui/icons";
import { styles } from "./my-message.styles";
import { HTTPS_HOST } from "../../../../shared/base-url/base-url";
import { useEffect } from "react";

export function MyMessage({
	text,
	date,
	wasWatched,
	attachedImage,
}: IContactCard) {
	if (!date) throw Error("Дата не була передана");

	return (
		<View style={styles.container}>
			{attachedImage && (
				<Image
					style={{ width: 150, height: 150 }}
					source={{ uri: HTTPS_HOST + "/media/" + attachedImage }}
				/>
			)}
			{text && <Text style={styles.messageText}>{text}</Text>}

			<View style={styles.infoCont}>
				<Text style={{ fontSize: 10 }}>
					{new Date(date).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</Text>
			</View>
		</View>
	);
}
