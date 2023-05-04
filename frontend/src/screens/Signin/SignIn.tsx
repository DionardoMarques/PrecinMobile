import { VStack, Heading, Icon, useTheme, Image } from "native-base";
import { Input } from "../../components/Input";
export function SignIn() {
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
			<Input mb={4} placeholder="E-mail" />
			<Input mb={8} placeholder="Senha" />
		</VStack>
	);
}
