import api from "../services/api";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAuth() {
	const [authenticated, setAuthenticated] = useState(false);
	const [userInfo, setUserInfo] = useState({});

	// Verify token in Storage
	useEffect(() => {
		getToken();
		checkUser();
	}, []);
	const getToken = async () => {
		try {
			const token = await AsyncStorage.getItem("token");
			if (token) {
				api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
				setAuthenticated(true);
			} else {
				setAuthenticated(false);
				api.defaults.headers.Authorization = undefined;
			}
		} catch (error) {
			console.log("Erro", error);
		}
	};

	async function register(user) {
		try {
			const data = await api.post("users/register", user).then((response) => {
				return response.data;
			});
			await authUser(data);
		} catch (error) {
			console.log("Erro: ", error.response.data);
		}
	}

	async function login(user) {
		try {
			const data = await api.post("/users/login", user).then((response) => {
				return response.data;
			});
			await authUser(data);
		} catch (error) {
			console.log(error.response.data.message);
		}
	}

	async function updateUser(user) {
		try {
			const data = await api
				.patch(`/users/edit/`, user, {
					headers: {
						Accept: "application/json",
						"Content-Type": "multipart/form-data",
					},
				})
				.then((response) => {
					return response.data.message;
				});
			const r = await checkUser();
			setUserInfo(r);
		} catch (error) {
			console.log(error.response.data.message);
		}
	}

	async function deleteUser() {
		try {
			const data = await api.delete(`/users/delete/`).then((response) => {
				return response.data.message;
			});
			logout();
		} catch (error) {
			console.log(error.response.data.message);
		}
	}

	async function precin(id) {
		try {
			const data = await api.patch(`/users/precin/${id}`).then((response) => {
				return response.data.message;
			});
		} catch (error) {
			console.log(error.response.data.message);
		}
	}

	async function precao(id) {
		try {
			const data = await api.patch(`/users/precao/${id}`).then((response) => {
				return response.data.message;
			});
		} catch (error) {
			console.log(error.response.data.message);
		}
	}

	async function increaseList(id) {
		try {
			const data = await api
				.patch(`/users/increaselist/${id}`)
				.then((response) => {
					return response.data.message;
				});
		} catch (error) {
			console.log(error.response.data.message);
		}
	}

	async function decreaseList(id) {
		try {
			const data = await api
				.patch(`/users/decreaselist/${id}`)
				.then((response) => {
					return response.data.message;
				});
		} catch (error) {
			console.log(error.response.data.message);
		}
	}

	async function checkUser() {
		try {
			const token = await AsyncStorage.getItem("token");
			api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
			const user = await api.get("/users/checkuser").then((response) => {
				return response.data;
			});
			setUserInfo(user);
			return user;
		} catch (error) {
			console.log("Erro: ", error.response.data.message);
		}
	}

	async function authUser(data) {
		try {
			await AsyncStorage.setItem("token", JSON.stringify(data.token));
			await getToken();
			await checkUser();
		} catch (e) {
			console.log("Erro: ", e);
		}
	}

	async function logout() {
		try {
			await AsyncStorage.removeItem("token");
			setAuthenticated(false);
			api.defaults.headers.Authorization = undefined;
			setUserInfo(undefined);
		} catch (e) {
			console.log("Erro: ", e);
		}
	}

	return {
		register,
		authenticated,
		logout,
		login,
		checkUser,
		userInfo,
		updateUser,
		deleteUser,
		precin,
		precao,
		increaseList,
		decreaseList,
	};
}
