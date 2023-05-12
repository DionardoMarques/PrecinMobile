import { Button as ButtonNativeBase, IButtonProps, Heading } from "native-base";

type Props = IButtonProps & {
	title: string;
};

export function ButtonForm({ title, ...rest }: Props) {
	return (
		<ButtonNativeBase
			bg="buttons.default"
			h={14}
			fontSize="sm"
			rounded="sm"
			_pressed={{ bg: "buttons.hover" }}
			{...rest}
		>
			<Heading color="white" fontSize="sm">
				{title}
			</Heading>
		</ButtonNativeBase>
	);
}
