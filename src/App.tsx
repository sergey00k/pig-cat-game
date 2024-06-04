import React from "react";
import { Routes, Route } from 'react-router-dom';
import { Button, Heading, Stack, Box, Text, Image } from '@chakra-ui/react';


import './App.css';

///////////////////// image imports ////////////
import background from './Assets/Images/background.png'
import logo from './Assets/Images/Logo.png'


/////// component imports ////////
import SignOn from './components/SignOn';
import MainMenu from './components/MainMenu';
import ActiveGame from './components/ActiveGame';
import LeaderBoard from './components/LeaderBoard';
import GameResult from './components/GameResult';
import { AddressProvider } from './AddressContext';

/////////// icon imports /////////////////
import { IoPause } from 'react-icons/io5';
import { IoPlay } from 'react-icons/io5';



function App() {
  const [pause, setPause] = React.useState(true)

  React.useEffect(() => {
    // Disable scrolling when the component mounts
    document.body.style.overflow = "hidden";
    // Re-enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const videoSrc = "/videos/dynamic-bg-4k.mp4"

  const pausePlay = () => {
    if (pause) {
      setPause(false)
    } else {
      setPause(true)
    }
  }

  return (
    <AddressProvider>
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          objectFit: 'cover',
          flex: 1,
          zIndex: -1,
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      {/*<Box backgroundImage={`url(${background})`} backgroundSize={'cover'} flex={1} height={'100vh'} >*/}
        <Box height={90} backgroundColor={'transparent'} flexDirection={'row'} alignItems={'center'} display={'flex'} justifyContent={'space-between'} px={10}>
          <Box height={'90%'} width={'25%'} flexDirection={'row'} display={'flex'} alignItems={'center'}>
            <Image src={logo} height={'100%'} marginRight={8} aspectRatio={1} />
            <Button onClick={pausePlay} style={{ backgroundColor: 'transparent' }}>
              {pause ? (
                <IoPause color={'#B3EF5A'} size={36} />
              ) : (
                <IoPlay color={'#B3EF5A'} size={36} />
              )}
            </Button>
          </Box>
          <Box></Box>
        </Box>
        <Routes>
          <Route path="/" element={<SignOn />} />
          <Route path="/main-menu" element={<MainMenu />} />
          <Route path="/active-game" element={<ActiveGame />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/game-result/:finalScore" element={<GameResult />} />
        </Routes>
      {/*</Box>*/}
    </AddressProvider>
  );
}

export default App;
