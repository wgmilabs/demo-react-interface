import {useContractCall, useContractFunction} from "@usedapp/core";
import {formatEther} from "@ethersproject/units";
import {Contract} from "@ethersproject/contracts";
import PrimaryButton from "./buttons/PrimaryButton";

type Props = {
    contract: Contract;
    tokenId: number;
};

export default function BuyButton({contract, tokenId}: Props) {
    const {send} = useContractFunction(contract, 'buyToken');
    const offer = useBuyOffers();

    function buyToken() {
        send(tokenId, {value: offer.minValue});
    }

    function useBuyOffers() {
        const [isForSale, trxId, owner, minValue] =
        useContractCall({
                abi: contract.interface,
                address: contract.address,
                method: 'offers',
                args: [tokenId]
            }
        ) ?? [];
        return {trxId, isForSale, owner, minValue};
    }

    return offer && offer.isForSale && offer.minValue ? (
        <PrimaryButton
            onClick={buyToken}
            label={`Buy for ${parseFloat(formatEther(offer.minValue)).toFixed(3)} ETH`}/>
    ) : null;
}
