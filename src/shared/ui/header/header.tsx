import { View, TouchableOpacity, Text } from "react-native";
import { ICONS } from "../icons";
import { useAuthContext } from "../../../modules/auth/context";
import { useModal } from "../../../modules/auth/context";
import { Redirect, useRouter } from "expo-router";
import { IHeaderProps } from "./header.types";
import { styles } from "./header.styles";
import { useCreateGroupChatContext } from "../../../modules/chats/context/create-group-chat.context";

export function Header(props: IHeaderProps) {
	const { logout } = useAuthContext();
	const { openCreateModal } = useModal();
	const { replace } = useRouter();
	const {step, setStep} = useCreateGroupChatContext()

	return (
		<View style={styles.header}>
			<TouchableOpacity
				onPress={() => {
					replace("/main");
				}}
			>
				<ICONS.LogoIcon />
			</TouchableOpacity>
			<View style={styles.icons}>
				{props.page === "posts" ? (
					<TouchableOpacity
						onPress={() => {
							openCreateModal();
						}}
					>
						<ICONS.PlusIcon />
					</TouchableOpacity>
				) : undefined}

				{props.page === "chats" ? (
					<TouchableOpacity
						onPress={() => {
							// openCreateModal();
							// console.log("Create a chat");
							setStep("one")
						}}
					>
						<ICONS.PlusIcon />
					</TouchableOpacity>
				) : undefined}
{/* 
				<TouchableOpacity
					onPress={() => {
						replace("/_sitemap");
					}}
				>
					<ICONS.AnonymousLogoIcon width={41} height={40} />
				</TouchableOpacity> */}

				{props.page !== "chats" ? (
					<TouchableOpacity
						disabled={props.page === "settings"}
						onPress={() => {
							replace("/personal-info");
						}}
					>
						{props.page === "settings" ? (
							<ICONS.SettingsIcon fill={"#E9E5EE"} />
						) : (
							<ICONS.SettingsIcon />
						)}
					</TouchableOpacity>
				) : undefined}

				<TouchableOpacity onPress={logout}>
					<ICONS.LogoutIcon />
				</TouchableOpacity>
			</View>
		</View>
	);
}

export function HeaderAuth() {
	const { replace } = useRouter();

	return (
		<View style={styles.headerAuth}>
			<ICONS.LogoIcon width={145} height={18} />
			{/* <TouchableOpacity
				onPress={() => {
					replace("/_sitemap");
				}}
			>
				<ICONS.AnonymousLogoIcon width={41} height={40} />
			</TouchableOpacity> */}
		</View>
	);
}

Header.HeaderAuth = HeaderAuth;
