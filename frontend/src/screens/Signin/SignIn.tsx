import { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import {
	VStack,
	Heading,
	Icon,
	useTheme,
	Image,
	Text,
	Link,
} from "native-base";
import { Envelope, Key, User } from "phosphor-react-native";

import { InputCamp } from "../../components/Inputs/InputCamp";
import { ButtonForm } from "../../components/Buttons/ButtonForm";
export function SignIn() {
	//Controller
	const [isDefault, setIsDefault] = useState(true);

	const [isLoading, setIsLoading] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const navigation = useNavigation();
	const { colors } = useTheme();

	function handleSignIn() {
		console.log("Oi");
	}

	function handlerDefault() {
		// setTimeout(() => {
		// 	navigation.navigate("register");
		// }, 1000);
		if (isDefault) {
			setIsDefault(false);
		} else {
			setIsDefault(true);
		}
	}
	if (isDefault) {
		return (
			<VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
				<Image
					size={150}
					borderRadius={100}
					source={require("../../../assets/logo.png")}
				/>
				<Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
					Login
				</Heading>
				<InputCamp
					mb={4}
					placeholder="E-mail"
					InputLeftElement={
						<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
					}
					onChangeText={setEmail}
				/>
				<InputCamp
					mb={8}
					placeholder="Senha"
					InputLeftElement={
						<Icon as={<Key color={colors.gray[300]} />} ml={4} />
					}
					secureTextEntry
					onChangeText={setPassword}
				/>

				<ButtonForm
					mb={4}
					title="Entrar"
					w="full"
					onPress={handleSignIn}
					isLoading={isLoading}
				/>
				<Text
					color={colors.white}
					alignItems={"center"}
					onPress={handlerDefault}
				>
					Não possui uma conta?
				</Text>
				{/* <Link
					color={colors.white}
					alignItems={"center"}
					onPress={handlerRegister}
				>
					Já possui conta?
				</Link> */}
			</VStack>
		);
	} else {
		return (
			<VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
				<Image
					size={150}
					borderRadius={100}
					source={require("../../../assets/logo.png")}
				/>
				<Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
					Cadastro
				</Heading>
				<InputCamp
					mb={4}
					placeholder="Nome"
					InputLeftElement={
						<Icon as={<User color={colors.gray[300]} />} ml={4} />
					}
					onChangeText={setName}
				/>
				<InputCamp
					mb={4}
					placeholder="E-mail"
					InputLeftElement={
						<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
					}
					onChangeText={setEmail}
				/>
				<InputCamp
					mb={4}
					placeholder="Senha"
					InputLeftElement={
						<Icon as={<Key color={colors.gray[300]} />} ml={4} />
					}
					secureTextEntry
					onChangeText={setPassword}
				/>
				<InputCamp
					mb={8}
					placeholder="Confirmar Senha"
					InputLeftElement={
						<Icon as={<Key color={colors.gray[300]} />} ml={4} />
					}
					secureTextEntry
					onChangeText={setConfirmPassword}
				/>

				<ButtonForm
					mb={2}
					title="Cadastrar"
					w="full"
					onPress={handleSignIn}
					isLoading={isLoading}
				/>
				<Text
					color={colors.white}
					alignItems={"center"}
					onPress={handlerDefault}
				>
					Já possui conta?
				</Text>
			</VStack>
		);
	}
}
