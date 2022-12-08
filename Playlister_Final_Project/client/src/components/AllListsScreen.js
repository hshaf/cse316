import React, { useContext, useEffect, useState } from 'react'
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
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IconButton from '@mui/material/IconButton';
import { TextField } from '@mui/material';
import { CommentWorkspaceScreen } from '.';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AllListsSearchToolbar from './AllListsSearchToolbar';
import AllListsStatusbar from './AllListsStatusbar';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const AllListsScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [text, setText] = useState("");

    let addListClass = "playlister-button";

    let isModalOpen = store.isDeleteListModalOpen();

    // useEffect(() => {
    //     store.loadIdNamePairs();
    // }, []);

    useEffect(() => {
        store.loadPublishedPlaylists();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        // Check if list is selected
        if (store.currentList) {
            store.publishedPlaylists.forEach((playlist) => {
                if (playlist._id == store.currentList._id && store.isPlayingList)
                    playlist.isSelected = true;
                else 
                    playlist.isSelected = false;
            })
        }
        listCard = 
            <List sx={{ position:'inherit', width: '96%', left: '5%', bgcolor: 'transparent', padding:'0px' }}>
            {
                store.publishedPlaylists.map((playlist) => (
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
    let youtubeplayer = <Box id="youtube-player"></Box>;
    let commentsList = <Box id="comments-list"></Box>;

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            store.addComment(text);
            event.target.value = "";
            setText(event.target.value);
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    // Create comments list
    if (store.currentList && store.currentList.isPublished) {
        commentsList =
            <Box style={{backgroundColor: '#C4BEEE' ,borderRadius:'10px', border:'2px solid black'}} id="comments-list">
                <Box>
                    <CommentWorkspaceScreen />
                </Box>
                <Box>
                    <TextField
                    label="Add Comment"
                    variant="filled"
                    style={{marginTop:'15px',borderRadius:'10px', backgroundColor:'white'}}
                    fullWidth
                    onKeyPress={handleKeyPress}
                    onChange={handleUpdateText}
                    >

                    </TextField>
                </Box>
            </Box>;
    }
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    let currrentPlaylistText = <Typography id="current-playlist-text" fontSize='14px' fontWeight='bold'>Playlist:</Typography>
    let currentSongText = <Typography id="current-song-text" fontSize='14px' fontWeight='bold'>Song #:</Typography>
    let currentSongTitleText = <Typography id="current-song-title-text" fontSize='14px' fontWeight='bold'>Title:</Typography>
    let currentSongArtistText = <Typography id="current-song-artist-text" fontSize='14px' fontWeight='bold'>Artist:</Typography>

    if (store.currentList && store.isPlayingList) {
        songs = store.currentList.songs;
        // Get YouTube IDs
        songs = songs.map((song) => (song.youTubeId))
        youtubeplayer = <PlaylisterYouTubePlayer songs={songs} />;
    }
    else {
        currrentPlaylistText = <Typography id="current-playlist-text" fontSize='14px' fontWeight='bold'></Typography>
        currentSongText = <Typography id="current-song-text" fontSize='14px' fontWeight='bold'></Typography>
        currentSongTitleText = <Typography id="current-song-title-text" fontSize='14px' fontWeight='bold'></Typography>
        currentSongArtistText = <Typography id="current-song-artist-text" fontSize='14px' fontWeight='bold'></Typography>
        youtubeplayer =
        <Box>
            <Box bgcolor='black' id="youtube-player">

            </Box>
            <Box style={{borderRadius:'10px'}} bgcolor='#C4BEEE' id="player-info-and-buttons">
                <Box display="flex" justifyContent="center">
                    <Typography fontWeight='bold'>Now Playing</Typography>
                </Box>
                <Box style={{minHeight:'85px', maxHeight:'85px'}} marginLeft='10px'>
                    {currrentPlaylistText}
                    {currentSongText}
                    {currentSongTitleText}
                    {currentSongArtistText}
                </Box>
                <Box display="flex" justifyContent="center">
                    <Box display="flex" justifyContent="center" style={{minWidth:'350px',maxWidth:'350px',minHeight:'30px',maxHeight:'30px',border:'2px solid black',borderRadius:'10px'}} bgcolor='#F6F6E6'>
                        <IconButton><SkipPreviousIcon style={{color:'black', fontSize:'28px'}}></SkipPreviousIcon></IconButton>
                        <IconButton><StopIcon style={{color:'black', fontSize:'28px'}}></StopIcon></IconButton>
                        <IconButton><PlayArrowIcon style={{color:'black', fontSize:'28px'}}></PlayArrowIcon></IconButton>
                        <IconButton><SkipNextIcon style={{color:'black', fontSize:'28px'}}></SkipNextIcon></IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>;
    }

    return (
        <div id="homescreen">
            <AllListsSearchToolbar />
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
                    {/* <Box id="player-comments-tabs">
                        <Button variant='contained' onClick={handlePlayer} style={{fontWeight:'bold', color:'black', width:'125px'}}>Player</Button>
                        <Button variant='contained' onClick={handleComments} style={{fontWeight:'bold', color:'black', width:'125px'}}>Comments</Button>
                    </Box> */}
                    <Box id="player-tabs">
                        <Tabs value={tabIndex} onChange={handleTabChange}>
                            <Tab style={{fontWeight:'bold'}} label="Player" />
                            <Tab disabled={store.isListPublished() || !store.currentList} style={{fontWeight:'bold'}} label="Comments" />
                        </Tabs>
                    </Box>
                    <Box>
                        {tabIndex === 0 && (
                            youtubeplayer
                        )}
                    </Box>
                    <Box>
                        {tabIndex === 1 && (
                            commentsList
                        )}
                    </Box>
                    {/* <PlaylisterYouTubePlayer songs={songs} /> */}
                    {/* {youtubeplayer} */}
                    {/* {commentsList} */}
                    {/* <Box bgcolor='black' id="youtube-player">
                        {youtubeplayer}
                    </Box>
                    <Box style={{borderRadius:'10px'}} bgcolor='#C4BEEE' id="player-info-and-buttons">
                        <Box display="flex" justifyContent="center">
                            <Typography fontWeight='bold'>Now Playing</Typography>
                        </Box>
                        <Box style={{minHeight:'85px', maxHeight:'85px'}} marginLeft='10px'>
                            {currrentPlaylistText}
                            {currentSongText}
                            {currentSongTitleText}
                            {currentSongArtistText}
                        </Box>
                        <Box display="flex" justifyContent="center">
                            <Box display="flex" justifyContent="center" style={{minWidth:'350px',maxWidth:'350px',minHeight:'30px',maxHeight:'30px',border:'2px solid black',borderRadius:'10px'}} bgcolor='#F6F6E6'>
                                <IconButton><SkipPreviousIcon style={{color:'black', fontSize:'28px'}}></SkipPreviousIcon></IconButton>
                                <IconButton><StopIcon style={{color:'black', fontSize:'28px'}}></StopIcon></IconButton>
                                <IconButton><PlayArrowIcon style={{color:'black', fontSize:'28px'}}></PlayArrowIcon></IconButton>
                                <IconButton><SkipNextIcon style={{color:'black', fontSize:'28px'}}></SkipNextIcon></IconButton>
                            </Box>
                        </Box>
                    </Box> */}
                </div>
            </Box>
            <AllListsStatusbar />
        </div>)
}

export default AllListsScreen;