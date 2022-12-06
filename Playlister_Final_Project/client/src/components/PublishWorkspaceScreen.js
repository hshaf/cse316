import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
import Statusbar from './Statusbar.js'
import PublishSongCard from './PublishSongCard.js'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function PublishWorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    
    if (!store.currentList) {
        store.history.push("/");
        return null;
    }

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }
    return (
        <>
        <Box>
        <List 
            id="playlist-cards" 
            sx={{ borderRadius: '13px', maxHeight:'250px',width: '100%', bgcolor: '#242960' }}
        >
            {
                store.currentList.songs.map((song, index) => (
                    <PublishSongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                ))  
            }
         </List>            
         { modalJSX }
         </Box>
         </>
    )
}

export default PublishWorkspaceScreen;