import React, { createContext, useState, useEffect } from "react";
import { getPosts, getUserById, getUserPosts } from "../services/usePost";
export const ResultContext = createContext({});

function ResultProvider({ children }) {
	const [result, setResult] = useState("");
	const [posts, setPosts] = useState([]);
	const [postsUser, setPostsUser] = useState([]);
	useEffect(() => {
		fetchPostsz();
		fetchPostsUser();
	}, []);
	const fetchPostsz = async () => {
		try {
			const result = await getPosts();
			for (let i = 0; i < result.length; i++) {
				const user = await getUserById(result[i].userID._id);
				result[i].user = user;
			}
			setPosts(result);
		} catch (error) {
			console.error("Falha ao buscar as postagens:", error);
		}
	};

	const fetchPostsUser = async () => {
		try {
			const result = await getUserPosts();
			if (result) {
				for (let i = 0; i < result.length; i++) {
					const user = await getUserById(result[i].userID._id);
					result[i].user = user;
				}
				setPostsUser(result);
			}
		} catch (error) {
			console.error("Falha ao buscar as postagens:", error);
		}
	};
	return (
		<ResultContext.Provider
			value={{
				result,
				setResult,
				posts,
				fetchPostsz,
				fetchPostsUser,
				postsUser,
			}}
		>
			{children}
		</ResultContext.Provider>
	);
}
export default ResultProvider;
