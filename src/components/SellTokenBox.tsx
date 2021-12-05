import {Box, Flex, Text} from "@chakra-ui/react";
import {useContractCall, useContractFunction} from "@usedapp/core";
import {formatEther} from "@ethersproject/units";
import WithdrawButton from "./WithdrawButton";
import SecondaryButton from "./buttons/SecondaryButton";
import {Contract} from "@ethersproject/contracts";

type Props = {
    contract: Contract;
    tokenId: number;
    onClick: any;
};

export default function SellTokenBox({contract, tokenId, onClick}: Props) {
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
                    <SecondaryButton onClick={onClick} label="List for sale"/>
                </Box>
                {offer && offer.isForSale && <Box flexGrow="1">
                    <WithdrawButton onClick={tokenNoLongerForSale}/>
                </Box>}
            </Flex>
        </Box>
    );
}
