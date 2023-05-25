import api from "../services/api";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAuth() {
	const [authenticated, setAuthenticated] = useState(false);

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

	async function authUser(data) {
		try {
			await AsyncStorage.setItem("token", JSON.stringify(data.token));
		} catch (e) {
			console.log("Erro: ", e);
		}
		setAuthenticated(true);
	}

	return { register, authenticated };
}
