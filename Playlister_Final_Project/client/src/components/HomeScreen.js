import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import Statusbar from './Statusbar.js'
import SearchToolbar from './SearchToolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PlaylisterYouTubePlayer from './PlaylisterYouTubePlayer';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    let addListClass = "playlister-button";

    let isModalOpen = store.isDeleteListModalOpen();

    // useEffect(() => {
    //     store.loadIdNamePairs();
    // }, []);

    useEffect(() => {
        store.loadUserPlaylists();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        // Check if list is selected
        if (store.currentList) {
            store.userPlaylists.forEach((playlist) => {
                if (playlist._id == store.currentList._id)
                    playlist.isSelected = true;
                else 
                    playlist.isSelected = false;
            })
        }
        listCard = 
            <List sx={{ position:'inherit', width: '96%', left: '5%', bgcolor: 'transparent', padding:'0px' }}>
            {
                store.userPlaylists.map((playlist) => (
                    <ListCard
                        key={playlist._id}
                        playlist={playlist}
                        selected={playlist.isSelected}
                    />
                ))
            }
            </List>;
    }

    // Songs for the YouTube player
    let songs = [];
    let youtubeplayer = null;

    if (store.currentList) {
        songs = store.currentList.songs;
        // Get YouTube IDs
        songs = songs.map((song) => (song.youTubeId))
        youtubeplayer = <PlaylisterYouTubePlayer songs={songs} />;
    }

    return (
        <div id="homescreen">
            <SearchToolbar />
            <Box id="lists-and-player-box">
                <div id="playlister-selector">
                    <div id="list-selector-list">
                        {
                            listCard
                        }
                        <MUIDeleteModal />
                    </div>
                </div>
                <div id="player-and-list-comments">
                    <Box id="player-comments-tabs">
                        <Button style={{fontWeight:'bold', color:'black', outline:'2px solid black', width:'125px'}}>Player</Button><Button style={{fontWeight:'bold', color:'black', outline:'2px solid black', width:'125px'}}>Comments</Button>
                    </Box>
                    <Box bgcolor='black' id="youtube-player">
                        {youtubeplayer}
                    </Box>
                    <Box display="flex" justifyContent="center" style={{borderRadius:'10px'}} bgcolor='#C4BEEE' id="player-info-and-buttons">
                        <Typography>Now Playing</Typography>
                    </Box>
                </div>
            </Box>
            <Statusbar />
        </div>)
}

export default HomeScreen;