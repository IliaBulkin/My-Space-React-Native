import {
	View,
	Text,
	Image,
	ScrollView,
	TouchableOpacity,
	Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthContext } from "../../../auth/context";
import { useFetchPosts } from "../../../main-page/hooks/useFetchPosts";
import { PublicatedPost } from "../../../main-page/ui/post";
import { ICONS } from "../../../../shared/ui/icons";
import { styles } from "./friend-profile-page.styles";
import { HOST, PORT } from "../../../../shared/base-url";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { IUserForProfile } from "../../types/types";

export function FrinedProfilePage() {
	const params = useLocalSearchParams<{ userId: string }>();
	const router = useRouter();

	const { token } = useAuthContext();

	const [userProfile, setUserProfile] = useState<IUserForProfile | null>(
		null
	);
	const { posts, fetchPosts } = useFetchPosts(userProfile?.id);

	async function getUserById(userId: string) {
		const response = await fetch(`http://${HOST}/user/friend/${userId}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const result = await response.json();
		if (result.status === "success") {
			console.log(JSON.stringify(result.data, null, 4));
			setUserProfile(result.data);
		} else {
			alert("Помилка при отриманні користувача");
		}
	}

	useEffect(() => {
		getUserById(params.userId);
	}, [params.userId]);

	useEffect(() => {
		console.log(userProfile);
	}, [userProfile]);
	const handleDeleteFriend = async () => {
		try {
			const res = await fetch(`http://${HOST}/friend/delete-friend`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ friendId: userProfile?.id }),
			});

			const data = await res.json();

			if (data.status === "success") {
				// Alert.alert("Успіх", "Друг видалений");
				router.replace("main/");
			} else {
				Alert.alert("Помилка", "Щось пішло не так");
			}
		} catch (e) {
			console.error("Error deleting friend", e);
			Alert.alert("Помилка", "Не вдалося видалити друга");
		}
	};

	return (
		<ScrollView
			contentContainerStyle={styles.container}
			overScrollMode="never"
		>
			<View style={styles.header}>
				<View style={styles.profileImageWrapper}>
					{userProfile?.profile?.avatars?.[0]?.image ? (
						<Image
							source={{
								uri: userProfile.profile.avatars[0]?.image,
							}}
							style={{ width: 96, height: 96, borderRadius: 20 }}
						/>
					) : (
						<ICONS.AnonymousLogoIcon width={96} height={96} />
					)}
				</View>
				<Text style={styles.name}>
					{userProfile?.first_name} {userProfile?.last_name}
				</Text>
				<Text style={styles.username}>@{userProfile?.username}</Text>

				<View style={styles.statsContainer}>
					<View style={styles.statBlock}>
						<Text style={styles.statNumber}>
							{userProfile?.postsAmount}
						</Text>
						<Text style={styles.statLabel}>Дописи</Text>
					</View>
					<View style={styles.statBlock}>
						<Text style={styles.statNumber}>
							{userProfile?.friendAmount}
						</Text>
						<Text style={styles.statLabel}>Друзі</Text>
					</View>
				</View>

				<View style={styles.actions}>
					<TouchableOpacity
						style={styles.confirmBtn}
						onPress={() => {
							router.replace({
								pathname: "/personal-chat",
								params: {
									chatId: userProfile?.chatId,
									avatar: userProfile?.profile?.avatars?.[0]
										?.image,
									email: userProfile?.email,
									first_name: userProfile?.first_name,
									last_name: userProfile?.last_name,
									username: userProfile?.username,
								},
							});
						}}
					>
						<Text
							style={{
								color: "#FFFFFF",
								fontFamily: "GTWalsheimPro-Regular",
							}}
						>
							Повідомлення
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.deleteBtn}
						onPress={handleDeleteFriend}
					>
						<Text style={styles.actionText}>Видалити з друзів</Text>
					</TouchableOpacity>
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
						content={post.content}
						title={post.title}
						tags={post.tags}
						images={post.images}
						author={post.author}
						links={post.links}
						author_id={post.author_id}
						likes={post.likes ?? 0}
						views={post.views ?? 0}
						onRefresh={fetchPosts}
					/>
				))}
			</View>
		</ScrollView>
	);
}
