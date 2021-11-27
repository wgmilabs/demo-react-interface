import {
    Box,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import {useContractFunction} from "@usedapp/core";
import {ChangeEvent, useState} from "react";
import SellTokenButton from "./SellTokenButton";
import {contract} from "../eth";
import {utils} from "ethers";

type Props = {
    tokenId: number;
    isOpen: any;
    onClose: any;
};

export default function SellTokenModal({tokenId, isOpen, onClose}: Props) {
    const {send} = useContractFunction(contract, 'offerTokenForSale');
    const [value, setValue] = useState("");

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }

    function sellToken() {
        send(tokenId, utils.parseEther(value));
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
            <ModalOverlay/>
            <ModalContent
                background="gray.900"
                border="1px"
                borderStyle="solid"
                borderColor="gray.700"
                borderRadius="3xl"
            >
                <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
                    List Token for sale
                </ModalHeader>
                <ModalCloseButton
                    color="white"
                    fontSize="sm"
                    _hover={{
                        color: "whiteAlpha.700",
                    }}
                />
                <ModalBody pt={0}>
                    <Box pt={4} pb={2} mb={3}>
                        <InputGroup>
                            <InputLeftElement color="orange.200">ETH</InputLeftElement>
                            <Input value={value} onChange={handleChange} color="white" type="number"/>
                        </InputGroup>
                    </Box>
                </ModalBody>

                <ModalFooter
                    borderBottomLeftRadius="3xl"
                    borderBottomRightRadius="3xl"
                    p={6}
                >
                    <SellTokenButton onClick={sellToken}/>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
