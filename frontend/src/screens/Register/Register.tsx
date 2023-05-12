import { useState } from "react";

import { VStack, Heading, Icon, useTheme, Image, Text } from "native-base";
import { Envelope, Key, User } from "phosphor-react-native";

import { InputCamp } from "../../components/Inputs/InputCamp";
import { ButtonForm } from "../../components/Buttons/ButtonForm";
export function Register() {
	const { colors } = useTheme();
	const [isLoading, setIsLoading] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	function handleSignIn() {
		console.log("Oi");
	}

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
				InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
				secureTextEntry
				onChangeText={setPassword}
			/>
			<InputCamp
				mb={8}
				placeholder="Confirmar Senha"
				InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
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
			<Text color={colors.white} alignItems={"center"}>
				Já possui conta?
			</Text>
		</VStack>
	);
}
