import {Button} from "@chakra-ui/react";
import {useContractCall, useContractFunction} from "@usedapp/core";
import {contract} from "../eth";
import {formatEther} from "@ethersproject/units";

type Props = {
    tokenId: number;
};

export default function BuyButton({tokenId}: Props) {
    const { send } = useContractFunction(contract, 'buyToken');
    const offer = useBuyOffers();

    function buyToken() {
        send(tokenId, {value: offer.minValue});
    }

    function useBuyOffers() {
        const [isForSale, trxId, owner, minValue] =
        useContractCall({
                abi: contract.interface,
                address: contract.address,
                method: 'offers',
                args: [tokenId]
            }
        ) ?? [];
        return { trxId, isForSale, owner, minValue };
    }

    return offer && offer.isForSale && offer.minValue ? (
        <Button
            onClick={buyToken}
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
            isFullWidth
        >
            Buy for {parseFloat(formatEther(offer.minValue)).toFixed(3)} ETH
        </Button>
    ) : null;
}
