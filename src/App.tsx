import React from 'react';
import {Box, Text, useDisclosure} from "@chakra-ui/react";
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/AccountModal";
import Body from "./components/Body";
import Layout from "./components/Layout";
import MintButton from "./components/MintButton";
import AuctionItem from "./components/AuctionItem";
import {useContractCall} from "@usedapp/core";
import {contract} from "./eth";

export default function App() {
    const {isOpen, onOpen, onClose} = useDisclosure();

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
        <Body>
            <header style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 20
            }}>
                <Box px="3">
                    <Text color="white" fontSize="md">
                        WGMI
                    </Text>
                </Box>
                <ConnectButton handleOpenModal={onOpen}/>
                <AccountModal isOpen={isOpen} onClose={onClose}/>
            </header>
            <Layout>
                <MintButton />
            </Layout>
            <Layout>
                { tokenSupply && Array.from({length: tokenSupply.toNumber()}, (_, i) => i + 1).map(i => {
                    return <AuctionItem tokenId={i} />
                })}
            </Layout>
        </Body>
    );
}
