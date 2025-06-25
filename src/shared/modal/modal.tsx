import { ReactNode } from "react";
import { View } from "react-native";
import Modal from "react-native-modal";

type AnimationName =
	| "fadeIn"
	| "fadeInUp"
	| "fadeInDown"
	| "fadeOut"
	| "fadeOutDown"
	| "fadeOutUp"
	| "slideInUp"
	| "slideOutDown"
	| "zoomIn"
	| "zoomOut";

type ModalToolProps = {
	children?: ReactNode;
	isVisible: boolean;
	onClose: () => void;
	position?: { top: number; left: number };
	animationIn?: AnimationName;
	animationOut?: AnimationName;
};

export function ModalTool({
	children,
	isVisible,
	onClose,
	position,
	animationIn,
	animationOut,
}: ModalToolProps) {
	return (
		<Modal
			isVisible={isVisible}
			onBackdropPress={onClose}
			backdropTransitionOutTiming={1}
			hideModalContentWhileAnimating={true}
			useNativeDriver={true}
			style={{ margin: 0 }}
			animationIn={animationIn}
			animationOut={animationOut}
		>
			{position ? (
				<View
					style={{
						position: "absolute",
						top: position.top,
						left: position.left,
						zIndex: 999,
					}}
				>
					{children}
				</View>
			) : (
				<View
					style={{
						justifyContent: "center",
						alignItems: "center",
						width: "100%",
						height: "100%",
						paddingHorizontal: 16,
					}}
				>
					<View
						style={{
							backgroundColor: "white",
							borderRadius: 20,
							overflow: "hidden",
							maxHeight: "95%",
							width: "100%",
							alignSelf: "center",
						}}
					>
						{children}
					</View>
				</View>
			)}
		</Modal>
	);
}
