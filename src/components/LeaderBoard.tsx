import React from "react";
import { Button, Heading, Stack, Box, Text } from '@chakra-ui/react';
import { AddressContext } from "../AddressContext";


const LeaderBoard = () => {
    const { address, updateAddress } = React.useContext(AddressContext);

    return (
        <Box backgroundColor={'transparent'} paddingBottom={10} paddingTop={8} flex={1} height={'100vh'} justifyContent={'space-between'} alignItems={'center'} >
        <Box position={'absolute'} top={7} right={10} alignItems={'center'} justifyContent={'center'} width={'18%'} display={'flex'} height={9} backgroundColor={'#B3EF5A'} borderColor={'#81C021'} borderWidth={3} rounded={20}>
            <Text textAlign={'center'} fontFamily={'Main'} fontSize={12} color={'white'}>{(address != null) ? `${JSON.stringify(address).slice(1, 5)}...${JSON.stringify(address).slice(-5, -1)}` : 'Disconnected'}</Text>
        </Box>
        
    </Box>
    )
}

export default LeaderBoard