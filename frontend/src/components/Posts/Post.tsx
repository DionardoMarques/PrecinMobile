import { useState, useEffect, useContext } from "react";
import { getPosts, getUserById } from "../../services/usePost";
import { AuthContext } from "../../contexts/UserContext";
import CustomModal from "../../components/Modals/Modal";

import {
	Pressable,
	Text,
	useTheme,
	Box,
	Image,
	Button,
	HStack,
} from "native-base";

import {
	ShoppingCart,
	ThumbsUp,
	ThumbsDown,
	ChatText,
	MapPin,
} from "phosphor-react-native";

export function Post() {
	const { precin, precao }: any = ({} = useContext(AuthContext));
	const { colors } = useTheme();

	const [posts, setPosts] = useState([]);

	const [isModalVisible, setModalVisible] = useState(false);

	const [selectedPost, setSelectedPost] = useState(null);
	const [selectedMarket, setSelectedMarket] = useState(null);
	const [selectedAddress, setSelectedAddress] = useState(null);

	useEffect(() => {
		fetchPosts();
	}, []);

	const fetchPosts = async () => {
		try {
			const fetchedPosts = await getPosts();
			const initializedPosts = [];

			for (const post of fetchedPosts) {
				const user = await getUserById(post.userID._id);

				if (user) {
					const initializedPost = {
						...post,
						user: user.name,
						precinDisabled: false,
						precaoDisabled: false,
						commentsDisabled: false,
					};

					initializedPosts.push(initializedPost);
				}
			}

			setPosts(initializedPosts);
		} catch (error) {
			console.error("Falha ao buscar as postagens:", error);
			setPosts([]);
		}
	};

	function handleWhishList() {
		console.log("Favorito clicado!");
	}

	function handleMarketLocalizationClick(postId, market, address) {
		setSelectedPost(postId);
		setSelectedMarket(market);
		setSelectedAddress(address);

		setModalVisible(true);
	}

	function handlePrecinClick(postId) {
		setPosts((prevPosts) =>
			prevPosts.map((post) =>
				post._id === postId
					? {
							...post,
							precinDisabled: !post.precinDisabled,
							precaoDisabled: false,
							commentsDisabled: false,
					  }
					: post
			)
		);
		precin(postId);
	}

	function handlePrecaoClick(postId) {
		setPosts((prevPosts) =>
			prevPosts.map((post) =>
				post._id === postId
					? {
							...post,
							precinDisabled: false,
							precaoDisabled: !post.precaoDisabled,
							commentsDisabled: false,
					  }
					: post
			)
		);
		precao(postId);
	}

	return (
		<>
			{posts.length === 0 ? (
				<Text color="white" alignItems="center">
					Não existe nenhum postagem criada até o momento
				</Text>
			) : (
				posts.map((post) => (
					<Box
						key={post._id}
						bg="buttons.default"
						borderRadius="md"
						py={2}
						px={4}
						mb={7}
						alignItems="center"
						justifyContent="center"
						flexDirection="column"
					>
						{/* Usuário e Favoritos */}
						<Box
							flexDirection="row"
							alignItems="center"
							justifyContent="space-between"
							width="100%"
							mb={2}
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
								<Text color="white">{post.user}</Text>
							</Box>
							<Pressable onPress={() => handleWhishList()}>
								<ShoppingCart color={colors.white} size={20} />
							</Pressable>
						</Box>

						{/* Imagem/Nome/Preço/Mercado produto */}
						<Box flexDirection="row" alignItems="center" mb={2}>
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
							<Box flexDirection="column" alignItems="center" mr={5}>
								<Text color={colors.white}>{post.product}</Text>
								<Text color={colors.white} fontWeight="bold" fontSize={30}>
									<Text fontSize={15}>R$ </Text>
									{post.price}
								</Text>
							</Box>

							<Box flexDirection="row" alignItems="center">
								<Button
									bg="blue.400"
									size="xs"
									onPress={() =>
										handleMarketLocalizationClick(
											post._id,
											post.market,
											post.address
										)
									}
								>
									<HStack space={1} alignItems="center">
										<Text color={colors.white}>{post.market}</Text>
										<MapPin color="white" />
									</HStack>
								</Button>
							</Box>
						</Box>

						{/* Botões Precin/Precão/Comentários */}
						<Box flexDirection="row">
							<Pressable
								onPress={() => handlePrecinClick(post._id)}
								disabled={post.precinDisabled}
							>
								<Box flexDirection="row" alignItems="center" mr={10}>
									<ThumbsUp
										color={post.precinDisabled ? "gray" : "white"}
										size={20}
									/>
									<Text color={post.precinDisabled ? "gray" : "white"} ml={1}>
										{post.precin.length}
									</Text>
								</Box>
							</Pressable>
							<Pressable
								onPress={() => handlePrecaoClick(post._id)}
								disabled={post.precaoDisabled}
							>
								<Box flexDirection="row" alignItems="center" mr={10}>
									<ThumbsDown
										color={post.precaoDisabled ? "gray" : "white"}
										size={20}
									/>
									<Text color={post.precaoDisabled ? "gray" : "white"} ml={1}>
										{post.precao.length}
									</Text>
								</Box>
							</Pressable>
							<Box flexDirection="row" alignItems="center">
								<ChatText color="white" size={20} />
								<Text color="white" ml={1}>
									{post.comments}
								</Text>
							</Box>
						</Box>

						{/* Modal Localização Mercado */}
						<CustomModal
							isOpen={isModalVisible}
							onClose={() => setModalVisible(false)}
							selectedMarket={selectedMarket}
							selectedAddress={selectedAddress}
						/>
					</Box>
				))
			)}
		</>
	);
}
