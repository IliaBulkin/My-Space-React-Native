import { View, Text, Image } from "react-native";
import { styles } from "./another-user-message.styles";
import { IContactCard } from "../../types/chat-info";
import { ICONS } from "../../../../shared/ui/icons";
import { HTTPS_HOST } from "../../../../shared/base-url/base-url";
import { useEffect } from "react";

export function AnotherUserMessage({
	name,
	surname,
	image,
	text,
	date,
	wasWatched,
	attachedImage,
}: IContactCard) {
	if (!date) return;


	return (
		<View style={{ flexDirection: "row", gap: 4 }}>
			{image ? (
				<Image
					source={{ uri: HTTPS_HOST + "/media/" + image }}
					style={{
						width: 50,
						height: 50,
						borderRadius: 50,
					}}
				></Image>
			) : (
				<ICONS.AnonymousLogoIcon
					width={50}
					height={50}
				></ICONS.AnonymousLogoIcon>
			)}

			<View style={styles.container}>
				<View style={{ gap: 5 }}>
					<Text style={{ color: "#543C52", fontSize: 10 }}>
						{name} {surname}
					</Text>
					{attachedImage && (
						<Image
							source={{
								uri: HTTPS_HOST + "/media/" + attachedImage,
							}}
							style={{
								width: 150,
								height: 150,
								// borderRadius: 25,
							}}
						/>
					)}
					{text && <Text style={styles.messageText}>{text}</Text>}
				</View>
				<View style={styles.infoCont}>
					<Text style={{ fontSize: 10 }}>
						{new Date(date).toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}
					</Text>
				</View>
			</View>
		</View>
	);
}
