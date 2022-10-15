import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import NetworkTab from "./NetworkTab";

export default function NetworksList( {networks, chains, setStore} : any): JSX.Element {
    
    return (
            <Tabs variant='soft-rounded' colorScheme='green' isLazy>
                <TabList>
                    { networks.map((network: any, index: number) => (
                        <Tab key={index}>{network.name}</Tab>
                    ))}
                    
                </TabList>
                <TabPanels>
                    { networks.map((network: any, index: number) => {
                        const networkSettings = chains?.[network.chainId] || {};
                        return (
                            <TabPanel key={index}>
                                <NetworkTab 
                                    network={network}
                                    networkSettings={networkSettings} 
                                    setStore={setStore}
                                    />
                            </TabPanel>
                        )
                        
                    })}
                </TabPanels>
            </Tabs>
    )
}