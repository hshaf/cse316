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
        listCard = 
            <List sx={{ position:'inherit', width: '96%', left: '5%', bgcolor: 'transparent', padding:'0px' }}>
            {
                store.userPlaylists.map((playlist) => (
                    <ListCard
                        key={playlist._id}
                        playlist={playlist}
                        selected={false}
                    />
                ))
            }
            </List>;
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
            </Box>
            <Statusbar />
        </div>)
}

export default HomeScreen;