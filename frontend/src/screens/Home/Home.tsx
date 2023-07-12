import { VStack, useTheme, ScrollView } from "native-base";

import { MenuTop } from "../../components/Menus/MenuTop";
import { Post } from "../../components/Posts/Post";

export function Home() {
	const { colors } = useTheme();

	return (
		<VStack flex={1} pb={6} bg="gray.700">
			<MenuTop search={true}></MenuTop>
			<ScrollView flex={1} px={5} bg="gray.700">
				<Post />
			</ScrollView>
		</VStack>
	);
}
