import { FormControl, FormLabel, Input, FormHelperText } from "@chakra-ui/react";
import NetworksList from "./NetworksList";

export default function NetworksTokens({store, setStore, networks}: any) : JSX.Element {
    return (
        <>
            <FormControl>
                <FormLabel>Merchant Address</FormLabel>
                <Input value={store.merchant || ''} onInput={(e:any) => {
                setStore((prev: any) => {
                    return {...prev, merchant: e.target.value};
                })
                }} />
                
            </FormControl>
            <FormControl>
                <FormLabel>Account ID</FormLabel>
                <Input type="number" value={store.accountId || ''} onInput={(e:any) => {
                setStore((prev: any) => {
                    return {...prev, accountId: e.target.value};
                })
                }} />
                <FormHelperText>The account id can be found at merchants.org</FormHelperText>
            </FormControl>
            <NetworksList networks={networks} chains={store.chains} setStore={setStore}  />
        </>
    )
}