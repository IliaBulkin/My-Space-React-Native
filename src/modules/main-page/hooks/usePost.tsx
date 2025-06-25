import AsyncStorage from "@react-native-async-storage/async-storage";
import { IPostFromBackend, IUserPost } from "../types/post";
import { Response } from "../../../shared/types";

interface PostPayload {
	title: string;
	text: string;
	existingTags: string[];
	newTags: string[];
	images: string[];
	link: string[];
}

interface UpdatePayload extends PostPayload {
	id: number;
}

export function usePost() {
	const BASE_URL = "http://192.168.3.11:3011";

	async function getToken() {
		return await AsyncStorage.getItem("token");
	}

	function transformToPayload(post: IUserPost): PostPayload {
		return {
			title: post.name,
			text: post.description,
			existingTags: post.defaultTags,
			newTags: post.customTags,
			images: post.image ,
			link: post.link,
		};
	}

	async function createPost(post: IUserPost) {
		const token = await getToken();
		if (!token) return "";

		const payload = transformToPayload(post);

		try {
			const res = await fetch(`${BASE_URL}/post/create`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(payload),
			});
			const results = await res.json();
			return results;
		} catch (error) {
			console.error(error);
			return "";
		}
	}

	async function updatePost(id: number, post: IUserPost) {
		const token = await getToken();
		if (!token) return "";

		const payload: UpdatePayload = {
			...transformToPayload(post),
			id,
		};

		try {
			const res = await fetch(`${BASE_URL}/post/update`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(payload),
			});

			return await res.json();
		} catch (error) {
			console.error(error);
			return "";
		}
	}

	async function deletePost(id: number) {
		const token = await getToken();
		if (!token) return "";

		try {
			const res = await fetch(`${BASE_URL}/post/delete`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ id }),
			});

			return await res.json();
		} catch (error) {
			console.error(error);
			return "";
		}
	}

	async function getAllPosts() {
		try {
			const res = await fetch(`${BASE_URL}/post/find-all-posts`);
			return await res.json();
		} catch (error) {
			console.error(error);
			return "";
		}
	}

	async function getPostsByUserId(userId: number) {
		try {
			const res = await fetch(
				`${BASE_URL}/post/find-posts-by-user-id/${userId}`
			);
			return await res.json();
		} catch (error) {
			console.error(error);
			return "";
		}
	}

	async function getAllTags() {
		try {
			const res = await fetch(`${BASE_URL}/post/find-all-tags`);
			return await res.json();
		} catch (error) {
			console.error(error);
			return "";
		}
	}

	async function getPostById(postId: number): Promise<Response <IPostFromBackend>> {
		try {
			const res = await fetch(`${BASE_URL}/post/find-post-by-id/${postId}`, {"method": "GET"});
			const data = await res.json();
			return data
		} catch (error) {
			console.error(error);
			return {status: "error", message: ""};
		}
	}

	return {
		createPost,
		updatePost,
		deletePost,
		getAllPosts,
		getPostsByUserId,
		getAllTags,
		getPostById
	};
}
