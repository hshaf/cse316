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
import CommentCard from './CommentCard.js'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function CommentWorkspaceScreen() {
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
            id="comment-cards" 
            sx={{ overflow:'auto', height:'338px',width: '100%', bgcolor: '#C4BEEE' }}
        >
            {
                store.currentList.comments.map((comment, index) => (
                    <CommentCard
                        id={'comment-card-' + index}
                        key={'comment-card-' + index}
                        // index={index}
                        username={comment.username}
                        comment={comment.comment}
                        index={index}
                    />
                ))  
            }
         </List>            
         { modalJSX }
         </Box>
         </>
    )
}

export default CommentWorkspaceScreen;