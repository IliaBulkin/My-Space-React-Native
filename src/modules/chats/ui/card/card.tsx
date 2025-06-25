import { View, Image, Text, TouchableOpacity } from "react-native";
import { IContactCard } from "../../types/chat-info";
import { styles } from "./card.styles";

function Card({ image, name, surname }: IContactCard) {
	return (
		<TouchableOpacity style={styles.card1}>
			<Image source={{ uri: image }} style={styles.contactImage}></Image>
			<Text style={styles.contactName}>
				{name} {surname}
			</Text>
		</TouchableOpacity>
	);
}

function Contact({ image, name, surname }: IContactCard) {
	return (
		<TouchableOpacity style={styles.card1}>
			<Image source={{ uri: image }} style={styles.contactImage}></Image>
			<Text style={styles.contactName}>
				{name} {surname}
			</Text>
		</TouchableOpacity>
	);
}

function Message({ image, name, surname, text, date }: IContactCard) {
	return (
		<TouchableOpacity style={styles.card2}>
			<Image source={{ uri: image }} style={styles.contactImage}></Image>
			<View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						width: "85%",
					}}
				>
					<Text style={styles.contactName}>
						{name} {surname}
					</Text>
					{/* тут треба дата, хз як її зробити */}
					<Text>9:41</Text>
				</View>
				<Text>{text}</Text>
			</View>
		</TouchableOpacity>
	);
}

Card.Contact = Contact;
Card.Message = Message;

export { Card };
