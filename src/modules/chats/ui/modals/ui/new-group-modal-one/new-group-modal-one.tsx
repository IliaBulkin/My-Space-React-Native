import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import { ICONS } from "../../../../../../shared/ui/icons";
import { styles } from "./new-group-modal-one.styles";
import { IContactCard } from "../../../../types/chat-info";
import { Card } from "../../../card/card";
import { useEffect, useState } from "react";
import { FriendCard } from "../../../../../friends-page/types/friend-info";
import { useAuthContext } from "../../../../../auth/context";
import { HOST } from "../../../../../../shared/base-url";
import { useCreateGroupChatContext } from "../../../../context/create-group-chat.context";

export function NewGroupModalOne({
	visible,
	onClose,
	onNext,
}: {
	visible: boolean;
	onClose: () => void;
	onNext: () => void;
}) {
	const { token } = useAuthContext();
	const [friends, setFriends] = useState<FriendCard[]>([]);

	const fetchFriends = async () => {
		const res = await fetch(`http://${HOST}/friend/all-friends`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await res.json();
		setFriends(data.friends);
	};

	useEffect(() => {
		fetchFriends();
	}, []);

	const {
		setSelectedFriends,
		selectedFriends,
		setAvatar,
		totalSelected,
		setTotalSelected,
		setValue,
	} = useCreateGroupChatContext();

	return (
		<Modal visible={visible} transparent={true} animationType="fade">
			<View style={styles.main}>
				<View style={styles.container}>
					<TouchableOpacity
						onPress={() => {
							onClose();
							setTotalSelected(0);
							setSelectedFriends([]);
							setAvatar("");
							setValue("name", "");
						}}
						style={{ alignSelf: "flex-end" }}
					>
						<ICONS.CloseIcon width={20} height={20} />
					</TouchableOpacity>
					<Text style={styles.topText}>Нова група</Text>
					<View style={styles.search}>
						<ICONS.SearchIcon
							width={15}
							height={15}
							fill={"#070A1C"}
						/>
						<Text style={{ color: "#81818D", fontSize: 16 }}>
							Пошук
						</Text>
					</View>
					<Text style={{ color: "#81818D" }}>
						Вибрано: {totalSelected}
					</Text>
					<FlatList
						data={friends}
						keyExtractor={(_, index) => index.toString()}
						renderItem={({ item }) => (
							<Card.GroupAdd
								friend={item}
								setTotalSelected={setTotalSelected}
								totalSelected={totalSelected}
								setSelectedFriends={setSelectedFriends}
								selectedFriends={selectedFriends}
							/>
						)}
					/>

					<View style={styles.bottom}>
						<TouchableOpacity
							onPress={() => {
								onClose();
								setTotalSelected(0);
								setSelectedFriends([]);
								setAvatar("");
								setValue("name", "");
							}}
							style={styles.butt1}
						>
							<Text style={{ color: "#543C52", fontWeight: 400 }}>
								Скасувати
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.butt2}
							onPress={() => {
								onNext();
							}}
						>
							<Text style={{ color: "#FFFFFF" }}>Далі</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
}
