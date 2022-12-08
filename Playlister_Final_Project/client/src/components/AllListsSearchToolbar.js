import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext, allListsSortTypes, sortTypes } from '../store'
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
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import TextField from '@mui/material/TextField';
import SortIcon from '@mui/icons-material/Sort';

import { useHistory } from 'react-router-dom';

export default function AllListsSearchToolbar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const [text, setText] = useState("");
    const history = useHistory();

    const handleSortMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
    }

    const handleSortCreationDate = () => {
        store.setSortType(sortTypes.BY_CREATION_DATE);
        handleMenuClose();
    };

    const handleSortLastEdit = () => {
        store.setSortType(sortTypes.BY_LAST_EDIT_DATE);
        handleMenuClose();
    };

    const handleSortByName = () => {
        store.setAllListsSortType(allListsSortTypes.BY_NAME);
        handleMenuClose();
    };
    const handleSortByPublish = () => {
        store.setAllListsSortType(allListsSortTypes.BY_PUBLISH_DATE);
        handleMenuClose();
    };
    const handleSortByListens = () => {
        store.setAllListsSortType(allListsSortTypes.BY_LISTENS);
        handleMenuClose();
    };
    const handleSortByLikes = () => {
        store.setAllListsSortType(allListsSortTypes.BY_LIKES);
        handleMenuClose();
    };
    const handleSortByDisikes = () => {
        store.setAllListsSortType(allListsSortTypes.BY_DISLIKES);
        handleMenuClose();
    };

    const handleHome = () => {
        store.resetStore();
        history.push("/");
    };

    const handleAllLists = () => {
        history.push("/allLists/");
    };

    const handleUsers = () => {
        
    };

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            // store.addComment(text);
            // event.target.value = "";
            // setText(event.target.value);
            // console.log(text);
            store.setAllListsSearchFilter(text);
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    const menuId = 'search-playlist-menu';
    const sortListMenu = 
        <Menu
            sx={{mt:'50px'}}
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
            <MenuItem onClick={handleSortByName}>Name (A-Z)</MenuItem>
            <MenuItem onClick={handleSortByPublish}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={handleSortByListens}>Listens (High-Low)</MenuItem>
            <MenuItem onClick={handleSortByLikes}>Likes (High-Low)</MenuItem>
            <MenuItem onClick={handleSortByDisikes}>Dislikes (High-Low)</MenuItem>
        </Menu>        

    let menu = sortListMenu;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ backgroundColor: 'transparent' }} elevation={0}>
                <Toolbar style={{minHeight: '60px', maxHeight: '60px'}}>
                    <Box sx={{flexGrow: 1}} style={{paddingTop:'5px'}}>
                        <IconButton onClick={handleHome}><HomeOutlinedIcon style={{color:'black', fontSize:'48px' }}></HomeOutlinedIcon></IconButton>
                        <IconButton onClick={handleAllLists}><GroupsOutlinedIcon style={{color:'black', fontSize:'48px'}}></GroupsOutlinedIcon></IconButton>
                        <IconButton onClick={handleUsers}><Person2OutlinedIcon style={{color:'black', fontSize:'48px'}}></Person2OutlinedIcon></IconButton>
                    </Box>
                    <Box sx={{flexGrow: 1}} style={{paddingBottom:'5px'}}>
                        <TextField
                            margin="normal"
                            name="search-list"
                            label="Search"
                            type="search-list"
                            onKeyPress={handleKeyPress}
                            onChange={handleUpdateText}
                            id="search-list"
                            autoComplete="search-list"
                            style={{backgroundColor:'white', width:'400px'}}
                            size='small'
                        />
                    </Box>
                    <Box style={{marginRight:'10px', paddingTop:'5px'}}>
                        <Typography style={{color:'black', fontWeight:'bold'}}>SORT BY</Typography>
                    </Box>
                    <Box style={{paddingTop:'0px'}}>
                        <IconButton 
                            onClick={handleSortMenuOpen} 
                            style={{color:'black', fontSize:'42px'}}
                            aria-controls={menuId}
                            aria-haspopup="true"
                            aria-label="sort playlists"
                        >
                            <SortIcon style={{fontSize:'38px'}}></SortIcon>
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