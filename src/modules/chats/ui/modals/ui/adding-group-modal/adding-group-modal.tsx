import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import { ICONS } from "../../../../../../shared/ui/icons";
import { IContactCard } from "../../../../types/chat-info";
import { Card } from "../../../card/card";
import { styles } from "./adding-group-modal.styles";
import { useUpdateGroupChatContext } from "../../../../context/update-group-chat.context";
import { useEffect, useState } from "react";
import { FriendCard } from "../../../../../friends-page/types/friend-info";
import { HOST } from "../../../../../../shared/base-url";
import { useAuthContext } from "../../../../../auth/context";

export function AddingGroupModal({
	visible,
	onClose,
	onNext,
}: {
	visible: boolean;
	onClose: () => void;
	onNext: () => void;
}) {
	const {
		selectedFriends,
		setSelectedFriends,
		totalSelected,
		setTotalSelected,
	} = useUpdateGroupChatContext();
	const { token } = useAuthContext();

	const [tempSelected, setTempSelected] = useState<FriendCard[]>([]);
	const [tempTotalSelected, setTempTotalSelected] = useState<number>(0);

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

	useEffect(() => {
		setTempSelected(selectedFriends);
		setTempTotalSelected(totalSelected);
	}, [selectedFriends, setSelectedFriends, totalSelected, setTotalSelected]);

	return (
		<Modal visible={visible} transparent={true}>
			<View style={styles.main}>
				<View style={styles.container}>
					<TouchableOpacity
						onPress={onClose}
						style={{ alignSelf: "flex-end" }}
					>
						<ICONS.CloseIcon width={20} height={20} />
					</TouchableOpacity>
					<Text style={styles.topText}>Додати учасника</Text>
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
					<Text style={{ color: "#81818D" }}>Вибрано: {tempTotalSelected}</Text>
					<FlatList
						data={friends}
						keyExtractor={(_, index) => index.toString()}
						renderItem={({ item }) => (
							<Card.GroupAdd
								friend={item}
								setTotalSelected={setTempTotalSelected}
								totalSelected={tempTotalSelected}
								setSelectedFriends={setTempSelected}
								selectedFriends={tempSelected}
							/>
						)}
					/>
					<View style={styles.bottom}>
						<TouchableOpacity
							onPress={() => {
								setTempSelected(selectedFriends)
								setTempTotalSelected(totalSelected)
								onClose()
							}}
							style={styles.butt1}
						>
							<Text style={{ color: "#543C52", fontWeight: 400 }}>
								Скасувати
							</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.butt2} onPress={() => {
							setSelectedFriends(tempSelected)
							setTotalSelected(tempTotalSelected)
							onNext()
						}}>
							<Text style={{ color: "#FFFFFF" }}>Зберегти</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
}
