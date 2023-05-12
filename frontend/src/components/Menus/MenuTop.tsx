import { HStack, IconButton, Image, useTheme, Icon, Box } from "native-base";
import { User, MagnifyingGlass } from "phosphor-react-native";
import { InputSearch } from "../Inputs/InputSearch";

export function MenuTop() {
	const { colors } = useTheme();
	return (
		<HStack
			w="full"
			justifyContent="space-around"
			alignItems="center"
			bg="gray.700"
			pt={12}
			pb={5}
			px={2}
		>
			<Box>
				<Image
					size={27}
					borderRadius={100}
					source={require("../../../assets/logo.png")}
				/>
			</Box>
			<Box>
				<InputSearch
					placeholder="Busque por precinhos"
					// InputRightElement={
					// 	<Icon as={<MagnifyingGlass color={colors.gray[300]} />} mr={3} />
					// }
				/>
			</Box>
			<Box>
				<IconButton icon={<User size={26} color={colors.white} />} />
			</Box>
		</HStack>
	);
}
