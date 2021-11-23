import {Button} from "@chakra-ui/react";

type Props = {
    onClick: any;
    isFullWidth?: boolean | undefined;
};

export default function PlaceBidButton({onClick, isFullWidth}: Props) {

    return (
        <Button
            onClick={onClick}
            bg="orange.300"
            color="orange.800"
            fontSize="lg"
            fontWeight="medium"
            borderRadius="xl"
            border="1px solid transparent"
            _hover={{
                borderColor: "orange.300",
                color: "orange.700",
            }}
            _active={{
                backgroundColor: "orange.700",
                borderColor: "orange.800",
            }}
            isFullWidth
        >
            Place Bid
        </Button>
    );
}
