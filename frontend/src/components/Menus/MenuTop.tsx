import { useContext, useState, useEffect } from "react";
import { HStack, IconButton, Image, useTheme, Icon, Box } from "native-base";
import { User, MagnifyingGlass } from "phosphor-react-native";
import { InputSearch } from "../Inputs/InputSearch";

import { AuthContext } from "../../contexts/UserContext";

export function MenuTop(props) {
	const { colors } = useTheme();
	const { checkUser, userInfo }: any = ({} = useContext(AuthContext));

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
			{/* "http://10.0.2.2:3000/files/users/1683569104173.png" */}
			<Box>
				{userInfo ? (
					userInfo.image ? (
						<Image
							size={27}
							borderRadius={100}
							source={{
								uri: "http://10.0.2.2:3000/files/users/1685200512336.png",
							}}
							alt="Alternate Text"
						/>
					) : (
						<IconButton icon={<User size={26} color={colors.white} />} />
					)
				) : (
					<IconButton icon={<User size={26} color={colors.white} />} />
				)}
			</Box>
		</HStack>
	);
}
