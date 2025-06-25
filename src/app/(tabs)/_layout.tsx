import { Tabs } from "expo-router";
import { Header } from "../../shared/ui/header/header";
import { ICONS } from "../../shared/ui/icons";
import { TouchableOpacity } from "react-native";

export default function TabsLayout() {
	return (
		<Tabs initialRouteName="main" screenOptions={{
            header: () => <Header isOnSettings={false}/>,
            tabBarStyle:{
                height: 56
            },
            tabBarActiveTintColor: "black",
			
        }}>
			<Tabs.Screen
				name="main"
				options={{
					tabBarIcon: () => <ICONS.HouseIcon />,
				}}
			/>

			<Tabs.Screen
				name="my-posts"
				options={{
					tabBarIcon: () => <ICONS.ImageIcon />,
				}}
			/>

			<Tabs.Screen
				name="friends"
				options={{
					tabBarIcon: () => <ICONS.FriendsIcon />,
				}}
			/>

            <Tabs.Screen
				name="chats"
				options={{
					tabBarIcon: () => <ICONS.ChatIcon />,
				}}
			/>

			<Tabs.Screen
				name="(settings)"
				options={{
					tabBarIcon: () => <ICONS.ChatIcon />,
					href: null
				}}
				
			/>

			<Tabs.Screen
				name="(friends)"
				options={{
					tabBarIcon: () => <ICONS.ChatIcon />,
					href: null
				}}
				
			/>

			<Tabs.Screen
				name="(chats)"
				options={{
					tabBarIcon: () => <ICONS.ChatIcon />,
					href: null
				}}
				
			/>
		</Tabs>
	);
}