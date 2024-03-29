import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import { useLocation } from 'react-router-dom';
import playlisterlogo from './playlister-logo.png';

import EditToolbar from './EditToolbar'

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function AppBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleHomeLink = () => {
        store.clearTransactions();
    };

    const handleLogout = () => {
        handleMenuClose();
        store.clearTransactions();
        auth.logoutUser();
        store.resetStore();
    }

    const menuId = 'primary-search-account-menu';
    const loggedOutMenu = (
        <Menu
            sx={{mt:'45px'}}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}><Link to='/login/'>Login</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/register/'>Create New Account</Link></MenuItem>
        </Menu>
    );
    const loggedInMenu = 
        <Menu
            sx={{mt:'55px'}}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>        

    // let editToolbar = "";
    let menu = loggedOutMenu;
    if (auth.loggedIn) {
        menu = loggedInMenu;
        // if (store.currentList) {
        //     editToolbar = <EditToolbar />;
        // }
    }
    
    function getAccountMenu(loggedIn) {
        let userInitials = auth.getUserInitials();
        console.log("userInitials: " + userInitials);
        if (loggedIn) 
            return <div id="user-initials"><div id="user-initials-text">{userInitials}</div></div>;
        else
            return <AccountCircleOutlinedIcon style={{color: 'black'}} />;
    }

    let location = useLocation();

    if (!auth.loggedIn && location.pathname === "/") {
        return (
            null
        );
    }
    else {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{ background: '#e6e6e6' }}>
                    <Toolbar style={{minHeight: '50px', maxHeight: '50px', paddingLeft: '0px'}}>
                        <Link style={{ textDecoration: 'none', color: 'white' }} onClick={handleHomeLink} to='/'><img src={playlisterlogo} style={{width: 150, paddingTop: 5}}></img></Link>
                        <Box sx={{ flexGrow: 1 }}></Box>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                { getAccountMenu(auth.loggedIn) }
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                {
                    menu
                }
            </Box>
        );
    }
}