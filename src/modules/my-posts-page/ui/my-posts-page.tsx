import { View, Text } from "react-native";
import { useEffect } from "react";
import { PublicatedPost } from "../../main-page/ui/post";
import { useAuthContext } from "../../auth/context";
import { styles } from "./my-posts-page.styles";
import { useFetchPosts } from "../../main-page/hooks/useFetchPosts";
import { ModalEditPost } from "../../main-page/ui/modal-edit-post";

export function MyPostsPage() {
	const { user, token } = useAuthContext();
	if (!user) {
		return null
	}
	const { posts, fetchPosts } = useFetchPosts(user.id);

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
					<View key={post.id}>
						<ModalEditPost
							postId={post.id}
							onRefresh={fetchPosts}
						/>
						<PublicatedPost
							id={post.id}
							title={post.title}
							content={post.content}
							tags={post.tags}
							images={post.images}
							author={post.author}
							likes={post.likes ?? 0}
							views={post.views ?? 0}
							links={post.links}
							author_id={post.author_id}
							onRefresh={fetchPosts}
						/>
					</View>
				))
			)}
		</View>
	);
}
