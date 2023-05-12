import { Input as NativeBaseInput, IInputProps } from "native-base";

export function InputSearch({ ...rest }: IInputProps) {
	return (
		<NativeBaseInput
			bg="gray.600"
			h={10}
			w={235}
			size="md"
			borderWidth={0}
			borderRadius={100}
			fontSize="md"
			fontFamily="body"
			color="white"
			placeholderTextColor="gray.300"
			_focus={{ borderWidth: 1, borderColor: "hover.default", bg: "gray.700" }}
			{...rest}
		/>
	);
}
