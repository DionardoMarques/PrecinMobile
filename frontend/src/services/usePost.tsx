import api from "./api";

export async function getPosts() {
	try {
		const response = await api.get("posts/getposts");
		return response.data.posts;
	} catch (error) {
		console.error("Failed to fetch posts:", error);
		return [];
	}
}
