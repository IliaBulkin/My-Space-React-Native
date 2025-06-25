import {
	TouchableOpacity,
	View,
	Text,
} from "react-native";
import { ModalTool } from "../../../../shared/modal";
import { IPostProps } from "../../types/post-info";
import { usePost } from "../../hooks/usePost";
import { useModal } from "../../../auth/context";
import { ICONS } from "../../../../shared/ui/icons";
import { styles } from "./modal-three-dots.styles";

interface ModalThreeDotsProps extends IPostProps {
	isVisible: boolean;
	setIsVisible: (visible: boolean) => void;
	modalPosition: { top: number; left: number } | null;
	onRefresh?: () => void;
}

export function ModalThreeDots({
	id,
	isVisible,
	setIsVisible,
	modalPosition,
	onRefresh,
}: ModalThreeDotsProps) {
	const { openEditModal } = useModal();
	const { deletePost } = usePost();

	return (
		<View>
			<ModalTool
				isVisible={isVisible}
				onClose={() => setIsVisible(false)}
				position={modalPosition ?? undefined}
				animationIn="fadeIn"
				animationOut="fadeOut"
			>
				<View style={styles.mainSmallModalPostSettings}>
					<View style={styles.headerRow}>
						<TouchableOpacity
							style={styles.threeDotsSmallModal}
							onPress={() => setIsVisible(false)}
						>
							<ICONS.DotsIcon />
						</TouchableOpacity>
					</View>

					<TouchableOpacity
						style={styles.mainEditPostButton}
						onPress={() => {
							if (typeof id === "number") {
								setIsVisible(false);
								openEditModal(id);
							}
						}}
					>
						<ICONS.PencilIcon width={15} height={15} />
						<Text style={styles.actionText}>Редагувати допис</Text>
					</TouchableOpacity>

					<View style={styles.separator} />

					<TouchableOpacity
						style={styles.mainDeletePostButton}
						onPress={async () => {
							if (typeof id === "number") {
								await deletePost(id);
								onRefresh?.();
								setIsVisible(false);
							}
						}}
					>
						<ICONS.TrashCanIcon
							width={15}
							height={15}
							color={"#543C52"}
						/>
						<Text style={styles.actionText}>
							Видалити публікацію
						</Text>
					</TouchableOpacity>
				</View>
			</ModalTool>
		</View>
	);
}
