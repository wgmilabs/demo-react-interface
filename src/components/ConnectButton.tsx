import {Box, Button, Text} from "@chakra-ui/react";
import {CHAIN_NAMES, ChainId, useEtherBalance, useEthers} from "@usedapp/core";
import {formatEther} from "@ethersproject/units";
import Identicon from "./Identicon";
import PrimaryButton from "./buttons/PrimaryButton";

type Props = {
    handleOpenModal: any;
};

export default function ConnectButton({handleOpenModal}: Props) {
    const {activateBrowserWallet, account, chainId} = useEthers();
    const etherBalance = useEtherBalance(account);

    function handleConnectWallet() {
        activateBrowserWallet();
    }

    return account ? (
        <Box display="flex">
            {
                chainId !== ChainId.Mainnet && <Box
                    display="flex"
                    alignItems="center"
                    background="orange.300"
                    borderRadius="xl"
                    py="0"
                    mx="3"
                >
                    <Box px="3">
                        <Text color="white" fontSize="md">
                            {/* @ts-ignore */}
                            {CHAIN_NAMES[chainId]}
                        </Text>
                    </Box>
                </Box>
            }

            <Box
                display="flex"
                alignItems="center"
                background="gray.700"
                borderRadius="xl"
                py="0"
            >
                <Box px="3">
                    <Text color="white" fontSize="md">
                        {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH
                    </Text>
                </Box>
                <Button
                    onClick={handleOpenModal}
                    bg="gray.800"
                    border="1px solid transparent"
                    _hover={{
                        border: "1px",
                        borderStyle: "solid",
                        borderColor: "blue.400",
                        backgroundColor: "gray.700",
                    }}
                    borderRadius="xl"
                    m="1px"
                    px={3}
                    height="38px"
                >
                    <Text color="white" fontSize="md" fontWeight="medium" mr="2">
                        {account &&
                            `${account.slice(0, 6)}...${account.slice(
                                account.length - 4,
                                account.length
                            )}`}
                    </Text>
                    <Identicon/>
                </Button>
            </Box>
        </Box>
    ) : <PrimaryButton onClick={handleConnectWallet} label="Connect to a wallet" isFullWidth={false}/>;
}
