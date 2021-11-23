import {Button} from "@chakra-ui/react";
import {useContractCall, useContractFunction} from "@usedapp/core";
import {contract} from "../eth";

export default function MintButton() {
    const { send } = useContractFunction(contract, 'mint');
    const tokenSupply = useTokenSupply();
    const maxTokenSupply = useMaxTokenSupply();

    function mintToken() {
        send()
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
        >
            Mint New NFT ({maxTokenSupply.toNumber() - tokenSupply.toNumber()} left)
        </Button>
    );
}
