import { Tabs, usePathname } from "expo-router";
import { Header } from "../../shared/ui/header/header";
import { ICONS } from "../../shared/ui/icons";
import {
	TouchableOpacity,
	View,
	StyleSheet,
	Pressable,
	TouchableWithoutFeedback,
} from "react-native";

import { useEffect, useState } from "react";

const styles = StyleSheet.create({
	activeItem: {
		borderTopWidth: 2,
		borderTopColor: "#543C52",
		paddingTop: 0,
	},
	inactiveItem: {
		borderTopWidth: 0,
		paddingTop: 2,
	},
});

export default function TabsLayout() {
	const [page, setPage] = useState<
		"main" | "my-posts" | "friends" | "chats" | "other"
	>("other");

	const pathname = usePathname();

	useEffect(() => {
		if (pathname === "/main") {
			setPage("main");
		} else if (pathname === "/my-posts") {
			setPage("my-posts");
		} else if (
			pathname === "/friends" ||
			pathname === "/friend-main" ||
			pathname === "/friend-request" ||
			pathname === "/friend-recommendation" ||
			pathname === "/friend-all"
		) {
			setPage("friends");
		} else if (
			pathname === "/contacts" ||
			pathname === "/messages" ||
			pathname === "/group-chats" ||
			pathname === "/group-chat" ||
			pathname === "/personal-chat"
		) {
			setPage("chats");
		} else {
			setPage("other");
		}
	}, [pathname]);

	return (
		<Tabs
			initialRouteName="main"
			screenOptions={{
				tabBarLabelStyle: {
					fontSize: 12,
					color: "#070A1C",
				},
				tabBarStyle: {
					height: 54,
					paddingBottom: 0,
				},
				tabBarActiveTintColor: "black",
				tabBarButton: (props) => (
					<TouchableWithoutFeedback onPress={props.onPress}>
						<View style={{ flex: 1, alignItems: "center" }}>{props.children}</View>
					</TouchableWithoutFeedback>
				),
			}}
		>
			<Tabs.Screen
				name="main"
				options={{
					tabBarLabel: "Головна",
					tabBarIcon: () => <ICONS.HouseIcon />,

					tabBarItemStyle:
						page === "main"
							? styles.activeItem
							: styles.inactiveItem,
					header: () => <Header page="posts" />,
				}}
			/>

			<Tabs.Screen
				name="my-posts"
				options={{
					tabBarLabel: "Мої пости",

					tabBarItemStyle:
						page === "my-posts"
							? styles.activeItem
							: styles.inactiveItem,
					tabBarIcon: () => <ICONS.ImageIcon />,
					header: () => <Header page="posts" />,
				}}
			/>

			<Tabs.Screen
				name="friends"
				options={{
					tabBarLabel: "Друзі",

					tabBarItemStyle:
						page === "friends"
							? styles.activeItem
							: styles.inactiveItem,
					tabBarIcon: () => <ICONS.FriendsIcon />,
					header: () => <Header page="friends" />,
				}}
			/>

			<Tabs.Screen
				name="chats"
				options={{
					tabBarLabel: "Чати",

					tabBarItemStyle:
						page === "chats"
							? styles.activeItem
							: styles.inactiveItem,
					tabBarIcon: () => <ICONS.ChatIcon />,
					header: () => <Header page="chats" />,
				}}
			/>

			<Tabs.Screen
				name="(settings)"
				options={{
					tabBarIcon: () => <ICONS.ChatIcon />,
					href: null,
					header: () => <Header page="settings" />,
				}}
			/>

			<Tabs.Screen
				name="(friends)"
				options={{
					tabBarIcon: () => <ICONS.ChatIcon />,
					href: null,
					header: () => <Header page="friends" />,
				}}
			/>

			<Tabs.Screen
				name="(chats)"
				options={{
					tabBarIcon: () => <ICONS.ChatIcon />,
					href: null,
					header: () => <Header page="chats" />,
				}}
			/>

			<Tabs.Screen
				name="(user-profile)"
				options={{
					tabBarIcon: () => <ICONS.HouseIcon />,
					href: null,
					header: () => <Header page="profile" />,
				}}
			/>
		</Tabs>
	);
}
