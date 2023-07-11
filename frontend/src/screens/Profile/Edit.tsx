import { useState, useContext } from "react";
import {
	HStack,
	VStack,
	Text,
	useTheme,
	Heading,
	Image,
	Icon,
	Button,
} from "native-base";
import { ButtonForm } from "../../components/Buttons/ButtonForm";
import { AuthContext } from "../../contexts/UserContext";
import { InputCamp } from "../../components/Inputs/InputCamp";
import { Envelope, Key, User, Camera } from "phosphor-react-native";
import * as ImagePicker from "expo-image-picker";
export function Edit(props) {
	const { colors, fontSizes } = useTheme();
	// const [isLoading, setIsLoading] = useState(false);
	const { userInfo, checkUser, updateUser }: any = ({} =
		useContext(AuthContext));
	const [layout, setLayout] = useState(true);
	const [name, setName] = useState(userInfo.name);
	const [email, setEmail] = useState(userInfo.email);
	const [password, setPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();
	const [image, setImage] = useState("");

	const [controllerImage, setControllerImage] = useState(false);

	const [imgFormat, setImgFormat] = useState();

	const formData = new FormData();
	let user: {
		[x: string]: string | Blob;
		name?: any;
		email?: any;
		password?: undefined;
		confirmpassword?: undefined;
		image?: undefined;
	};
	async function handleEdit() {
		if (controllerImage) {
			if (!password) {
				user = {
					name: name,
					email: email,
					image: imgFormat,
				};
			} else {
				user = {
					name: name,
					email: email,
					password: password,
					image: imgFormat,
					confirmpassword: confirmPassword,
				};
			}
			console.log("Entrou no if");
			await Object.keys(user).forEach((key) => formData.append(key, user[key]));
			await updateUser(formData);
		} else {
			if (!password) {
				user = {
					name: name,
					email: email,
				};
			} else {
				user = {
					name: name,
					email: email,
					password: password,
					confirmpassword: confirmPassword,
				};
			}
			await updateUser(user);
		}
		await checkUser();
		props.handleLayout();
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
			setControllerImage(true);
		}
	};
	return (
		<VStack flex={1} alignItems="center" bg="gray.700" px={8} pt={14}>
			{!controllerImage ? (
				<>
					<Image
						size={150}
						borderRadius={100}
						source={{
							uri: `http://10.0.2.2:3000/files/users/${userInfo.image}`,
						}}
						alt="userImage"
					/>
				</>
			) : (
				<Image
					size={150}
					borderRadius={100}
					source={{
						uri: image,
					}}
					alt="userImage"
					mb={4}
				/>
			)}
			<Button
				variant="unstyled"
				width={75}
				height={30}
				onPress={handleImagePicker}
			>
				<Camera color="white" size={28} />
			</Button>
			<Heading color="gray.100" fontSize="xl" mt={5} mb={5}>
				Edit Profile
			</Heading>
			<InputCamp
				mb={4}
				placeholder="Nome"
				InputLeftElement={
					<Icon as={<User color={colors.gray[300]} />} ml={4} />
				}
				value={name}
				onChangeText={setName}
			/>
			<InputCamp
				mb={4}
				placeholder="E-mail"
				InputLeftElement={
					<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
				}
				value={email}
				onChangeText={setEmail}
			/>
			<InputCamp
				mb={4}
				placeholder="Senha"
				InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
				secureTextEntry
				value={password}
				onChangeText={setPassword}
			/>
			<InputCamp
				mb={8}
				placeholder="Confirmar Senha"
				InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
				secureTextEntry
				value={confirmPassword}
				onChangeText={setConfirmPassword}
			/>
			<ButtonForm mb={4} title="Salvar" w="full" onPress={handleEdit} />
		</VStack>
	);
}
