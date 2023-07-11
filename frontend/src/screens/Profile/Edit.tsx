import { useState, useContext } from "react";
import {
	HStack,
	VStack,
	Text,
	useTheme,
	Heading,
	Image,
	Icon,
} from "native-base";
import { ButtonForm } from "../../components/Buttons/ButtonForm";
import { AuthContext } from "../../contexts/UserContext";
import { InputCamp } from "../../components/Inputs/InputCamp";
import { Envelope, Key, User } from "phosphor-react-native";
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

	async function handleEdit() {
		const user = {
			name: name,
			email: email,
			password: password,
			confirmpassword: confirmPassword,
		};
		await updateUser(user);
		await checkUser();
		props.handleLayout();
	}
	return (
		<VStack flex={1} alignItems="center" bg="gray.700" px={8} pt={14}>
			<Image
				size={150}
				borderRadius={100}
				source={{
					uri: `http://10.0.2.2:3000/files/users/${userInfo.image}`,
				}}
				alt="Logo"
			/>
			<Heading color="gray.100" fontSize="xl" mt={10} mb={6}>
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
