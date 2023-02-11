import { Box, HStack, Grid, Text, Button } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import AddToken from './AddToken'
import Token from "./Token";
export default function NetworkTab({network, networkSettings, setStore, defaultTokens}: any) {
    
    const [defTokens, setDefTokens] = useState<any[]>([]);
    const [customTokens, setCustomTokens] = useState<any[]>([]);

    const defaultToken = {
        address: '0x0000000000000000000000000000000000000000',
        symbol: network.symbol,
        decimals: network.decimals,
        mockValue: networkSettings['mockValue'] || ''
    }

    const addToken = useCallback((token: any) => {
        setStore( (prev: any) => {
            
            if(!network?.chainId) return prev;
                
            const newNetworkSettings = {...prev.chains?.[network.chainId]} || {};
            
            
            if(!newNetworkSettings.tokens) {
                newNetworkSettings['tokens'] = [];
            }
            newNetworkSettings.tokens.push(token);
            return {
                ...prev, 
                chains: {
                    ...prev.chains,
                    [network.chainId]: newNetworkSettings
                }
            };
        })
    }, [network, setStore]);

    
    const defaultCurrencyToggle = useCallback(() => {
        
        setStore( (prev: any) => {
            
            return {
                ...prev, 
                chains: {
                    ...prev.chains,
                    [network.chainId]: {...networkSettings, disableDefaultCurrency: !networkSettings.disableDefaultCurrency}
                }
            };
        })

    }, [network, networkSettings, setStore]);

    const toggleDefaultToken = useCallback((token: any) => {

        setStore( (prev: any) => {
            const newNetworkSettings = {...prev.chains?.[network.chainId]} || {};
            const tokens = newNetworkSettings.tokens || [];
            return {
                ...prev,
                chains: {
                    ...prev.chains,
                    [network.chainId]: {...newNetworkSettings, tokens: [
                        ...(
                            // if token is previously disabled, then add it to the networkSettings.tokens else remove it
                            token.disabled ? [...tokens, {
                                address: token.address,
                                symbol: token.symbol,
                                decimals: token.decimals
                            }] : tokens.filter((t: any) => t.address !== token.address)
                        )
                    ]}
                }
            };
        })

    }, [network, setStore]);

    useEffect(() => {
        
        const tokens = defaultTokens.map((token: any) => {
            // if token is found in the networkSettings.tokens
            let disabled = networkSettings.tokens?.find((t: any) => t.address === token.address) ? false : true;
            return {
                ...token,
                disabled
            }
        });

        // and the tokens of networkSettings.tokens that are not in the defaultTokens, add them to the customTokens
        const customTokens = networkSettings.tokens?.filter((token: any) => {
            return !defaultTokens.find((t: any) => t.address === token.address);
        }) || [];

        setDefTokens(tokens);
        setCustomTokens(customTokens);

    }, [networkSettings.tokens, defaultTokens])


    return (
        <Box as='form' maxW='full'>
            <HStack justify='space-between' w='full'>
                <Text fontSize='sm' fontWeight='bold'>The below tokens are enabled for payment on {network.name} chain.</Text>
                <AddToken 
                        network={network}
                        addToken = {addToken}
                        />
            </HStack>
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                <Box opacity={networkSettings.disableDefaultCurrency ? '0.5' : '1'}>
                    <Token token={defaultToken} network={network} setStore={setStore} isDefaultToken={true}>
                        <Button size='sm' onClick={defaultCurrencyToggle}>{ networkSettings.disableDefaultCurrency ? 'Enable' : 'Disable' }</Button>
                    </Token>
                </Box>
                {defTokens?.map((token: any, index: number) => (
                    <Box key={index} opacity={token.disabled ? '0.5' : '1'}>
                        <Token index={index} token={token} network={network} setStore={setStore} isDefaultToken={true}>
                            <Button size='sm' onClick={() => {
                                toggleDefaultToken(token);
                            }}>{ token.disabled ? 'Enable' : 'Disable' }</Button>
                        </Token>
                        
                    </Box>
                ))}
            </Grid>
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                {customTokens?.map((token: any, index: number) => (
                    <Token key={index} index={index} token={token} network={network} setStore={setStore}  />
                ))}
            </Grid>
        </Box>
    )
}