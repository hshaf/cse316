import { useContext } from 'react'
import HomeScreen from './HomeScreen'
import AllListsScreen from './AllListsScreen'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'
import { Statusbar } from ".";

export default function AllListsWrapper() {
    const { auth } = useContext(AuthContext);
    console.log("AllListsWrapper auth.loggedIn: " + auth.loggedIn);
    
    if (auth.loggedIn)
        return (
            <AllListsScreen />
        );
    else
        return <SplashScreen />
}