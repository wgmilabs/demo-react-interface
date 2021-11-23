import {Box, Text} from "@chakra-ui/react";
import PlaceBidButton from "./PlaceBidButton";
import {useContractCall} from "@usedapp/core";
import {contract} from "../eth";
import {formatEther} from "@ethersproject/units";

type Props = {
    tokenId: number;
    onClick: any;
};

export default function PlaceBidBox({tokenId, onClick}: Props) {
    const bid = useBidds();

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

    return (
        <Box>
            {bid && bid.hasBid && bid.minValue && <Text>Highest Bid: {parseFloat(formatEther(bid.minValue)).toFixed(3)} ETH</Text>}
            <PlaceBidButton onClick={onClick} isFullWidth/>
        </Box>
    );
}
