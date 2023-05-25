import { HStack, IconButton, Image, useTheme, Icon, Box } from "native-base";
import { User, MagnifyingGlass } from "phosphor-react-native";
import { InputSearch } from "../Inputs/InputSearch";

export function MenuTop(props) {
	const { colors } = useTheme();
	return (
		<HStack
			w="full"
			justifyContent={props.search ? "space-around" : "space-between"}
			alignItems="center"
			borderColor="#ffff"
			bg="gray.700"
			pt={12}
			pb={5}
			px={6}
		>
			<Box>
				<Image
					size={27}
					borderRadius={100}
					source={require("../../../assets/logo.png")}
					alt="Logo"
				/>
			</Box>
			{props.search ? (
				<Box>
					<InputSearch
						placeholder="Busque por precinhos"
						// InputRightElement={
						// 	<Icon as={<MagnifyingGlass color={colors.gray[300]} />} mr={3} />
						// }
					/>
				</Box>
			) : (
				<></>
			)}
			<Box>
				<IconButton icon={<User size={26} color={colors.white} />} />
			</Box>
		</HStack>
	);
}
