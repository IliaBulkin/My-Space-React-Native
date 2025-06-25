import { useEffect, useState } from "react";
import { usePost } from "./usePost";
import { IUserPostWithUser } from "../types/post";
import { IBackendPost } from "../types/post-info";
import { Response } from "../../../shared/types";

export function useFetchPosts(userId?: number) {
	const [posts, setPosts] = useState<IUserPostWithUser[]>([]);
	const { getAllPosts, getPostsByUserId } = usePost();

	const adaptPost = (post: IBackendPost): IUserPostWithUser => ({
		id: post.id,
		name: post.title ?? "",
		description: post.text ?? "",
		defaultTags: Array.isArray(post.tags) ? post.tags : [],
		customTags: [],
		image: Array.isArray(post.images) ? post.images : [],
		likes: post.likes ?? 0,
		views: post.views ?? 0,
		link: post.link ?? [],
		userId: post.userId,
		user: post.user,
	});

	const fetchPosts = async () => {
		try {
			let response: Response<IBackendPost[]>;
			if (userId !== undefined) {
				response = await getPostsByUserId(userId);
			} else {
				response = await getAllPosts();
			}

			if (response.status === "success" && Array.isArray(response.data)) {
				setPosts(response.data.map(adaptPost));
			}
		} catch (error) {
			console.error("Ошибка при загрузке постов:", error);
		} 
	};

	useEffect(() => {
		fetchPosts();
	}, [userId]);

	return { posts, fetchPosts};
}
