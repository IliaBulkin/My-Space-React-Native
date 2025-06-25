import { View, Text, Image } from "react-native";
import { styles } from "./another-user-message.styles";
import { IContactCard } from "../../types/chat-info";
import { ICONS } from "../../../../shared/ui/icons";

export function AnotherUserMessage({
	name,
	surname,
	image,
	text,
	date,
	wasWatched,
}: IContactCard) {
	return (
		<View style={{ flexDirection: "row", gap: 4 }}>
			<Image
				source={{ uri: image }}
				style={{
					width: 50,
					height: 50,
					borderRadius: 1234,
				}}
			></Image>
			<View style={styles.container}>
				<View>
					<Text style={{ color: "#543C52", fontSize: 10 }}>
						{name} {surname}
					</Text>
					<Text style={styles.messageText}>{text}</Text>
				</View>
				<View style={styles.infoCont}>
					<Text style={{ fontSize: 10 }}>9:41</Text>
					{wasWatched ? (
						<ICONS.WatchedIcon
							width={7}
							height={7}
						></ICONS.WatchedIcon>
					) : (
						<ICONS.NotWatchedIcon
							width={7}
							height={7}
						></ICONS.NotWatchedIcon>
					)}
				</View>
			</View>
		</View>
	);
}
