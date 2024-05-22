import React, { useState, useEffect, useRef } from "react";
import { Button, Heading, Stack, Box, Text, VStack, Image, HStack, useTimeout, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { keyframes } from "@emotion/react"

////////////// image imports /////////////
import buttonPng from '../Assets/Images/button.png'
import cat1 from '../Assets/Images/PC1.png'
import cat2 from '../Assets/Images/game-cat-3.png'
import hat1 from '../Assets/Images/hat1.png'
import hat2 from '../Assets/Images/PC Game NEW/game-hat-3.png'

import { AddressContext } from '../AddressContext';

const ActiveGame = () => {
    const [buttonClicked, setButtonClicked] = useState(false)
    const { address, updateAddress } = React.useContext(AddressContext);
    const [score, setScore] = useState(0)
    const [speed, setSpeed] = useState(6) //10
    const [slideDistance, setSlideDistance] = useState(600)

    const [catXPosition, setCatXPosition] = useState(0)
    const [hatXPosition, setHatXPosition] = useState(0)

    const [alreadyClicked, setAlreadyClicked] = useState(false)
    const [endGame, setEndGame] = useState(false)
    
    const [slideKeyframes, setSlideKeyframes] = useState(keyframes`
    0% {
      transform: translateX(-600px);
    }
    100% {
      transform: translateX(600px);
    }
    `)

    const fadeOutKeyframes = keyframes`
    from { opacity: 1; }
    to { opacity: 0; }
    ` ;

    const navigate = useNavigate();

    useEffect(() => {
        const queryBase = window.matchMedia("(max-width: 400px)")
        const queryMd = window.matchMedia("(max-width: 700px)")
        const queryLg = window.matchMedia("(max-width: 1200px)")
        const queryXl = window.matchMedia("(max-width: 1500px)")
    
        if (queryBase.matches) {
            setSlideDistance(300)
            setSlideKeyframes(keyframes`
            0% {
              transform: translateX(-300px);
            }
            100% {
              transform: translateX(300px);
            }
            `)
            console.log('small')
        }
        else if (queryMd.matches) {
            setSlideDistance(420)
            setSlideKeyframes(keyframes`
            0% {
              transform: translateX(-420px);
            }
            100% {
              transform: translateX(420px);
            }
            `)
            console.log('md')
        }
        else if (queryLg.matches) {
            setSlideDistance(520)
            setSlideKeyframes(keyframes`
            0% {
              transform: translateX(-520px);
            }
            100% {
              transform: translateX(520px);
            }
            `)
            console.log('lg')
        }
        else if (queryXl.matches) {
            setSlideDistance(680)
            setSlideKeyframes(keyframes`
            0% {
              transform: translateX(-680px);
            }
            100% {
              transform: translateX(680px);
            }
            `)
            console.log('xl')
        }
    },[catXPosition])


    ///////////////// sliding animation ////////////////////////


    const catRef = useRef<HTMLImageElement>(null)
    const hatRef = useRef<HTMLImageElement>(null)

    const getHatPosition = () => {
        if (hatRef.current) {
            const rect = hatRef.current.getBoundingClientRect();
            const initialPositionX = rect.left;
            setHatXPosition(initialPositionX);
            return initialPositionX
        }
    }

    const getCatPosition = () => {
        if (catRef.current) {
            const rect = catRef.current.getBoundingClientRect();
            const initialPositionX = rect.left;
            setCatXPosition(initialPositionX);
          }
    }

    useEffect(() => {
        getCatPosition()
        window.addEventListener('resize', getCatPosition);
    }, []);



   //const customTimingFunction = `cubic-bezier(0, 0.80, 1, 0.20)`;
  

    const buttonAnimation = () => {
        setButtonClicked(true)
        setTimeout(() => {
            setButtonClicked(false)
        }, 100)
    }

    const hatStopAnimation = (catPosition: number, slideDistance: number) => { 
        const hatXPosition = getHatPosition()
        console.log(hatXPosition + ' hat position')
        console.log(catPosition)
        if (hatXPosition) {
            if ((hatXPosition - catPosition) < 50 && (hatXPosition - catPosition) > -50) {
                console.log('ALL OF THIS RUNS' + score)
                setSlideKeyframes(keyframes`
                0% {
                    transform: translateX(0);
                }
                100% {
                    transform: translateX(0);
                }
                `)
                setTimeout(() => {
                    setSlideKeyframes(keyframes`
                    0% {
                    transform: translateX(0);
                    }
                    50% {
                        transform: translateX(-${slideDistance}px);
                    }
                    100% {
                    transform: translateX(${slideDistance}px);
                    }
                    `)
                }, 1000)
                return false
            } else {
                setEndGame(true)
                return true
            }
        }
    }

    const StopHat = (catPosition: number, slideDistance: number, finalScore: number) => {
        setAlreadyClicked(true)
        buttonAnimation()
        const endGameBool = hatStopAnimation(catPosition, slideDistance)
        if (endGameBool) {
            EndGame(finalScore)
        } else {
            setScore(score + 1)
            setSpeed(speed * 0.92)
        }
        setTimeout(() => {
            setAlreadyClicked(false)
        }, 1100)
    }

    const EndGame = (finalScore: number) => {
        setTimeout(() => {
            navigate(`/game-result/${finalScore}`)
        }, 1200)
    }//

    return (
        <Box backgroundColor={'transparent'} paddingBottom={'2%'} paddingTop={8} flex={1} height={'100vh'} width={'100%'} justifyContent={'space-evenly'} alignItems={'center'} >
            <HStack justifyContent={'space-between'} position={'absolute'} top={7} right={10} width={'57%'} display={'flex'}>
                <Box {...(endGame ? { opacity: 1, animation: `${fadeOutKeyframes} 1.2s forwards` } : {opacity: 1})} alignItems={'center'} justifyContent={'center'} width={'34%'} display={'flex'} height={9} backgroundColor={'#B3EF5A'} borderColor={'#81C021'} borderWidth={3} rounded={20}>
                    <Text textAlign={'center'} fontFamily={'Main'} fontSize={12} color={'white'} {...(endGame ? { opacity: 1, animation: `${fadeOutKeyframes} 1.2s forwards` } : {opacity: 1})}>Score: {score}</Text>
                </Box>
                <Box alignItems={'center'} justifyContent={'center'} width={'34%'} display={'flex'} height={9} backgroundColor={'#B3EF5A'} borderColor={'#81C021'} borderWidth={3} rounded={20}>
                    <Text textAlign={'center'} fontFamily={'Main'} fontSize={12} color={'white'}>{(address != null) ? `${JSON.stringify(address).slice(1, 5)}...${JSON.stringify(address).slice(-5, -1)}` : 'Disconnected'}</Text>
                </Box>
            </HStack>

            <VStack height={'100%'} width={'100%'} justifyContent={'space-between'} paddingBottom={'6%'} paddingTop={'10%'}>
                <Button onClick={() => {if (alreadyClicked) {buttonAnimation()} else {StopHat(catXPosition, slideDistance, score)}}} style={{backgroundColor: 'transparent'}} {...(endGame ? { opacity: 1, animation: `${fadeOutKeyframes} 1.2s forwards` } : {opacity: 1})}>
                    <Box backgroundImage={`url(${buttonPng})`}   backgroundSize="cover" backgroundPosition="center" overflow="hidden" display="flex" height={180} alignItems={'center'} justifyContent={'center'} style={{ width: buttonClicked ? 370 : 380}}>
                        <Text textAlign={'center'} fontFamily={'Main'} color={'#F5F5F5'} style={{ fontSize: buttonClicked ? 15.2 : 16}}>Stop Hat</Text>
                    </Box>
                </Button>
                <Flex width={'20%'} justifyContent={'center'} alignItems={'center'}>
                    <Image ref={hatRef} {...(endGame ? { opacity: 0 } : {animation: `${slideKeyframes} ${speed}s linear infinite alternate`})} position={'relative'} zIndex={2} src={hat1} width={'110%'} bottom={'26%'} left={'54%'} />
                    <Image ref={catRef} {...(endGame ? { opacity: 1, animation: `${fadeOutKeyframes} 1.2s forwards` } : {opacity: 1})}position={'relative'} zIndex={1} right={'50%'} src={cat1} width={'100%'} />
                </Flex>
            </VStack>
        </Box>
    )
}

export default ActiveGame