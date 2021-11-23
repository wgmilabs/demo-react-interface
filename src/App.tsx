import React from 'react';
import {Box, Text, useDisclosure} from "@chakra-ui/react";
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/AccountModal";
import Body from "./components/Body";
import Layout from "./components/Layout";
import MintButton from "./components/MintButton";
import AuctionItem from "./components/AuctionItem";

export default function App() {
    const {isOpen, onOpen, onClose} = useDisclosure();
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
                <AuctionItem tokenId={1} />
            </Layout>
        </Body>
    );
}
