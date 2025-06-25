import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthContext } from "../../../auth/context";
import { useFetchPosts } from "../../../main-page/hooks/useFetchPosts";
import { PublicatedPost } from "../../../main-page/ui/post";
import { ICONS } from "../../../../shared/ui/icons";
import { styles } from "./user-profile-page.styles";

export function UserProfilePage() {
	const { user } = useAuthContext();
	const { posts, fetchPosts } = useFetchPosts(user?.id);

	if (!user) return null;

	const handleDeleteFriend = async () => {
		try {
			const token = await AsyncStorage.getItem("token");
			if (!token) return;

			const res = await fetch("http://192.168.3.11:3011/friend/delete-friend", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ friendId: user.id }),
			});

			const data = await res.json();

			if (data.status === "success") {
				Alert.alert("Успіх", "Друг видалений");
			} else {
				Alert.alert("Помилка", "Щось пішло не так");
			}
		} catch (e) {
			console.error("Error deleting friend", e);
			Alert.alert("Помилка", "Не вдалося видалити друга");
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container} overScrollMode="never">
			<View style={styles.header}>
				<View style={styles.profileImageWrapper}>
					{user.image ? (
						<Image
							source={{ uri: user.image }}
							style={{ width: 96, height: 96, borderRadius: 20 }}
						/>
					) : (
						<ICONS.AnonymousLogoIcon width={96} height={96} />
					)}
				</View>
				<Text style={styles.name}>
					{user.name} {user.surname}
				</Text>
				<Text style={styles.username}>@{user.username}</Text>

				<View style={styles.statsContainer}>
					<View style={styles.statBlock}>
						<Text style={styles.statNumber}>3</Text>
						<Text style={styles.statLabel}>Дописи</Text>
					</View>
					<View style={styles.statBlock}>
						<Text style={styles.statNumber}>12.1K</Text>
						<Text style={styles.statLabel}>Читачі</Text>
					</View>
					<View style={styles.statBlock}>
						<Text style={styles.statNumber}>222</Text>
						<Text style={styles.statLabel}>Друзі</Text>
					</View>
				</View>
			</View>

			<View style={styles.albumsWrapper}>
				<View style={styles.albumHeader}>
					<Text style={styles.albumTitle}>Альбоми</Text>
					<TouchableOpacity>
						<Text style={styles.viewAll}>Дивитись всі</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.albumCard}>
					<Text style={styles.albumName}>Настрій</Text>
					<Text style={styles.albumSubtitle}>Природа · 2025 рік</Text>
					<View style={styles.albumImagePlaceholder}></View>
				</View>
			</View>

			<View style={styles.postsContainer}>
				{posts.map((post) => (
					<PublicatedPost
						key={post.id}
						id={post.id}
						name={post.name}
						text={post.description}
						hashtags={[...post.defaultTags, ...post.customTags]}
						photo={post.image}
						user={post.user}
						likes={post.likes ?? 0}
						views={post.views ?? 0}
						onRefresh={fetchPosts}
					/>
				))}
			</View>
		</ScrollView>
	);
}
