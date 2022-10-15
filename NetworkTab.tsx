import { Box, Container, FormControl, FormHelperText, FormLabel, Grid, Input } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import AddToken from './AddToken'
import Token from "./Token";
export default function NetworkTab({network, networkSettings, setStore}: any) {
    
    const defaultToken = {
        address: '0x0000000000000000000000000000000000000000',
        symbol: network.symbol,
        decimals: network.decimals,
        mockValue: networkSettings['mockValue'] || ''
    }

    const addToken = useCallback((token: any) => {
        setStore( (prev: any) => {
            
            if(!network?.chainId) return prev;
                
            const newNetworkSettings = prev.chains[network.chainId] || {};
            
            
            if(!newNetworkSettings.tokens) {
                newNetworkSettings.tokens = [];
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


    return (
        <Box as='form' maxW='full'>
            <AddToken 
                    network={network}
                    addToken = {addToken}
                     />
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                <Box onClick={defaultCurrencyToggle} opacity={networkSettings.disableDefaultCurrency ? '0.5' : '1'}>
                    <Token token={defaultToken} network={network} setStore={setStore} isDefaultToken={true} />
                </Box>
                {networkSettings.tokens?.map((token: any, index: number) => (
                    <Token key={index} index={index} token={token} network={network} setStore={setStore}  />
                ))}
            </Grid>
        </Box>
    )
}