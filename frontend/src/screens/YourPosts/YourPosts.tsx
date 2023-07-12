import { VStack, Text, useTheme, Heading, ScrollView } from "native-base";
import { MenuTop } from "../../components/Menus/MenuTop";
import { useState, useEffect } from "react";
import { EditPost } from "./EditPost/EditPost";
import { getUserPosts, getUserById } from "../../services/usePost";
import { Post } from "../../components/newPost/Post";
import { Loading } from "../../components/Loadings/Loading";
export function YourPosts() {
	const { colors } = useTheme();
	const [controllerEdit, setControllerEdit] = useState(false);
	useEffect(() => {
		fetchPosts();
	}, []);
	const fetchPosts = async () => {
		try {
			const result = await getUserPosts();
			for (let i = 0; i < result.length; i++) {
				const user = await getUserById(result[i].userID._id);
				result[i].user = user;
			}
			setPosts(result);
		} catch (error) {
			console.error("Falha ao buscar as postagens:", error);
		}
	};
	const [posts, setPosts] = useState([]);
	return (
		<VStack flex={1} pb={6} bg="gray.700">
			<MenuTop search={false}></MenuTop>
			<ScrollView flex={1} px={5} bg="gray.700">
				{posts ? (
					controllerEdit ? (
						<EditPost />
					) : (
						posts.length > 0 &&
						posts.map((value, key) => (
							<Post
								key={key}
								id={value._id}
								product={value.product}
								price={value.price}
								market={value.market}
								address={value.address}
								userName={value.user.name}
								userPhoto={value.user.image}
								like={value.precin}
								dislike={value.precao}
								comments={value.comments}
								productImage={value.productImage}
							/>
						))
					)
				) : (
					<Loading />
				)}
			</ScrollView>
		</VStack>
	);
}
