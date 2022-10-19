import { FormControl, FormLabel, Input, FormHelperText } from "@chakra-ui/react";
import NetworksList from "./NetworksList";

export default function NetworksTokens({store, setStore, networks}: any) : JSX.Element {
    return (
        <>
            <NetworksList networks={networks} chains={store.chains} setStore={setStore}  />
        </>
    )
}