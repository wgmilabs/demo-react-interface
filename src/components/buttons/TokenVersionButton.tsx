import {Button} from "@chakra-ui/react";

type Props = {
    onClick?: any;
    label: string;
    disabled?: boolean;
};

export default function TokenVersionButton({onClick, label, disabled = false}: Props) {
    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            bg="orange.300"
            color="orange.800"
            fontSize="lg"
            fontWeight="medium"
            borderRadius="xl"
            ml="5"
            border="1px solid transparent"
            _hover={{
                borderColor: "orange.300",
                color: "orange.700"
            }}
            _active={{
                backgroundColor: "orange.700",
                borderColor: "orange.800"
            }}
        >
            {label}
        </Button>
    );
}
