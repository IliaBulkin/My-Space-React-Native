import { View, Text } from "react-native";
import { IContactCard } from "../../types/chat-info";
import { ICONS } from "../../../../shared/ui/icons";
import { styles } from "./my-message.styles";

export function MyMessage({ text, date, wasWatched }: IContactCard) {
	return (
		<View style={styles.container}>
			<Text style={styles.messageText}>{text}</Text>
			<View style = {styles.infoCont}>
				<Text style={{fontSize: 10}}>9:41</Text>
				{wasWatched ? (
					<ICONS.WatchedIcon width={7} height={7}></ICONS.WatchedIcon>
				) : (
					<ICONS.NotWatchedIcon width={7} height={7}></ICONS.NotWatchedIcon>
				)}
			</View>
		</View>
	);
}
