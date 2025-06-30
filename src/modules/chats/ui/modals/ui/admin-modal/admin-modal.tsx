import { Modal, TouchableOpacity, View, Text } from "react-native";
import { ICONS } from "../../../../../../shared/ui/icons";
import { styles } from "./admin-modal.styles";
import { HOST, HTTPS_HOST } from "../../../../../../shared/base-url/base-url";
import { useAuthContext } from "../../../../../auth/context";
import { useRouter } from "expo-router";

export function AdminModal({
	visible,
	onNext,
	onClose,
	onRefresh,
	id,
}: {
	visible: boolean;
	onNext: () => void;
	onClose: () => void;
	onRefresh: () => void;
	id: number;
}) {
	const { token } = useAuthContext();
	const router = useRouter()

	async function deleteGroup() {
		const response = await fetch(
			`http://${HOST}/chat/delete-group-chat`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ chatId: id }),
			}
		);
		const result = await response.json();

		if (result.status === "success") {
			onClose()
			onRefresh()
			router.replace("/group-chats")
		} else {
			alert("Помилка при видалені чату")
		}
	}

	return (
		<Modal visible={visible} transparent={true}>
			<View style={styles.container}>
				<TouchableOpacity
					onPress={onClose}
					style={{ alignSelf: "flex-end" }}
				>
					<ICONS.DotsIcon width={20} height={20} />
				</TouchableOpacity>
				{/* <TouchableOpacity style={{ flexDirection: "row", gap: 10 }}>
					<ICONS.ImageIcon width={20} height={20}></ICONS.ImageIcon>
					<Text>Медіа</Text>
				</TouchableOpacity> */}
				<TouchableOpacity
					style={{ flexDirection: "row", gap: 10 }}
					onPress={onNext}
				>
					<ICONS.PencilIcon width={20} height={20}></ICONS.PencilIcon>
					<Text>Редагувати групу</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						borderTopWidth: 1,
						borderColor: "#CDCED2",
						paddingTop: 16,
						flexDirection: "row",
						gap: 10,
					}}
					onPress={() => {deleteGroup()}}
				>
					<ICONS.TrashCanIcon
						width={20}
						height={20}
					></ICONS.TrashCanIcon>
					<Text>Видалити чат</Text>
				</TouchableOpacity>
			</View>
		</Modal>
	);
}
