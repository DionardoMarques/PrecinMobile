import api from "./api";

export async function getPosts() {
	try {
		const response = await api.get("posts/getposts");
		return response.data.posts;
	} catch (error) {
		console.error("Falha ao buscar as postagens:", error);
		return [];
	}
}

export async function getPostById(id) {
	try {
		const response = await api.get(`posts/${id}`);
		return response.data.post;
	} catch (error) {
		console.error("Falha ao buscar a postagem:", error);
		return [];
	}
}

export async function editPost(id, post) {
	try {
		const response = await api.patch(`posts/${id}`, post, {
			headers: {
				Accept: "application/json",
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data.post;
	} catch (error) {
		console.error("Falha ao editar a postagem:", error);
		return [];
	}
}

export async function getUserById(id) {
	try {
		const response = await api.get(`users/${id}`);
		return response.data.user;
	} catch (error) {
		console.error("Falha ao buscar o usuário:", error);
		return null;
	}
}
