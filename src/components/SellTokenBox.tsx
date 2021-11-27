import {Box, Flex, Text} from "@chakra-ui/react";
import {useContractCall, useContractFunction} from "@usedapp/core";
import {contract} from "../eth";
import {formatEther} from "@ethersproject/units";
import SellTokenButton from "./SellTokenButton";
import WithdrawButton from "./WithdrawButton";

type Props = {
    tokenId: number;
    onClick: any;
};

export default function SellTokenBox({tokenId, onClick}: Props) {
    const offer = useBuyOffers();
    const {send} = useContractFunction(contract, 'tokenNoLongerForSale');

    function tokenNoLongerForSale() {
        send(tokenId)
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
        return {trxId, isForSale, owner, minValue};
    }

    return (
        <Box>
            {offer && offer.isForSale && offer.minValue &&
            <Text mt="2">Offered for {parseFloat(formatEther(offer.minValue)).toFixed(3)} ETH</Text>}
            <Flex mt="2">
                <Box flexGrow="4">
                    <SellTokenButton onClick={onClick}/>
                </Box>
                {offer && offer.isForSale && <Box flexGrow="1">
                    <WithdrawButton onClick={tokenNoLongerForSale}/>
                </Box>}
            </Flex>
        </Box>
    );
}
