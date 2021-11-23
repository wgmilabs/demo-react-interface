import React, {useEffect, useState} from 'react';
import {Box, Flex, Image, Link, useDisclosure} from "@chakra-ui/react";
import {contract, getExplorerUrl} from "../eth";
import {useContractCall, useEthers} from '@usedapp/core';
import BuyButton from "./BuyButton";
import SellButton from "./SellButton";
import {ExternalLinkIcon} from "@chakra-ui/icons";
import SellTokenModal from "./SellTokenModal";
import PlaceBidBox from "./PlaceBidBox";
import AcceptBidButton from "./AcceptBidButton";
import PlaceBidModal from "./PlaceBidModal";

type Props = {
    tokenId: number;
};

export default function AuctionItem({tokenId}: Props) {
    const sellModal = useDisclosure();
    const bidModal = useDisclosure();
    const {account, chainId} = useEthers();
    const [data, setData] = useState({name: "", description: "", image: ""});
    const tokenURI = useTokenURI();
    const tokenOwner = useTokenOwner();
    const isOwner = () => tokenOwner === account || false;

    useEffect(() => {
        if (tokenURI) {
            const getTokenMetadata = async () => {
                const result = await fetch(`${tokenURI}.json`);
                const resultData = await result.json();
                console.log(resultData);
                setData(resultData);
            };

            getTokenMetadata();
        }
    }, [tokenURI]);

    function useTokenURI() {
        const [uri] =
        useContractCall({
                abi: contract.interface,
                address: contract.address,
                method: 'tokenURI',
                args: [tokenId]
            }
        ) ?? [];
        return uri;
    }

    function useTokenOwner() {
        const [ownerOf] =
        useContractCall({
                abi: contract.interface,
                address: contract.address,
                method: 'ownerOf',
                args: [tokenId]
            }
        ) ?? [];
        return ownerOf;
    }

    return account ? (
        <Box mt="10" borderWidth="1px" borderRadius="lg" overflow="hidden" backgroundColor="white">
            <Flex flexDirection="row">
                <Image src={data.image} alt={data.name} maxW="sm"/>

                <Flex height="auto" flexDirection="column" justifyContent="space-between" p="5" minW="sm">
                    <Box>
                        <Box
                            mt="1"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated
                        >
                            {data.name}
                        </Box>
                        {data.description}<br/><br/>
                        {tokenOwner && <Box>
                            <b>owned by</b> <Link
                            href={chainId && `${getExplorerUrl(chainId)}${tokenOwner}`}>{
                            `${tokenOwner.slice(0, 6)}...${tokenOwner.slice(
                                tokenOwner.length - 4,
                                tokenOwner.length
                            )}`} <ExternalLinkIcon mr={1}/></Link>
                        </Box>}
                    </Box>
                    <Box>
                        <Box py="5">{isOwner() ? <AcceptBidButton tokenId={tokenId}/> :
                            <PlaceBidBox tokenId={tokenId} onClick={bidModal.onOpen}/>}</Box>
                        {isOwner() ? <SellButton onClick={sellModal.onOpen} isFullWidth/> :
                            <BuyButton tokenId={tokenId}/>}
                    </Box>
                </Flex>
            </Flex>
            <PlaceBidModal tokenId={tokenId} isOpen={bidModal.isOpen} onClose={bidModal.onClose}/>
            <SellTokenModal tokenId={tokenId} isOpen={sellModal.isOpen} onClose={sellModal.onClose}/>
        </Box>
    ) : null;
}
