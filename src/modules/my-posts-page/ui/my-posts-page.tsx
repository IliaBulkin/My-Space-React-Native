import { View, Text } from "react-native";
import { useEffect } from "react";
import { PublicatedPost } from "../../main-page/ui/post";
import { useAuthContext } from "../../auth/context";
import { styles } from "./my-posts-page.styles";
import { useFetchPosts } from "../../main-page/hooks/useFetchPosts";

export function MyPostsPage() {
	const { user } = useAuthContext();
	const { posts, fetchPosts } = useFetchPosts();

	useEffect(() => {
		fetchPosts(); 
	}, [user?.id]);

	return (
		<View>
			{posts.length === 0 ? (
				<View>
					<Text style={styles.noOnePostText}>
						У вас немає публікацій.
					</Text>
				</View>
			) : (
				posts.map((post) => (
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
				))
			)}
		</View>
	);
}
