import {Button} from "@chakra-ui/react";
import {useContractCall, useContractFunction} from "@usedapp/core";
import {contract} from "../eth";

export default function MintButton() {
    const {send} = useContractFunction(contract, 'mint');
    const tokenSupply = useTokenSupply();
    const maxTokenSupply = useMaxTokenSupply();

    function mintToken() {
        send();
    }

    function useTokenSupply() {
        const [totalSupply] =
        useContractCall({
                abi: contract.interface,
                address: contract.address,
                method: 'totalSupply',
                args: []
            }
        ) ?? [];
        return totalSupply;
    }

    function useMaxTokenSupply() {
        const [totalSupply] =
        useContractCall({
                abi: contract.interface,
                address: contract.address,
                method: 'maxSupply',
                args: []
            }
        ) ?? [];
        return totalSupply;
    }

    return tokenSupply === maxTokenSupply ? null : (
        <Button
            onClick={mintToken}
            bgGradient="linear(to-r, teal.300, blue.400)"
            color="gray.800"
            fontSize="lg"
            fontWeight="medium"
            borderRadius="xl"
            _hover={{
                color: "gray.700",
            }}
        >
            Mint New NFT ({maxTokenSupply.toNumber() - tokenSupply.toNumber()} left)
        </Button>
    );
}
