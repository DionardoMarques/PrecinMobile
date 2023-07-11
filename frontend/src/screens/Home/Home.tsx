import React, { useEffect, useState } from "react";
import {
	Text,
	VStack,
	useTheme,
	Heading,
	Box,
	Image,
	IconButton,
	Button,
} from "native-base";
import { ShoppingCart } from "phosphor-react-native";
import { MenuTop } from "../../components/Menus/MenuTop";
import { getPosts } from "../../services/usePost";

export function Home() {
	const { colors } = useTheme();
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetchPosts();
	}, []);

	const fetchPosts = async () => {
		const fetchedPosts = await getPosts();
		setPosts(fetchedPosts);
	};
	return (
		<VStack flex={1} pb={6} bg="gray.700">
			<MenuTop search={true}></MenuTop>
			<VStack flex={1} px={5} bg="gray.700">
				{posts.length === 0 ? (
					<Text color="gray.500">Não existe nenhum postagem</Text>
				) : (
					posts.map((post) => (
						<Box
							key={post._id}
							bg="rgba(37, 108, 225, 1)"
							borderRadius="md"
							py={2}
							px={4}
							mb={7}
							alignItems="center"
							justifyContent="center"
							flexDirection="column"
						>
							{/* Criador da postagem / Lista de Favoritos */}
							<Box
								flexDirection="row"
								alignItems="center"
								justifyContent="space-between"
								width="100%"
								mb={3}
							>
								<Box flexDirection="row" alignItems="center">
									<Image
										source={require("../../../assets/avatar.png")}
										width={6}
										height={6}
										alt="Avatar"
										borderColor={colors.white}
										borderRadius={100}
										overflow="hidden"
										borderWidth={2}
										mr={2}
									/>
									<Text color="white">Dionardo Marques</Text>
								</Box>
								<ShoppingCart color={colors.white} size={20} />
							</Box>

							{/* Imagem e informações do produto */}
							<Box flexDirection="row" alignItems="center" mb={3}>
								<Image
									mr={5}
									source={require("../../../assets/suco_naturale.jpg")}
									alt={post.product}
									width={75}
									height={70}
									borderColor={colors.white}
									borderRadius="md"
									overflow="hidden"
									borderWidth={2}
								/>
								<Box flexDirection="column" alignItems="center">
									<Text color={colors.white}>{post.product}</Text>
									<Text color={colors.white} fontWeight="bold" fontSize={30}>
										R$ {post.price}
									</Text>
									{/* <Text color={colors.white}>{post.market}</Text> */}
								</Box>
							</Box>

							{/* Precin/Precao/Comentarios */}
							<Box flexDirection="row">
								<Button p={2} colorScheme="white" size="sm" mr={2}>
									Precin: {post.precin.length}
								</Button>
								<Button colorScheme="white" size="sm" mr={2}>
									Preção: {post.precao.length}
								</Button>
								<Button colorScheme="white" size="sm">
									Comentários: {post.comments}
								</Button>
							</Box>
						</Box>
					))
				)}
			</VStack>
		</VStack>
	);
}
