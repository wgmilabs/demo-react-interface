import React from 'react';
import {Box} from "@chakra-ui/react";
import Layout from "./Layout";
import MintButton from "./MintButton";
import AuctionItem from "./AuctionItem";
import {useContractCall} from "@usedapp/core";
import {Contract} from "@ethersproject/contracts";


type Props = {
    contract: Contract;
};

export default function TokenPage({contract}: Props) {
    const tokenSupply = useTokenSupply();

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

    return (
        <Box>
            <Layout>
                <MintButton contract={contract}/>
            </Layout>
            <Layout>
                {tokenSupply && Array.from({length: tokenSupply.toNumber()}, (_, i) => i + 1).map(i => {
                    return <AuctionItem contract={contract} tokenId={i}/>
                })}
            </Layout>
        </Box>
    );
}
