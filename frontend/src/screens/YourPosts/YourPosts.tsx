import { VStack, Text, useTheme, Heading } from "native-base";
import { MenuTop } from "../../components/Menus/MenuTop";
import { useState } from "react";
import { EditPost } from "./EditPost/EditPost";
export function YourPosts() {
	const { colors } = useTheme();
	const [controllerEdit, setControllerEdit] = useState(false);
	return (
		<VStack flex={1} pb={6} bg="gray.700">
			<MenuTop search={false}></MenuTop>
			{!controllerEdit ? <EditPost /> : <></>}
		</VStack>
	);
}
