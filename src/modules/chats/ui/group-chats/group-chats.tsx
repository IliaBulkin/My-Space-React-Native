import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { ICONS } from "../../../../shared/ui/icons";
import { styles } from "./group-chats.styles";
import { Card } from "../card/card";
import { useEffect, useState } from "react";
import { NewGroupModalOne } from "../modals/ui/new-group-modal-one/new-group-modal-one";
import { NewGroupModalTwo } from "../modals/ui/new-group-modal-two/new-group-modal-two";
import { FriendCard } from "../../../friends-page/types/friend-info";
import { useForm } from "react-hook-form";
import { IGroupChat, IMessage } from "../messages/messages.types";
import { HTTPS_HOST } from "../../../../shared/base-url/base-url";
import { useAuthContext } from "../../../auth/context";
import { useCreateGroupChatContext } from "../../context/create-group-chat.context";

export function GroupChatsPage() {
	// const [step, setStep] = useState<"none" | "one" | "two">("none");
	const {token} = useAuthContext()
	const {step, setStep, getGroups, chats} = useCreateGroupChatContext()

	

	useEffect(() => {
		getGroups();
	}, []);

	return (
		<View style={styles.container}>
			<FlatList
				data={chats}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item }) => <Card.Group {...item} />}
				ListHeaderComponent={
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<View style={styles.messagesTop}>
							<ICONS.ChatIcon width={20} height={20} />
							<Text
								style={{
									color: "#81818D",
									fontSize: 20,
									fontWeight: 500,
								}}
							>
								Групові чати
							</Text>
						</View>
						{/* <View> */}
							{/* <TouchableOpacity onPress={() => setStep("one")}>
								<ICONS.PlusIcon></ICONS.PlusIcon>
							</TouchableOpacity> */}
							<NewGroupModalOne
								visible={step === "one"}
								onClose={() => setStep("none")}
								onNext={() => setStep("two")}
							/>
							<NewGroupModalTwo
								visible={step === "two"}
								onClose={() => setStep("none")}
								onBack={() => setStep("one")}
								onRefresh={getGroups}
							/>
						{/* </View> */}
					</View>
				}
				contentContainerStyle={{ paddingBottom: 80 }}
			/>
		</View>
	);
}
