import AsyncStorage from "@react-native-async-storage/async-storage";
import { IPostFromBackend, IUserPost } from "../types/post";
import { Response } from "../../../shared/types";
import { HOST, PORT } from "../../../shared/base-url";

interface PostPayload {
	title: string;
	content: string;
	existingTags: string[];
	newTags: string[];
	images: string[];
	link: string[];
}

interface UpdatePayload extends PostPayload {
	id: number;
}

export function usePost() {
	async function getToken() {
		return await AsyncStorage.getItem("token");
	}

	// function transformToPayload(post: IUserPost): PostPayload {
	// 	return {
	// 		title: post.title,
	// 		content: post.content,
	// 		existingTags: post.existingTags,
	// 		newTags: post.newTags,
	// 		images: post.images,
	// 		link: post.link,
	// 	};
	// }

	async function createPost(post: IUserPost) {
		const token = await getToken();
		if (!token) return "";

		// const payload = transformToPayload(post);

		try {
			const res = await fetch(`http://${HOST}/post/create`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(post),
			});
			const result = await res.json();
			return result;
		} catch (error) {
			console.error(error);
			return "";
		}
	}

	async function updatePost(id: number, post: any) {
		const token = await getToken();
		if (!token) return "";

		// const payload: UpdatePayload = {
		// 	...transformToPayload(post),
		// 	id,
		// };

		try {
			const res = await fetch(`http://${HOST}/post/update`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({...post, id}),
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
			const res = await fetch(`http://${HOST}/post/delete`, {
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
			const res = await fetch(`http://${HOST}/post/find-all-posts`);
			const result = await res.json();
			return result
		} catch (error) {
			console.error(error);
			return "";
		}
	}

	async function getPostsByUserId(userId: number) {
		try {
			const res = await fetch(
				`http://${HOST}/post/find-posts-by-user-id/${userId}`
			);
			return await res.json();
		} catch (error) {
			console.error(error);
			return "";
		}
	}

	async function getAllTags() {
		try {
			const res = await fetch(`http://${HOST}/post/find-all-tags`);
			return await res.json();
		} catch (error) {
			console.error(error);
			return "";
		}
	}
// : Promise<Response<IUserPost>>
	async function getPostById(postId: number) {
		try {
			const res = await fetch(
				`http://${HOST}/post/find-post-by-id/${postId}`,
				{ method: "GET" }
			);
			const data = await res.json();
			return data;
		} catch (error) {
			console.error(error);
			return { status: "error", message: "" };
		}
	}

	return {
		createPost,
		updatePost,
		deletePost,
		getAllPosts,
		getPostsByUserId,
		getAllTags,
		getPostById,
	};
}
