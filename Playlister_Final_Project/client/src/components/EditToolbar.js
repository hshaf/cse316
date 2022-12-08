import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import CloseIcon from '@mui/icons-material/HighlightOff';
import Box from '@mui/material/Box';

import AuthContext from '../auth'

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
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
    return (
        <Box id="edit-toolbar">
            <Box>
                <Button
                    disabled={!store.canAddNewSong() || isModalOpen || !store.currentList}
                    id='add-song-button'
                    onClick={handleAddNewSong}
                    className={addSongClass}
                    style={{width:'100px', fontSize:'11px'}}
                    variant="contained">
                    Add Song
                </Button>
                <Button 
                    disabled={!store.canUndo() || isModalOpen || !store.currentList}
                    id='undo-button'
                    onClick={handleUndo}
                    className={undoClass}
                    style={{width:'100px', fontSize:'11px'}}
                    variant="contained">
                        Undo
                </Button>
                <Button 
                    disabled={!store.canRedo() || isModalOpen || !store.currentList}
                    id='redo-button'
                    onClick={handleRedo}
                    className={redoClass}
                    style={{width:'100px', fontSize:'11px'}}
                    variant="contained">
                        Redo
                </Button>
                {/* <Button 
                    disabled={!store.canClose() || isModalOpen || !store.currentList}
                    id='close-button'
                    onClick={handleClose}
                    className={closeClass}
                    variant="contained">
                        <CloseIcon />
                </Button> */}
            </Box>
            <Box style={{float:'right'}}>
                <Button 
                    disabled={!store.isListPublished() || isModalOpen || !store.currentList}
                    id='publish-button'
                    onClick={handlePublish}
                    className={publishClass}
                    style={{width:'100px', fontSize:'11px'}}
                    variant="contained">
                        Publish
                </Button>
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
                </Button>
                <Button 
                    disabled={auth.guest || isModalOpen || !store.currentList}
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

export default EditToolbar;