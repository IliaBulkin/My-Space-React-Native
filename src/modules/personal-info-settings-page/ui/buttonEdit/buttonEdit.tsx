import { TouchableOpacity, Text } from "react-native";
import { IButtonEditProps } from "./buttonEdit.types";
import { ICONS } from "../../../../shared/ui/icons";
import { styles } from "./buttonEdit.styles";

export function ButtonEdit(props: IButtonEditProps) {
	const { editable, ...otherProps } = props;

	return (
		<TouchableOpacity
			{...otherProps}
			style={[styles.button, editable && styles.buttonActive]}
		>
			<ICONS.PencilIcon width={15} height={15} />
			{editable && <Text style={styles.text}>Зберегти</Text>}
		</TouchableOpacity>
	);
}
