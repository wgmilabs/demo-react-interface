import {Button} from "@chakra-ui/react";
import {useContractCall, useContractFunction} from "@usedapp/core";
import {contract} from "../eth";
import {formatEther} from "@ethersproject/units";

type Props = {
    tokenId: number;
};

export default function AcceptBidButton({tokenId}: Props) {
    const { send } = useContractFunction(contract, 'acceptTokenBid');
    const bid = useBidds();

    function acceptTokenBid() {
        send(tokenId, bid.minValue)
    }

    function useBidds() {
        const [hasBid, tid, bidder, minValue] =
        useContractCall({
                abi: contract.interface,
                address: contract.address,
                method: 'bids',
                args: [tokenId]
            }
        ) ?? [];
        return { hasBid, minValue };
    }

    return bid && bid.hasBid && bid.minValue ? (
        <Button
            onClick={acceptTokenBid}
            bg="blue.800"
            color="blue.300"
            fontSize="lg"
            fontWeight="medium"
            borderRadius="xl"
            border="1px solid transparent"
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
            Sell for {parseFloat(formatEther(bid.minValue)).toFixed(3)} ETH
        </Button>
    ) : null;
}
