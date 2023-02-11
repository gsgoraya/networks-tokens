import { VStack, Avatar, Text, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, HStack } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import TokenForm from "./TokenForm";

export default function Token ({token, index, network, setStore, isDefaultToken, children}: any) : JSX.Element {
    
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [editableToken, setEditableToken] = useState<any>(token);

    const saveToken = useCallback(() => {
        
        onClose();
        
        if(!network?.chainId) return;

        if( isDefaultToken ) {
            if( network.isTestnet ) {
                console.log(editableToken);
                setStore( (prev: any) => {
                    return {
                        ...prev,
                        chains: {
                            ...prev.chains,
                            [network.chainId]: {
                                ...prev.chains[network.chainId],
                                mockValue: editableToken.mockValue,
                            }
                        }
                    }
                })
            }

        } else {
            
            setStore((prev : any) => {
                return {
                    ...prev,
                    chains: {
                        ...prev.chains,
                        [network.chainId]: {
                            ...prev.chains[network.chainId],
                            tokens: [
                                ...(prev.chains[network.chainId].tokens.slice(0, index)),
                                editableToken,
                                ...(prev.chains[network.chainId].tokens.slice(index + 1))
                            ]
                        }
                    }
                }
            })
        }

        
    }, [index, network?.chainId, setStore, editableToken, isDefaultToken]);

    const openForEditing = useCallback(() => {
        setEditableToken(token);
        onOpen();
    }, [token])
    
    return (
        <VStack>
            <Avatar></Avatar>
            <Text>{token.symbol}</Text>
            <HStack>
                {children}
                <Button onClick={openForEditing} size='sm'>Edit</Button>
            </HStack>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Token</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <TokenForm token={editableToken} setToken={setEditableToken} network={network} isDefaultToken={isDefaultToken} />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={saveToken}>
                            { 
                                (!isDefaultToken || network.isTestnet) ? 'Save Token' : 'Close'
                            }
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </VStack>
    )
}