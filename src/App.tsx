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



function App() {

  React.useEffect(() => {
    // Disable scrolling when the component mounts
    document.body.style.overflow = "hidden";
    // Re-enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AddressProvider>
      <Box backgroundImage={`url(${background})`} backgroundSize={'cover'} flex={1} height={'100vh'} >
        <Box height={90} backgroundColor={'transparent'} flexDirection={'row'} alignItems={'center'} display={'flex'} justifyContent={'space-between'} px={10}>
          <Image src={logo} height={'90%'} aspectRatio={1} />
          <Box></Box>
        </Box>
        <Routes>
          <Route path="/" element={<SignOn />} />
          <Route path="/main-menu" element={<MainMenu />} />
          <Route path="/active-game" element={<ActiveGame />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/game-result/:finalScore" element={<GameResult />} />
        </Routes>
      </Box>
    </AddressProvider>
  );
}

export default App;
