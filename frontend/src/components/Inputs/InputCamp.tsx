import { Input as NativeBaseInput, IInputProps } from "native-base";

export function InputCamp({ ...rest }: IInputProps) {
	return (
		<NativeBaseInput
			bg="gray.700"
			h={14}
			size="md"
			borderWidth={0}
			fontSize="md"
			fontFamily="body"
			color="white"
			placeholderTextColor="gray.300"
			_focus={{ borderWidth: 1, borderColor: "hover.default", bg: "gray.700" }}
			{...rest}
		/>
	);
}
