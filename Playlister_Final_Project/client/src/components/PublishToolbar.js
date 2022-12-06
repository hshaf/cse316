import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import CloseIcon from '@mui/icons-material/HighlightOff';
import Box from '@mui/material/Box';

import AuthContext from '../auth';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function PublishToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    let addSongClass = "playlister-button";
    let undoClass = "playlister-button";
    let redoClass = "playlister-button";
    let closeClass = "playlister-button";
    let publishClass = "playlister-button";
    let deleteClass = "playlister-button";
    let duplicateClass = "playlister-button";

    let isModalOpen = store.isEditSongModalOpen() || store.isRemoveSongModalOpen() || store.isDeleteListModalOpen();

    function handleAddNewSong() {
        store.addNewSong();
    }
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        store.closeCurrentList();
    }
    function handlePublish() {
        store.publishList();
    }
    async function handleDeleteList(event) {
        event.stopPropagation();
        if (store.currentList) {
            store.markListForDeletion(store.currentList._id);
        }
    }
    function handleDuplicate() {
        store.duplicateList();
    }
    function getDeleteButton() {
        if (store.currentList && auth.user.username !== store.currentList.ownerUsername) {
            return null;
        }
        let deletebtn =
            <Button 
            disabled={isModalOpen || !store.currentList}
            id='delete-list-button'
            onClick={(event) => {
                handleDeleteList(event)
            }}
            className={deleteClass}
            style={{width:'100px', fontSize:'11px'}}
            variant="contained">
                Delete
            </Button>;

        return deletebtn;
    }
    return (
        <Box id="edit-toolbar">
            <Box style={{float:'right'}}>
                {getDeleteButton()}
                <Button 
                    disabled={isModalOpen || !store.currentList}
                    id='duplicate-list-button'
                    onClick={handleDuplicate}
                    className={duplicateClass}
                    style={{width:'100px', fontSize:'11px'}}
                    variant="contained">
                        Duplicate
                </Button>
            </Box>
        </Box>
    )
}

export default PublishToolbar;