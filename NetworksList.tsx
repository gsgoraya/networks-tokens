import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import NetworkTab from "./NetworkTab";

export default function NetworksList( {networks, chains, setStore, defaultTokens} : any): JSX.Element {
    
    return (
            <Tabs variant='enclosed-colored' isLazy orientation="vertical">
                <TabList w='250px'>
                    { networks.map((network: any, index: number) => (
                        <Tab key={index} p='4' _focus={ {outline: '0'} }>
                            {network.name}
                        </Tab>
                    ))}
                    
                </TabList>
                <TabPanels borderTopWidth='1px'>
                    { networks.map((network: any, index: number) => {
                        const networkSettings = chains?.[network.chainId] || {};
                        return (
                            <TabPanel key={index}>
                                <NetworkTab 
                                    network={network}
                                    networkSettings={networkSettings} 
                                    setStore={setStore}
                                    defaultTokens={defaultTokens ? defaultTokens[network.chainId] ?? [] : []}
                                    />
                            </TabPanel>
                        )
                        
                    })}
                </TabPanels>
            </Tabs>
    )
}