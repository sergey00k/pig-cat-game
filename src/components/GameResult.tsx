import React, { useState, useEffect } from "react";
import { Button, Heading, VStack, Box, Text  } from '@chakra-ui/react';
import { AddressContext } from "../AddressContext";
import { useNavigate, useParams } from 'react-router-dom';

////////////// image imports /////////////
import buttonPng from '../Assets/Images/button.png'


const GameResult = () => {
    const { address, updateAddress } = React.useContext(AddressContext);
    const [button1Clicked, setButton1Clicked] = useState(false)
    const [button2Clicked, setButton2Clicked] = useState(false)

    const navigate = useNavigate()
    const { finalScore } = useParams();


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
    }
    const navigateActiveGame = () => {
        buttonAnimation(1)
        navigate('/active-game')
    }

    const navigateMainMenu = () => {
        buttonAnimation(2)
        navigate('/main-menu')
    }

    return (
        <Box backgroundColor={'transparent'} paddingBottom={16} paddingTop={{ base: 16, md: 16, lg: 16, xl: 28 }} flex={1} height={'100vh'} justifyContent={'space-between'} alignItems={'center'} >
            <Box position={'absolute'} top={7} right={10} alignItems={'center'} justifyContent={'center'} width={'18%'} display={'flex'} height={9} backgroundColor={'#B3EF5A'} borderColor={'#81C021'} borderWidth={3} rounded={20}>
                <Text textAlign={'center'} fontFamily={'Main'} fontSize={12} color={'white'}>{(address != null) ? `${JSON.stringify(address).slice(1, 5)}...${JSON.stringify(address).slice(-5, -1)}` : 'Disconnected'}</Text>
            </Box>
            <VStack spacing={{ base: 16, md: 20, lg: 28, xl: 32 }} height={'70%'}>
                <Box position={'relative'} px={8} py={4} bottom={16} alignItems={'center'} justifyContent={'center'} display={'flex'} backgroundColor={'#B3EF5A'} borderColor={'#81C021'} borderWidth={3} rounded={160}>
                    <Text fontFamily={'Main'} color={'white'} textAlign={'center'} fontSize={24}>Final Score: {finalScore}</Text>
                </Box>
                <Button onClick={navigateActiveGame} style={{backgroundColor: 'transparent'}}>
                    <Box backgroundImage={`url(${buttonPng})`}   backgroundSize="100% 100%" backgroundPosition="center" display="flex" height={300} overflow="hidden" alignItems={'center'} justifyContent={'center'} style={{ width: button1Clicked ? 570 : 600}}>
                        <Text textAlign={'center'} fontFamily={'Main'} color={'#F5F5F5'} style={{ fontSize: button1Clicked ? 22 : 24}}>Play Again</Text>
                    </Box>
                </Button>
                <Button onClick={navigateMainMenu} style={{backgroundColor: 'transparent', position: 'relative', top: 16}}>
                    <Box backgroundImage={`url(${buttonPng})`}   backgroundSize="100% 100%" backgroundPosition="center" display="flex" height={300} alignItems={'center'} justifyContent={'center'} style={{ width: button2Clicked ? 570 : 600}}>
                        <Text textAlign={'center'} fontFamily={'Main'} color={'#F5F5F5'} style={{ fontSize: button2Clicked ? 22 : 24}}>Main Menu</Text>
                    </Box>
                </Button>
            </VStack>
        </Box>
    )
}

export default GameResult