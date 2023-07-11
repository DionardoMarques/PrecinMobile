import Api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
	const token = AsyncStorage.getItem("token");
};

const PostService = {
	getId: (id) => Api.get(`posts/${id}`),
	create: (params) =>
		Api.post("posts/createpost", params, {
			headers: {
				Accept: "application/json",
				"Content-Type": "multipart/form-data",
			},
		}),
};
export default PostService;
