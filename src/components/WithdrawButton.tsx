import {Button} from "@chakra-ui/react";
import {CloseIcon} from "@chakra-ui/icons";

type Props = {
    onClick: any;
};

export default function WithdrawButton({onClick}: Props) {
    return (
        <Button
            onClick={onClick}
            bg="gray.700"
            color="gray.200"
            fontSize="lg"
            fontWeight="medium"
            borderRadius="xl"
            border="1px solid transparent"
            ml="2"
            _hover={{
                borderColor: "gray.600",
                color: "gray.300",
            }}
            _active={{
                backgroundColor: "gray.700",
                borderColor: "gray.600",
            }}
            isFullWidth
        >
            <CloseIcon/>
        </Button>
    );
}
