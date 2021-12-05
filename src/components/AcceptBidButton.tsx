import {useContractCall, useContractFunction} from "@usedapp/core";
import {formatEther} from "@ethersproject/units";
import {Contract} from "@ethersproject/contracts";
import PrimaryButton from "./buttons/PrimaryButton";

type Props = {
    contract: Contract;
    tokenId: number;
};

export default function AcceptBidButton({contract, tokenId}: Props) {
    const {send} = useContractFunction(contract, 'acceptTokenBid');
    const bid = useBidds();

    function acceptTokenBid() {
        send(tokenId, bid.minValue)
    }

    function useBidds() {
        const [hasBid, trxId, bidder, minValue] =
        useContractCall({
                abi: contract.interface,
                address: contract.address,
                method: 'bids',
                args: [tokenId]
            }
        ) ?? [];
        return {trxId, hasBid, bidder, minValue};
    }

    return bid && bid.hasBid && bid.minValue ? (
        <PrimaryButton
            onClick={acceptTokenBid}
            label={`Sell for ${parseFloat(formatEther(bid.minValue)).toFixed(3)} ETH`}/>
    ) : null;
}
