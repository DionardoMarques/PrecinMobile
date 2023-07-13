import { VStack, useTheme, ScrollView } from "native-base";
import { useState, useEffect, useContext } from "react";
import { MenuTop } from "../../components/Menus/MenuTop";
// import { Post } from "../../components/Posts/Post";
import { getPosts, getUserById } from "../../services/usePost";
import { Post } from "../../components/newPost/Post";
import { Loading } from "../../components/Loadings/Loading";
import { ResultContext } from "../../contexts/SearchResult";
export function Home() {
	const { colors } = useTheme();
	const [controllerEdit, setControllerEdit] = useState(false);
	const { result, posts }: any = ({} = useContext(ResultContext));
	return (
		<VStack flex={1} pb={6} bg="gray.700">
			<MenuTop search={true}></MenuTop>
			{/* <ScrollView flex={1} px={5} bg="gray.700">
				<Post />
			</ScrollView> */}
			<ScrollView flex={1} px={5} bg="gray.700">
				{posts ? (
					posts.length > 0 &&
					posts
						.filter((value) => {
							if (result === "") {
								return value;
							} else if (
								value.product.toLowerCase().includes(result.toLowerCase())
							) {
								return value;
							}
						})
						.map((value, key) => (
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
								type={false}
								controllerLayout={undefined}
							/>
						))
				) : (
					<Loading />
				)}
			</ScrollView>
		</VStack>
	);
}
