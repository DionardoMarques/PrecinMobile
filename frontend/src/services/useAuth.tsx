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

	useEffect(() => {
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
		} catch (error) {}
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

	async function checkUser() {
		try {
			await api.get("/users/checkuser").then((response) => {
				setUserInfo(response.data);
			});
		} catch (error) {
			console.log("Erro: ", error);
		}
	}

	async function authUser(data) {
		try {
			await AsyncStorage.setItem("token", JSON.stringify(data.token));
		} catch (e) {
			console.log("Erro: ", e);
		}
		setAuthenticated(true);
	}

	async function logout() {
		try {
			await AsyncStorage.removeItem("token");
			setAuthenticated(false);
			api.defaults.headers.Authorization = undefined;
			setUserInfo({});
		} catch (e) {
			console.log("Erro: ", e);
		}
	}

	return { register, authenticated, logout, login, userInfo };
}
