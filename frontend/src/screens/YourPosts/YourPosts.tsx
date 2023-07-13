import { VStack, Text, useTheme, Heading, ScrollView } from "native-base";
import { MenuTop } from "../../components/Menus/MenuTop";
import { useState, useEffect, useContext } from "react";
import { EditPost } from "./EditPost/EditPost";
import { getUserPosts, getUserById } from "../../services/usePost";
import { Post } from "../../components/newPost/Post";
import { Loading } from "../../components/Loadings/Loading";
import { ResultContext } from "../../contexts/SearchResult";
export function YourPosts() {
	const { fetchPostsUser, postsUser }: any = ({} = useContext(ResultContext));
	const { colors } = useTheme();
	const [controllerEdit, setControllerEdit] = useState(false);
	const [id, setId] = useState("");
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		// fetchPosts();
		fetchPostsUser();
	}, []);
	// const fetchPosts = async () => {
	// 	try {
	// 		const result = await getUserPosts();
	// 		if (result) {
	// 			for (let i = 0; i < result.length; i++) {
	// 				const user = await getUserById(result[i].userID._id);
	// 				result[i].user = user;
	// 			}
	// 			setPosts(result);
	// 		}
	// 	} catch (error) {
	// 		console.error("Falha ao buscar as postagens:", error);
	// 	}
	// };
	function controllerLayout(id) {
		if (controllerEdit) {
			setControllerEdit(false);
			// fetchPosts();
			fetchPostsUser();
		} else {
			setControllerEdit(true);
			setId(id);
		}
	}
	return (
		<VStack flex={1} pb={6} bg="gray.700">
			<MenuTop search={false}></MenuTop>
			<ScrollView flex={1} px={5} bg="gray.700">
				{postsUser ? (
					controllerEdit ? (
						<EditPost id={id} controllerLayout={controllerLayout} />
					) : postsUser.length > 0 ? (
						postsUser.length > 0 &&
						postsUser.map((value, key) => (
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
								fav={value.user.listShoop}
								type={true}
								controllerLayout={controllerLayout}
							/>
						))
					) : (
						<Text color="white" alignItems="center">
							Não existe nenhum postagem criada até o momento
						</Text>
					)
				) : (
					<Loading />
				)}
			</ScrollView>
		</VStack>
	);
}
