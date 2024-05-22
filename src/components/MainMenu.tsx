import React, { useState, useEffect, useRef } from "react";
import { Button, Heading, Stack, Box, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

///////// component imports /////////////////////
import { AddressContext } from '../AddressContext';


//////////// solana wallet handlers imports ///////////
import { clusterApiUrl, Connection, PublicKey, RpcResponseAndContext, SignatureResult, SystemProgram, Transaction } from '@solana/web3.js';


////////////// image imports /////////////
import buttonPng from '../Assets/Images/button.png'

type PhantomEvent = "disconnect" | "connect" | "accountChanged";

interface ConnectOpts {
    onlyIfTrusted: boolean;
}

interface PhantomProvider {
    connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
    disconnect: ()=>Promise<void>;
    on: (event: PhantomEvent, callback: (args:any)=>void) => void;
    isPhantom: boolean;
    publicKey: PublicKey;
    signTransaction: (t: Transaction) => {}
}

type WindowWithSolana = Window & { 
    solana?: PhantomProvider;
}

const network = "devnet";

const defaultDest = '69nW8dkbGaPCBabPM59tnnMPnaRdSrHDLLg18PpWFZfN';


const MainMenu = () => {
    const { address, updateAddress } = React.useContext(AddressContext);
    const [ connected, setConnected ] = useState(false);
    const [ provider, setProvider ] = useState<PhantomProvider | null>(null);
    const [button1Clicked, setButton1Clicked] = useState(false)
    const [button2Clicked, setButton2Clicked] = useState(false)
    const [button3Clicked, setButton3Clicked] = useState(false)
    const [button4Clicked, setButton4Clicked] = useState(false)

    const [lamports, setLamports] = useState(5000000)
    const [ txid, setTxid ] = useState<string | null>(null);
    const [ slot, setSlot ] = useState<number | null>(null);

    const navigate = useNavigate()
    const connection = useRef(new Connection(clusterApiUrl(network)));

    /*const initiateTX = async (provider: PhantomProvider | null) => {
        buttonAnimation(1)
        const recentBH = await connection.current.getRecentBlockhash();
        let transaction = new Transaction({
            feePayer: provider?.publicKey,
            recentBlockhash: recentBH.blockhash
        });
        
        if (provider) {
            transaction.add(
                SystemProgram.transfer({
                    fromPubkey: provider?.publicKey,
                    toPubkey: new PublicKey(defaultDest),
                    lamports: lamports,
                })
            );

            await provider?.signTransaction(transaction);

            connection.current.sendRawTransaction(transaction.serialize())
            .then(id => {
                console.log(`Transaction ID: ${id}`);
                setTxid(id);
                connection.current.confirmTransaction(id)
                .then((confirmation: RpcResponseAndContext<SignatureResult>) => {
                    navigate('active-game')
                });

            })
            .catch(console.error);
        }
    }*/
    


    useEffect( ()=>{
        if ("solana" in window) {
            const solWindow = window as WindowWithSolana;
            if (solWindow?.solana?.isPhantom) {
                setProvider(solWindow.solana);
                // Attemp an eager connection
                solWindow.solana.connect({ onlyIfTrusted: true });
            }
        }
    }, []);


    useEffect( () => {
        provider?.on("connect", (publicKey: PublicKey)=>{ 
            setConnected(true); 
            updateAddress(publicKey)
        });
        provider?.on("disconnect", ()=>{ 
            console.log("disconnect event");
            setConnected(false); 
            updateAddress(null)
            navigate('/')
        });

    }, [provider, address, updateAddress]);

    const buttonAnimation = (button: any) => {
        if (button === 1) {
            setButton1Clicked(true)
            setTimeout(() => {
                setButton1Clicked(false)
            }, 100)
        }
        if (button === 2) {
            setButton2Clicked(true)
            setTimeout(() => {
                setButton2Clicked(false)
            }, 100)
        }
        if (button === 3) {
            setButton3Clicked(true)
            setTimeout(() => {
                setButton3Clicked(false)
            }, 100)
        }

    }

    const navigateActiveGame = () => {
        buttonAnimation(1)
        setTimeout(() => {
            navigate('/active-game')
        }, 100)
    }

    const navigateSignOn = () => {
        buttonAnimation(3)
        provider?.disconnect()
    }

    const navigateLeaderboard = () => {
        buttonAnimation(2)
        setTimeout(() => {
            navigate('/leaderboard')
        }, 100)
    }

    return (
        <Box backgroundColor={'transparent'} paddingBottom={16} paddingTop={{ base: 16, md: 16, lg: 16, xl: 28 }} flex={1} height={'100vh'} justifyContent={'space-between'} alignItems={'center'} >
            <Box position={'absolute'} top={7} right={10} alignItems={'center'} justifyContent={'center'} width={'18%'} display={'flex'} height={9} backgroundColor={'#B3EF5A'} borderColor={'#81C021'} borderWidth={3} rounded={20}>
                <Text textAlign={'center'} fontFamily={'Main'} fontSize={{ base: 8, md: 10, lg: 12, xl: 12 }} color={'white'}>{(address != null) ? `${JSON.stringify(address).slice(1, 5)}...${JSON.stringify(address).slice(-5, -1)}` : 'Disconnected'}</Text>
            </Box>
            <VStack spacing={{ base: 36, md: 36, lg: 36, xl: 36 }}>
                <Button onClick={() => {navigateActiveGame()}} style={{backgroundColor: 'transparent'}}>
                    <Box backgroundImage={`url(${buttonPng})`}   backgroundSize="100% 100%" backgroundPosition="center" display="flex" height={300} alignItems={'center'} justifyContent={'center'} style={{ width: button1Clicked ? 585 : 600}}>
                        <Text textAlign={'center'} fontFamily={'Main'} color={'#F5F5F5'} style={{ fontSize: button1Clicked ? 22 : 24}}>Play Game</Text>
                    </Box>
                </Button>
                <Button onClick={navigateLeaderboard} style={{backgroundColor: 'transparent'}}>
                    <Box backgroundImage={`url(${buttonPng})`}   backgroundSize="100% 100%" backgroundPosition="center" display="flex" height={300} alignItems={'center'} justifyContent={'center'} style={{ width: button2Clicked ? 585 : 600}}>
                        <Text textAlign={'center'} fontFamily={'Main'} color={'#F5F5F5'} style={{ fontSize: button2Clicked ? 22 : 24}}>Leaderboard</Text>
                    </Box>
                </Button>
                <Button onClick={navigateSignOn} style={{backgroundColor: 'transparent'}}>
                    <Box backgroundImage={`url(${buttonPng})`}   backgroundSize="100% 100%" backgroundPosition="center" display="flex" height={300} alignItems={'center'} justifyContent={'center'} style={{ width: button3Clicked ? 585 : 600}}>
                        <Text textAlign={'center'} fontFamily={'Main'} color={'#F5F5F5'} style={{ fontSize: button3Clicked ? 22 : 24}}>Disconnect</Text>
                    </Box>
                </Button>
            </VStack>
        </Box>
    )
}

export default MainMenu