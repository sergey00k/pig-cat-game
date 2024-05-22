import { useState, useEffect, useContext } from "react";
import { Button, Heading, Stack, Box, Image, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

////////////// image imports /////////////
import buttonPng from '../Assets/Images/button.png'
import cat1 from '../Assets/Images/PC1.png'

//////////// solana wallet handlers imports ///////////
import { PublicKey } from "@solana/web3.js";

//////// borders for editing: =                                          borderColor={'black'} borderWidth={3}

///////// component imports /////////////////////
import { AddressContext } from '../AddressContext';

type PhantomEvent = "disconnect" | "connect" | "accountChanged";

interface ConnectOpts {
    onlyIfTrusted: boolean;
}

interface PhantomProvider {
    connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
    disconnect: ()=>Promise<void>;
    on: (event: PhantomEvent, callback: (args:any)=>void) => void;
    isPhantom: boolean;
}

type WindowWithSolana = Window & { 
    solana?: PhantomProvider;
}

const SignOn = () => {
    const [buttonClicked, setButtonClicked] = useState(false)
    const [ walletAvail, setWalletAvail ] = useState(false);
    const [ provider, setProvider ] = useState<PhantomProvider | null>(null);
    const [ connected, setConnected ] = useState(false);

    const navigate = useNavigate()
    const { address, updateAddress } = useContext(AddressContext);



    useEffect( () => {
        provider?.on("connect", (publicKey: PublicKey)=>{ 
            setConnected(true); 
            updateAddress(publicKey)
        });
        provider?.on("disconnect", ()=>{ 
            console.log("disconnect event");
            setConnected(false); 
            updateAddress(null)
        });
        if (address != null) {
            console.log(address)
            setTimeout(() => {
                navigate('/main-menu')
            }, 100)
        }

    }, [provider, address, updateAddress]);

    const buttonAnimation = () => {
        setButtonClicked(true)
        setTimeout(() => {
            setButtonClicked(false)
        }, 100)
    }


    const ConnectWallet = () => {
        buttonAnimation()

        if (connected) {
            provider?.disconnect() 
            updateAddress(null)
        } else {
            try {
                provider?.connect()
                setTimeout(() => {
                    navigate('/main-menu')
                }, 100)
            } catch (error) {
                console.log(`The following error occured while connecting wallet: ${error}`)
            }
        }

    }

    return (
        <Box backgroundColor={'transparent'} paddingBottom={10} paddingTop={8} flex={1} height={'100vh'} justifyContent={'space-between'} alignItems={'center'} >
            <Box position={'absolute'} top={7} right={10} alignItems={'center'} justifyContent={'center'} width={'18%'} display={'flex'} height={9} backgroundColor={'#B3EF5A'} borderColor={'#81C021'} borderWidth={3} rounded={20}>
                <Text textAlign={'center'} fontFamily={'Main'} fontSize={12} color={'white'}>{(address != null) ? `${JSON.stringify(address).slice(1, 5)}...${JSON.stringify(address).slice(-5, -1)}` : 'Disconnected'}</Text>
            </Box>
            <VStack height={'100%'} justifyContent={'space-between'} paddingBottom={'6%'} paddingTop={'10%'}>
                <Button onClick={ConnectWallet} style={{backgroundColor: 'transparent'}}>
                    <Box backgroundImage={`url(${buttonPng})`}   backgroundSize="cover" backgroundPosition="center" overflow="hidden" display="flex" height={180} alignItems={'center'} justifyContent={'center'} style={{ width: buttonClicked ? 370 : 380}}>
                        <Text textAlign={'center'} fontFamily={'Main'} color={'#F5F5F5'} style={{ fontSize: buttonClicked ? 15.2 : 16}}>{connected ? 'Disconnect' : 'Connect Wallet'}</Text>
                    </Box>
                </Button>
                <Image src={cat1} width={250} />
            </VStack>
            
        </Box>
    )
}

export default SignOn

