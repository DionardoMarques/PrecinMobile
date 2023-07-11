import { useState } from "react";
import {
	VStack,
	useTheme,
	Image,
	Box,
	ScrollView,
	Icon,
	Button,
} from "native-base";
import { MenuTop } from "../../components/Menus/MenuTop";
import {
	Camera,
	Image as Img,
	Tag,
	CurrencyDollarSimple,
	Storefront,
	MapPin,
} from "phosphor-react-native";
import { InputCamp } from "../../components/Inputs/InputCamp";
import { ButtonForm } from "../../components/Buttons/ButtonForm";
import * as ImagePicker from "expo-image-picker";
import PostService from "../../services/post";
export function Publication() {
	const [controllerImage, setControllerImage] = useState(false);

	const [name, setName] = useState();
	const [price, setPrice] = useState();
	const [market, setMarket] = useState();
	const [address, setAddress] = useState();
	const [image, setImage] = useState("");

	const [imgFormat, setImgFormat] = useState();

	const formData = new FormData();
	async function handlePost() {
		const post = {
			product: name,
			price: price,
			market: market,
			address: address,
			productImage: imgFormat,
		};
		await Object.keys(post).forEach((key) => formData.append(key, post[key]));
		try {
			await PostService.create(formData);
		} catch (error) {
			console.log(error.response.data);
		}
	}
	const handleImagePicker = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 4],
			base64: true,
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
			setControllerImage(true);
			const filename = result.assets[0].uri.substring(
				result.assets[0].uri.lastIndexOf("/") + 1,
				result.assets[0].uri.length
			);
			const extend = filename.split(".")[1];
			setImgFormat(
				JSON.parse(
					JSON.stringify({
						name: filename,
						uri: result.assets[0].uri,
						type: "image/" + extend,
					})
				)
			);
			// formData.append(
			// 	"file",
			// 	JSON.parse(
			// 		JSON.stringify({
			// 			name: filename,
			// 			uri: result.assets[0].uri,
			// 			type: "image/" + extend,
			// 		})
			// 	)
			// );
		}
	};

	const { colors } = useTheme();
	return (
		<VStack flex={1} pb={6} bg="gray.700">
			<MenuTop search={false}></MenuTop>
			<ScrollView>
				<VStack
					flex="1"
					alignItems="center"
					bg="gray.700"
					w="100%"
					px={8}
					pt={14}
				>
					{controllerImage ? (
						<>
							<Image
								size={150}
								borderRadius="md"
								source={{
									uri: image,
								}}
								alt="PostImage"
								mb={4}
							/>
							<Button
								variant="unstyled"
								width={75}
								height={30}
								onPress={handleImagePicker}
							>
								<Camera color="white" size={28} />
							</Button>
						</>
					) : (
						// <Box
						// 	flex={1}
						// 	flexDirection={"row"}
						// 	alignItems="center"
						// 	justifyContent="space-evenly"
						// 	// bg="rgba(37, 108, 225, 1)"
						// 	borderRadius="md"
						// 	width={185}
						// 	height={170}
						// 	p={4}
						// >
						// 	{/* <Img color="white" size={32} /> */}
						// 	<Camera color="white" size={52} />
						// </Box>
						<Button
							variant="unstyled"
							width={185}
							height={170}
							onPress={handleImagePicker}
						>
							<Camera color="white" size={58} />
						</Button>
					)}
					<InputCamp
						mb={4}
						placeholder="Nome"
						InputLeftElement={
							<Icon as={<Tag color={colors.gray[300]} />} ml={4} />
						}
						value={name}
						onChangeText={setName}
					/>
					<InputCamp
						mb={4}
						placeholder="Preço"
						InputLeftElement={
							<Icon
								as={<CurrencyDollarSimple color={colors.gray[300]} />}
								ml={4}
							/>
						}
						value={price}
						onChangeText={setPrice}
					/>
					<InputCamp
						mb={4}
						placeholder="Mercado"
						InputLeftElement={
							<Icon as={<Storefront color={colors.gray[300]} />} ml={4} />
						}
						value={market}
						onChangeText={setMarket}
					/>
					<InputCamp
						mb={4}
						placeholder="Rua X, 1500"
						InputLeftElement={
							<Icon as={<MapPin color={colors.gray[300]} />} ml={4} />
						}
						value={address}
						onChangeText={setAddress}
					/>
					<ButtonForm mb={4} title="Postar" w="full" onPress={handlePost} />
				</VStack>
			</ScrollView>
		</VStack>
	);
}
