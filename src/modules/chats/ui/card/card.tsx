import { View, Image, Text, TouchableOpacity } from "react-native";
import { IContactCard } from "../../types/chat-info";
import { styles } from "./card.styles";
import { useRouter } from "expo-router";
import { ICONS } from "../../../../shared/ui/icons";
import { HTTPS_HOST } from "../../../../shared/base-url/base-url";
import { IGroupChat, IMessage } from "../messages/messages.types";
import { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import { FriendCard } from "../../../friends-page/types/friend-info";

const router = useRouter();

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
			{image ? (
				<Image
					source={{ uri: HTTPS_HOST + "/media/" + image }}
					style={styles.contactImage}
				></Image>
			) : (
				<ICONS.AnonymousLogoIcon
					width={50}
					height={50}
				></ICONS.AnonymousLogoIcon>
			)}

			<Text style={styles.contactName}>
				{name} {surname}
			</Text>
		</TouchableOpacity>
	);
}

function Message(props: IMessage) {
	const [date, setDate] = useState<Date | null>(null);

	useEffect(() => {
		setDate(props.messages[0] ? new Date(props.messages[0].sent_at) : null);
	}, [props]);

	return (
		<TouchableOpacity
			style={styles.card2}
			onPress={() => {
				router.replace({
					pathname: "/personal-chat/",
					params: {
						avatar: props.members[0]?.profile.avatars[0]?.image,
						chatId: props.id,
						email: props.members[0]?.profile.user.email,
						first_name: props.members[0]?.profile.user.first_name,
						last_name: props.members[0]?.profile.user.last_name,
						username: props.members[0]?.profile.user.username,
						userId: props.members[0]?.profile.user.id,
					},
				});
			}}
		>
			{props.members[0]?.profile.avatars[0]?.image ? (
				<Image
					source={{
						uri:
							HTTPS_HOST +
							"/media/" +
							props.members[0]?.profile.avatars[0]?.image,
					}}
					style={styles.contactImage}
				/>
			) : (
				<ICONS.AnonymousLogoIcon
					width={50}
					height={50}
				></ICONS.AnonymousLogoIcon>
			)}

			<View style={{ flex: 1 }}>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						flex: 1,
						flexShrink: 1,
					}}
				>
					<Text style={styles.contactName}>
						{props.members[0]?.profile.user.first_name}{" "}
						{props.members[0]?.profile.user.last_name}
					</Text>
					<Text>{date?.toLocaleDateString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}</Text>
				</View>
				<Text>
					{props.messages[0]
						? props.messages[0]?.content
						: "Немає повідомлень"}
				</Text>
			</View>
		</TouchableOpacity>
	);
}

function Group(props: IGroupChat) {
	const [date, setDate] = useState<Date | null>(null);

	return (
		<TouchableOpacity
			style={styles.card2}
			onPress={() => {
				router.replace({
					pathname: "group-chat",
					params: {
						avatar: props.avatar,
						chatId: props.id,
						name: props.name,
						membersAmount: String(props.members.length + 1),
						adminId: props.admin_id
					},
				});
			}}
		>
			{props.avatar ? (
				<Image
					source={{
						uri: HTTPS_HOST + "/media/" + props.avatar,
					}}
					style={styles.contactImage}
				/>
			) : (
				<ICONS.ChatDefaultLogoIcon width={50} height={50} />
			)}

			<View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						width: "85%",
					}}
				>
					<Text style={styles.contactName}>{props.name}</Text>
					<Text>{date?.toLocaleDateString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}</Text>
				</View>
				<Text>
					{props.messages[0]
						? props.messages[0]?.content
						: "Немає повідомлень"}
				</Text>
			</View>
		</TouchableOpacity>
	);
}

function GroupAdd(props: {
	friend: FriendCard;
	setTotalSelected: (value: number) => void;
	totalSelected: number;
	setSelectedFriends: (value: FriendCard[]) => void;
	selectedFriends: FriendCard[];
}) {
	const [toggleCheckBox, setToggleCheckBox] = useState(() =>
		props.selectedFriends.some((f) => f.id === props.friend.id)
	);

	return (
		<View style={styles.card3}>
			<View style={styles.groupAddInfo}>
				{props.friend.avatars[0]?.image ? (
					<Image
						source={{
							uri:
								HTTPS_HOST +
								"/media/" +
								props.friend.avatars[0]?.image,
						}}
						style={styles.contactImage}
					></Image>
				) : (
					<ICONS.AnonymousLogoIcon width={50} height={50} />
				)}

				<Text style={styles.contactName}>
					{props.friend.user.first_name} {props.friend.user.last_name}
				</Text>
			</View>
			<Checkbox
				disabled={false}
				value={toggleCheckBox}
				onValueChange={(newValue) => {
					setToggleCheckBox(newValue);
					if (newValue) {
						props.setTotalSelected(props.totalSelected + 1);
						props.setSelectedFriends([
							...props.selectedFriends,
							props.friend,
						]);
					} else {
						props.setTotalSelected(props.totalSelected - 1);
						props.setSelectedFriends(
							props.selectedFriends.filter((friend) => {
								return !(friend.id === props.friend.id);
							})
						);
					}
				}}
				color={"#543C52"}
			/>
		</View>
	);
}

function GroupDelete(props: {
	friend: FriendCard;
	setTotalSelected: (value: number) => void;
	totalSelected: number;
	setSelectedFriends: (value: FriendCard[]) => void;
	selectedFriends: FriendCard[];
}) {
	return (
		<View style={styles.card3}>
			<View style={styles.groupAddInfo}>
				{props.friend.avatars[0]?.image ? (
					<Image
						source={{
							uri:
								HTTPS_HOST +
								"/media/" +
								props.friend.avatars[0]?.image,
						}}
						style={styles.contactImage}
					></Image>
				) : (
					<ICONS.AnonymousLogoIcon width={50} height={50} />
				)}
				<Text style={styles.contactName}>
					{props.friend.user.first_name} {props.friend.user.last_name}
				</Text>
			</View>
			<TouchableOpacity
				onPress={() => {
					props.setSelectedFriends(
						props.selectedFriends.filter((friend) => {
							return !(friend.id === props.friend.id);
						})
					);
					props.setTotalSelected(props.totalSelected - 1);
				}}
			>
				<ICONS.TrashCanIcon width={20} height={20}></ICONS.TrashCanIcon>
			</TouchableOpacity>
		</View>
	);
}

Card.Contact = Contact;
Card.Message = Message;
Card.Group = Group;
Card.GroupAdd = GroupAdd;
Card.GroupDelete = GroupDelete;

export { Card };
