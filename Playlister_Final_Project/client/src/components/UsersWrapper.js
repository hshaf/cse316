import { useContext } from 'react'
import HomeScreen from './HomeScreen'
import UsersScreen from './UsersScreen'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'
import { Statusbar } from ".";

export default function UsersWrapper() {
    const { auth } = useContext(AuthContext);
    console.log("AllListsWrapper auth.loggedIn: " + auth.loggedIn);
    
    if (auth.loggedIn)
        return (
            <UsersScreen />
        );
    else
        return <SplashScreen />
}