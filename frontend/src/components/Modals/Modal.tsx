import React from "react";
import { Modal, Box, Text, Button, Image } from "native-base";

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	selectedMarket: string;
	selectedAddress: string;
};

const CustomModal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	selectedMarket,
	selectedAddress,
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<Box bg="white" p={4} rounded="md">
				<Text fontWeight="bold" mb={2} textAlign="center">
					Localização
				</Text>
				<Text>{selectedMarket}</Text>
				<Text>{selectedAddress}</Text>
				<Image
					source={require("../../../assets/zaffari_modal.jpg")}
					alt="Imagem modal"
					width={250}
					height={200}
					mt={2}
					overflow="hidden"
				/>
				<Button onPress={onClose} mt={4} colorScheme="blue">
					Fechar
				</Button>
			</Box>
		</Modal>
	);
};

export default CustomModal;
