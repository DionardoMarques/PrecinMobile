import { useState, useContext } from "react";
import { VStack, Text, useTheme, Heading } from "native-base";
import { MenuTop } from "../../components/Menus/MenuTop";
import { ButtonForm } from "../../components/Buttons/ButtonForm";
import { AuthContext } from "../../contexts/UserContext";
export function Profile() {
	const { colors } = useTheme();
	// const [isLoading, setIsLoading] = useState(false);
	const { logout, userInfo }: any = ({} = useContext(AuthContext));

	function handleLogout() {
		logout();
	}
	return (
		<VStack flex={1} pb={6} bg="gray.700">
			<MenuTop search={false}></MenuTop>
			<VStack flex={1} alignItems="center" bg="gray.700" px={8} pt={24}>
				<Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
					{userInfo.name}
				</Heading>
				<ButtonForm
					mb={4}
					title="Sair"
					w="full"
					onPress={handleLogout}
					// isLoading={isLoading}
				/>
			</VStack>
		</VStack>
	);
}
