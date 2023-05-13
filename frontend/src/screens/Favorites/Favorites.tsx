import { VStack, Text, useTheme, Heading } from "native-base";
import { MenuTop } from "../../components/Menus/MenuTop";
export function Favorites() {
	const { colors } = useTheme();
	return (
		<VStack flex={1} pb={6} bg="gray.700">
			<MenuTop search={false}></MenuTop>
			<VStack flex={1} alignItems="center" bg="gray.700" px={8} pt={24}>
				<Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
					Lista de favoritos...
				</Heading>
			</VStack>
		</VStack>
	);
}
