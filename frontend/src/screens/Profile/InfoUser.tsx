import { useState, useContext } from "react";
import { HStack, VStack, useTheme, Heading, Image } from "native-base";
import {
	ShoppingCart,
	ThumbsUp,
	ThumbsDown,
	GearSix,
	SignOut,
	Pencil,
	WarningCircle,
} from "phosphor-react-native";
import { AuthContext } from "../../contexts/UserContext";
import { TouchableOpacity } from "react-native";
export function InfoUser(props) {
	const { colors, fontSizes } = useTheme();
	// const [isLoading, setIsLoading] = useState(false);
	const { logout, userInfo }: any = ({} = useContext(AuthContext));

	function handleLogout() {
		logout();
	}
	return (
		<VStack flex={1} alignItems="center" bg="gray.700" px={8} pt={14}>
			<Image
				size={150}
				borderRadius={100}
				source={{
					uri: `http://10.0.2.2:3000/files/users/${userInfo.image}`,
				}}
				alt="Logo"
			/>
			<Heading color="white" fontSize="xl" mt={4} mb={5} fontWeight="bold">
				{userInfo.name}
			</Heading>
			<HStack space="14" alignItems="center" mb={7}>
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
					<Heading color="white" fontSize="sm" mt={2} mb={2} fontWeight="bold">
						{userInfo.precin.length}
					</Heading>
					{/* <ThumbsUp color="#7C7C8A"></ThumbsUp> */}
					<Heading
						color="gray.200"
						fontSize="sm"
						mt={2}
						mb={2}
						fontWeight="bold"
					>
						Precin
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
					<Heading color="white" fontSize="sm" mt={2} mb={2}>
						{userInfo.precao.length}
					</Heading>
					{/* <ThumbsDown color="#7C7C8A"></ThumbsDown> */}
					<Heading color="gray.200" fontSize="sm" mt={2} mb={2}>
						Precao
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
					<Heading color="white" fontSize="sm" mt={2} mb={2}>
						{userInfo.listShoop.length}
					</Heading>
					{/* <ShoppingCart color="#7C7C8A"></ShoppingCart> */}
					<Heading color="gray.200" fontSize="sm" mt={2} mb={2}>
						Posts
					</Heading>
				</VStack>
			</HStack>
			<HStack space="8" alignItems="center" mb={5}>
				<TouchableOpacity onPress={props.handleLayout}>
					<HStack
						px={8}
						pt={0}
						alignItems="center"
						size="16"
						rounded="md"
						_text={{
							color: "white",
						}}
						bg="buttons.default"
						mb="2"
					>
						<Pencil color="white"></Pencil>

						<Heading color="white" fontSize="sm" mr={2} ml={2} mt={3} mb={3}>
							Edit
						</Heading>
					</HStack>
				</TouchableOpacity>
				<TouchableOpacity>
					<HStack
						px={8}
						pt={0}
						alignItems="center"
						size="16"
						rounded="md"
						_text={{
							color: "white",
						}}
						bg="gray.300"
						mb="2"
					>
						<GearSix color="white"></GearSix>

						<Heading color="white" fontSize="sm" mr={2} ml={2} mt={3} mb={3}>
							Settings
						</Heading>
					</HStack>
				</TouchableOpacity>
			</HStack>
			<HStack space="8" alignItems="center" mb={5}>
				<Heading color="white" fontSize="sm" mr={2} ml={2} mt={3} mb={20}>
					Carousel...
				</Heading>
			</HStack>
			<TouchableOpacity onPress={handleLogout}>
				<HStack
					px={20}
					pt={0}
					alignItems="center"
					rounded="md"
					_text={{
						color: "white",
					}}
					bg="buttons.hover"
					mb="4"
					w="full"
				>
					<SignOut color="white"></SignOut>

					<Heading color="white" fontSize="sm" mr={2} ml={2} mt={3} mb={3}>
						Logout Account
					</Heading>
				</HStack>
			</TouchableOpacity>
			<TouchableOpacity>
				<HStack
					px={20}
					pt={0}
					alignItems="center"
					rounded="md"
					_text={{
						color: "white",
					}}
					bg="red.400"
					mb="2"
					w="full"
				>
					<WarningCircle color="white"></WarningCircle>

					<Heading color="white" fontSize="sm" mr={3} ml={2} mt={3} mb={3}>
						Delete Account
					</Heading>
				</HStack>
			</TouchableOpacity>
		</VStack>
	);
}
