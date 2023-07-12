import { useState, useEffect, useContext } from "react";
import { getPosts, getUserById } from "../../services/usePost";
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
import { AuthContext } from "../../contexts/UserContext";
export function Post({
	id,
	userName,
	product,
	price,
	market,
	like,
	dislike,
	comments,
	address,
	userPhoto,
	productImage,
}) {
	const { colors } = useTheme();
	const { precin, precao, userInfo }: any = ({} = useContext(AuthContext));
	const [precinCount, setPrecinCount] = useState(like.length);
	const [precaoCount, setPrecaoCount] = useState(dislike.length);
	const [precinController, setPrecinController] = useState(false);
	const [precaoController, setPrecaoController] = useState(false);

	const [isModalVisible, setModalVisible] = useState(false);

	const [selectedPost, setSelectedPost] = useState(null);
	const [selectedMarket, setSelectedMarket] = useState(null);
	const [selectedAddress, setSelectedAddress] = useState(null);
	useEffect(() => {
		verifyButtons();
	}, []);

	function verifyButtons() {
		if (like.indexOf(userInfo._id) > -1) {
			setPrecinController(true);
		} else {
			if (dislike.indexOf(userInfo._id) > -1) {
				setPrecaoController(true);
			}
		}
	}

	function handleMarketLocalizationClick() {
		setSelectedPost(id);
		setSelectedMarket(market);
		setSelectedAddress(address);

		setModalVisible(true);
	}
	function handlePrecinClick() {
		precin(id);
		if (precinController) {
			setPrecinController(false);
			setPrecinCount(precinCount - 1);
		} else {
			setPrecinController(true);
			setPrecinCount(precinCount + 1);
			if (precaoController) {
				setPrecaoController(false);
				setPrecaoCount(precaoCount - 1);
			}
		}
	}
	function handlePrecaoClick() {
		precao(id);
		if (precaoController) {
			setPrecaoController(false);
			setPrecaoCount(precaoCount - 1);
		} else {
			setPrecaoController(true);
			setPrecaoCount(precaoCount + 1);
			if (precinController) {
				setPrecinController(false);
				setPrecinCount(precinCount - 1);
			}
		}
	}
	return (
		<Box
			key={id}
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
						source={{
							uri: `http://10.0.2.2:3000/files/users/${userPhoto}`,
						}}
						width={6}
						height={6}
						alt="Avatar"
						borderColor={colors.white}
						borderRadius={100}
						overflow="hidden"
						borderWidth={2}
						mr={2}
					/>
					<Text color="white">{userName}</Text>
				</Box>
				<Pressable>
					<ShoppingCart color={colors.white} size={20} />
				</Pressable>
			</Box>

			{/* Imagem/Nome/Preço/Mercado produto */}
			<Box flexDirection="row" alignItems="center" mb={2}>
				<Image
					mr={5}
					source={{
						uri: `http://10.0.2.2:3000/files/posts/${productImage}`,
					}}
					alt={product}
					width={75}
					height={70}
					borderColor={colors.white}
					borderRadius="md"
					overflow="hidden"
					borderWidth={2}
				/>
				<Box flexDirection="column" alignItems="center" mr={5}>
					<Text color={colors.white}>{product}</Text>
					<Text color={colors.white} fontWeight="bold" fontSize={30}>
						<Text fontSize={15}>R$ </Text>
						{price}
					</Text>
				</Box>

				<Box flexDirection="row" alignItems="center">
					<Button
						bg="blue.400"
						size="xs"
						onPress={() => handleMarketLocalizationClick()}
					>
						<HStack space={1} alignItems="center">
							<Text color={colors.white}>{market}</Text>
							<MapPin color="white" />
						</HStack>
					</Button>
				</Box>
			</Box>

			{/* Botões Precin/Precão/Comentários */}
			<Box flexDirection="row">
				<Pressable onPress={() => handlePrecinClick()}>
					<Box flexDirection="row" alignItems="center" mr={10}>
						<ThumbsUp color={precinController ? "gray" : "white"} size={20} />
						<Text color={"white"} ml={1}>
							{precinCount}
						</Text>
					</Box>
				</Pressable>
				<Pressable onPress={() => handlePrecaoClick()}>
					<Box flexDirection="row" alignItems="center" mr={10}>
						<ThumbsDown color={precaoController ? "gray" : "white"} size={20} />
						<Text color={"white"} ml={1}>
							{precaoCount}
						</Text>
					</Box>
				</Pressable>
				<Box flexDirection="row" alignItems="center">
					<ChatText color="white" size={20} />
					<Text color="white" ml={1}>
						{comments}
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
	);
}
