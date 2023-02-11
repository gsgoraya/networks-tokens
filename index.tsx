import { Box, Text } from "@chakra-ui/react";
import NetworksList from "./NetworksList";

export default function NetworksTokens({store, setStore, networks, defaultTokens}: any) : JSX.Element {
    return (
        <>
            <Box p='4'>
                <Text fontSize='sm'>We currently support the most popular chains/networks based on the ethereum virtual machine. Select the network in the left panel and add/edit tokens (currencies) that you want to be able to receive.</Text>
            </Box>
            <Box>
                <NetworksList networks={networks} chains={store.chains} setStore={setStore} defaultTokens={defaultTokens}  />
            </Box>
        </>
    )
}