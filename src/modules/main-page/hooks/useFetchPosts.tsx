import { useEffect, useState } from "react";
import { usePost } from "./usePost";
import { IUserPostWithUser } from "../types/post";
import { IBackendPost } from "../types/post-info";
import { Response } from "../../../shared/types";

export function useFetchPosts(userId?: number) {
	const [posts, setPosts] = useState<IBackendPost[]>([]);
	const { getAllPosts, getPostsByUserId } = usePost();


	const fetchPosts = async () => {
		try {
			let response: Response<IBackendPost[]>;
			if (userId !== undefined) {
				response = await getPostsByUserId(userId);
			} else {
				response = await getAllPosts();
			}
			if (response.status === "success") {
				setPosts(response.data);
			}
		} catch (error) {
			console.error("Ошибка при загрузке постов:", error);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, [userId]);

	return { posts, fetchPosts };
}
