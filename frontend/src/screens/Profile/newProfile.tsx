import { useState, useContext } from "react";
import {
	HStack,
	VStack,
	Text,
	useTheme,
	Heading,
	Image,
	Center,
} from "native-base";
import {
	ShoppingCart,
	ThumbsUp,
	ThumbsDown,
	GearSix,
	SignOut,
	Pencil,
} from "phosphor-react-native";
import { MenuTop } from "../../components/Menus/MenuTop";
import { ButtonForm } from "../../components/Buttons/ButtonForm";
import { AuthContext } from "../../contexts/UserContext";
import { TouchableOpacity } from "react-native";
export function Profile() {
	const { colors, fontSizes } = useTheme();
	// const [isLoading, setIsLoading] = useState(false);
	const { logout, userInfo }: any = ({} = useContext(AuthContext));

	function handleLogout() {
		logout();
	}
	return (
		<VStack flex={1} pb={6} bg="gray.700">
			<MenuTop search={false}></MenuTop>
			<VStack flex={1} alignItems="center" bg="gray.700" px={8} pt={15}>
				<Image
					size={150}
					borderRadius={100}
					source={{
						uri: `http://10.0.2.2:3000/files/users/${userInfo.image}`,
					}}
					alt="Logo"
				/>
				<Heading color="gray.100" fontSize="xl" mt={8} mb={10}>
					{userInfo.name}
				</Heading>
				<HStack space="10" alignItems="center" mb={12}>
					<VStack
						px={5}
						pt={0}
						alignItems="center"
						size="16"
						// bg="buttons.default"
						rounded="md"
						_text={{
							color: "white",
						}}
					>
						<Center
							size="10"
							rounded="md"
							_text={{
								color: "white",
							}}
						>
							<ThumbsUp color="white"></ThumbsUp>
						</Center>
						<Heading
							color="gray.100"
							fontSize="sm"
							mt={2}
							mb={2}
							fontWeight="bold"
						>
							{userInfo.precin.length}
						</Heading>
					</VStack>
					<VStack
						px={5}
						pt={0}
						alignItems="center"
						size="16"
						rounded="md"
						_text={{
							color: "white",
						}}
					>
						<Center
							size="10"
							rounded="md"
							_text={{
								color: "white",
							}}
						>
							<ThumbsDown color="white"></ThumbsDown>
						</Center>
						<Heading color="gray.100" fontSize="sm" mt={2} mb={2}>
							{userInfo.precao.length}
						</Heading>
					</VStack>
					<VStack
						px={5}
						pt={0}
						alignItems="center"
						size="16"
						rounded="md"
						_text={{
							color: "white",
						}}
					>
						<Center
							size="10"
							rounded="md"
							_text={{
								color: "white",
							}}
						>
							<ShoppingCart color="white"></ShoppingCart>
						</Center>
						<Heading color="gray.100" fontSize="sm" mt={2} mb={2}>
							{userInfo.listShoop.length}
						</Heading>
					</VStack>
				</HStack>
				<HStack
					space="6"
					alignItems="center"
					mb={6}
					rounded="sm"
					bg="buttons.default"
					w="full"
				>
					<TouchableOpacity onPress={handleLogout}>
						<VStack
							px={6}
							pt={4}
							alignItems="center"
							size="16"
							rounded="md"
							_text={{
								color: "white",
							}}
						>
							<Center
								size="10"
								rounded="md"
								_text={{
									color: "white",
								}}
								bg="yellow.600"
							>
								<Pencil color="white"></Pencil>
							</Center>
							<Heading color="gray.100" fontSize="sm" mt={2} mb={2}>
								Edit
							</Heading>
						</VStack>
					</TouchableOpacity>
					<TouchableOpacity>
						<VStack
							px={6}
							pt={4}
							alignItems="center"
							size="16"
							rounded="md"
							_text={{
								color: "white",
							}}
						>
							<Center
								size="10"
								rounded="md"
								_text={{
									color: "white",
								}}
								bg="gray.300"
							>
								<GearSix color="white"></GearSix>
							</Center>
							<Heading color="gray.100" fontSize="sm" mt={2} mb={2}>
								Settings
							</Heading>
						</VStack>
					</TouchableOpacity>
					<TouchableOpacity onPress={handleLogout}>
						<VStack
							alignItems="center"
							size="16"
							rounded="md"
							_text={{
								color: "white",
							}}
						>
							<Center
								size="10"
								rounded="md"
								_text={{
									color: "white",
								}}
								bg="blue.400"
							>
								<SignOut color="white"></SignOut>
							</Center>
							<Heading color="gray.100" fontSize="sm" mt={2} mb={2}>
								Logout
							</Heading>
						</VStack>
					</TouchableOpacity>
				</HStack>
				<ButtonForm
					mb={4}
					title="Delete account"
					w="full"
					onPress={handleLogout}
					bg="red.600"
					// isLoading={isLoading}
				/>
			</VStack>
		</VStack>
	);
}
