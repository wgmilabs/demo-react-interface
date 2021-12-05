import React from 'react';
import {Box, Text, useControllableState, useDisclosure} from "@chakra-ui/react";
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/AccountModal";
import Body from "./components/Body";
import {getContract} from "./eth";
import TokenPage from "./components/TokenPage";
import TokenVersionButton from "./components/buttons/TokenVersionButton";

export default function App() {
    const [value, setValue] = useControllableState<number>({ defaultValue: 0 })
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
                        <TokenVersionButton label="NFTs V1" onClick={() => setValue(0)} disabled={value === 0}/>
                        <TokenVersionButton label="NFTs V2" onClick={() => setValue(1)} disabled={value === 1}/>
                    </Text>
                </Box>
                <ConnectButton handleOpenModal={onOpen}/>
                <AccountModal isOpen={isOpen} onClose={onClose}/>
            </header>
            {value === 0 && <TokenPage contract={getContract(value)} />}
            {value === 1 && <TokenPage contract={getContract(value)} />}
        </Body>
    );
}
