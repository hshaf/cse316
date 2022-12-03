import { Button, Box } from '@mui/material';
import playlisterlogo from './playlister-logo.png';

import { useHistory } from 'react-router-dom';

export default function SplashScreen() {
    const history = useHistory();


    function handleRegister() {
        history.push("/register/");
    }

    function handleLogIn() {
        history.push("/login/");
    }

    function handleGuest() {
        // TO-DO
    }

    return (
        <div id="splash-screen">
            <div id="splash-screen-content">
                <img src={playlisterlogo} style={{width: 300, paddingTop: 0}}></img>
                <h1 style={{fontSize: 32, fontFamily: "Calibri, sans-serif", color: "black", marginTop: 0}}>Welcome to Playlister!</h1>
                <p style={{fontSize: 18, fontFamily: "Calibri, sans-serif", color: "black", marginBottom: 0}}>Create and customize your own playlists. Listen to your favorite songs.</p>
                <p style={{fontSize: 18, fontFamily: "Calibri, sans-serif", color: "black", marginTop: 5, marginBottom: 5}}>Discover and share lists with users around the world!</p>
                <Box>
                    <Button id="splash-screen-button" variant="contained" sx={{minWidth: '175px', maxWidth: '175px', bgcolor: "white", color: "black", border: '2px solid', marginRight: '10px', '&:hover': {backgroundColor: '#DDDDE3'}}} onClick={handleRegister}>Create Account</Button>
                    <Button id="splash-screen-button" variant="contained" sx={{minWidth: '175px', maxWidth: '175px', bgcolor: "white", color: "black", border: '2px solid', '&:hover': {backgroundColor: '#DDDDE3'}}} onClick={handleLogIn}>Login</Button>
                </Box>
                <p style={{marginTop: '0px', marginBottom: '0px', fontSize: 18, fontFamily: "Calibri, sans-serif", color: "black"}}>or</p>
                <Button id="splash-screen-button" variant="contained" sx={{minWidth: '200px', maxWidth: '200px', bgcolor: "white", color: "black", border: '2px solid', '&:hover': {backgroundColor: '#DDDDE3'}}} onClick={handleGuest}>Continue as Guest</Button>
                <p id="copyright-p" style={{fontSize: 12, fontFamily: "Calibri, sans-serif", color: "black"}}>Made by Hamza Shafiq</p>
            </div>
        </div>
    )
}