import { View, TouchableOpacity, Text } from "react-native";
import { ICONS } from "../icons";
import { useAuthContext } from "../../../modules/auth/context";
import { useModal } from "../../../modules/auth/context";
import { Redirect, useRouter } from "expo-router";
import { IHeaderProps } from "./header.types";
import {styles} from "./header.styles";

export function Header(props: IHeaderProps) {
	const { logout } = useAuthContext();
	const { openCreateModal } = useModal();
	const {replace} = useRouter()

	return (
		<View style={styles.header}>
			<TouchableOpacity onPress={() => {replace("/main")}}>
				<ICONS.LogoIcon />
			</TouchableOpacity>
			<View style={styles.icons}>
				<TouchableOpacity onPress={() => {props.isOnSettings ? null : openCreateModal()}} disabled={props.isOnSettings}>
					<ICONS.PlusIcon />
				</TouchableOpacity>

{/* 
				<TouchableOpacity onPress={() => {replace("/_sitemap")}}>
					<ICONS.AnonymousLogoIcon width={41} height={40}/>
				</TouchableOpacity> */}

				<TouchableOpacity disabled={props.isOnSettings} onPress={() => {replace("/personal-info")}}>
					{props.isOnSettings ? (
						<ICONS.SettingsIcon fill={"#E9E5EE"} />
					) : (
						<ICONS.SettingsIcon />
					)}
				</TouchableOpacity>

				<TouchableOpacity onPress={logout}>
					<ICONS.LogoutIcon />
				</TouchableOpacity>
				{/* <TouchableOpacity onPress={() => {replace("/_sitemap")}}>
					<ICONS.LogoutIcon/>
				</TouchableOpacity> */}
			</View>
		</View>
	);
}

export function HeaderAuth() {
	const {replace} = useRouter()

	return (
		<View style={styles.headerAuth}>
			<ICONS.LogoIcon width={145} height={18} />
			{/* <TouchableOpacity onPress={() => {replace("/_sitemap")}}>
				<ICONS.AnonymousLogoIcon width={41} height={40}/>
			</TouchableOpacity> */}
		</View>       
	)
}

Header.HeaderAuth = HeaderAuth;
