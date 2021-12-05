import {Box, Flex, Text} from "@chakra-ui/react";
import {useContractCall, useContractFunction, useEthers} from "@usedapp/core";
import {formatEther} from "@ethersproject/units";
import WithdrawButton from "./WithdrawButton";
import SecondaryButton from "./buttons/SecondaryButton";
import {Contract} from "@ethersproject/contracts";

type Props = {
    contract: Contract;
    tokenId: number;
    onClick: any;
};

export default function PlaceBidBox({contract, tokenId, onClick}: Props) {
    const bid = useBidds();
    const {account} = useEthers();

    const {send} = useContractFunction(contract, 'withdrawTokenBid');

    function withdrawTokenBid() {
        send(tokenId);
    }

    function useBidds() {
        const [hasBid, trxId, bidder, minValue] =
        useContractCall({
                abi: contract.interface,
                address: contract.address,
                method: 'bids',
                args: [tokenId]
            }
        ) ?? [];
        return {trxId, hasBid, bidder, minValue};
    }

    return (
        <Box>
            {bid && bid.hasBid && bid.minValue &&
            <Text mt="2">Highest Bid: {parseFloat(formatEther(bid.minValue)).toFixed(3)} ETH</Text>}

            <Flex mt="2">
                <Box flexGrow="4">
                    <SecondaryButton onClick={onClick} label="Place Bid"/>
                </Box>
                {bid && bid.hasBid && bid.minValue && bid.bidder === account && <Box flexGrow="1">
                    <WithdrawButton onClick={withdrawTokenBid}/>
                </Box>}
            </Flex>
        </Box>
    );
}
