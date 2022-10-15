import { Box, Button, FormControl, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, VStack } from "@chakra-ui/react";
import { ethers } from "ethers";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { erc20abi } from "./constants";

export default function TokenForm({token, setToken, network, isDefaultToken}: any): JSX.Element {

    const [working, setWorking] = useState<boolean>(false);
    
    
    const handleAddressUpdate = useCallback(async (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        const address = target.value;

        setToken( (prev) => ({...prev, address}));

        if (address.length === 42 && ethers.utils.isAddress(address)) {
            setWorking(true);

            const provider = new ethers.providers.JsonRpcProvider(network.rpcUrl)
            const contract = new ethers.Contract(address, erc20abi, provider);

            const [decimals, symbol] = await Promise.all([contract.decimals(), contract.symbol()]);
            setToken( (prev) => ({...prev, decimals: parseInt(decimals), symbol}));
            setWorking(false);
        }
    }, []);

    
    return (
        <VStack as='form' gap='4'>
            <FormControl>
                <FormLabel>Token Contract Address</FormLabel>
                <Input type="text" 
                    isDisabled={isDefaultToken}
                    value={token['address'] || ''}
                    onInput={handleAddressUpdate} />
                <FormHelperText>Enter the contract address of the token you want to add</FormHelperText>
            </FormControl>
            { working && <Spinner /> }
            <FormControl>
                <FormLabel>Token Symbol</FormLabel>
                <Input type="text"
                    isDisabled={isDefaultToken}
                    value={token['symbol'] || ''}
                    onInput={(e) => setToken( (prev) => ({...prev, symbol: e.target['value']}))} />
            </FormControl>
            <FormControl>
                <FormLabel>Token Decimals</FormLabel>
                <Input type="number"
                    isDisabled={isDefaultToken}
                    value={token['decimals'] || ''}
                    onInput={(e) => setToken( (prev) => ({...prev, decimals: parseInt(e.target['value'])}))} />
            </FormControl>

            { network.isTestnet && <FormControl>
                <FormLabel>Mock Token Value</FormLabel>
                <FormHelperText>Since, this is token is of a test network. You need to provide your own price as the value of this token</FormHelperText>
                <Input type="number"
                    value={token['mockValue'] || ''}
                    onInput={(e) => setToken( (prev) => ({...prev, mockValue: e.target['value']}))} />
            </FormControl> }
            
        </VStack>     
    )
}