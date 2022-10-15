import { Box, Button, FormControl, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, VStack } from "@chakra-ui/react";

import {  useCallback, useState } from "react";

import TokenForm from "./TokenForm";

export default function AddToken({addToken, network}: any): JSX.Element {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [token, setToken] = useState<any>({});
    
    const addTokenHandler = useCallback(() => {
        // if token's address, symbol and decimals are not empty
        if(token.address && token.symbol && token.decimals) {
            addToken(token);
            setToken({});
            onClose();
        }

    }, [token]);
    return (
        <>
        <Button onClick={onOpen}>
            Add Token
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add a Token</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <TokenForm token={token} setToken={setToken} network={network} />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={addTokenHandler}>
                        Add Token
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal></>
    )
}