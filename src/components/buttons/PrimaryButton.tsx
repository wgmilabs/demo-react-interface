import {Button} from "@chakra-ui/react";

type Props = {
    onClick: any;
    label: string;
    isFullWidth?: boolean;
};

export default function PrimaryButton({onClick, label, isFullWidth = true}: Props) {
    return (
        <Button
            onClick={onClick}
            bg="blue.800"
            color="blue.300"
            fontSize="lg"
            fontWeight="medium"
            borderRadius="xl"
            border="1px solid transparent"
            mt="2"
            _hover={{
                borderColor: "blue.700",
                color: "blue.400",
            }}
            _active={{
                backgroundColor: "blue.800",
                borderColor: "blue.700",
            }}
            isFullWidth={isFullWidth}
        >
            {label}
        </Button>
    );
}
