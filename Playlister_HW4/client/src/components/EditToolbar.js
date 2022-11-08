import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import CloseIcon from '@mui/icons-material/HighlightOff';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);

    let addSongClass = "playlister-button";
    let undoClass = "playlister-button";
    let redoClass = "playlister-button";
    let closeClass = "playlister-button";

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
    return (
        <div id="edit-toolbar">
            <Button
                disabled={!store.canAddNewSong() || isModalOpen || !store.currentList}
                id='add-song-button'
                onClick={handleAddNewSong}
                className={addSongClass}
                variant="contained">
                <AddIcon />
            </Button>
            <Button 
                disabled={!store.canUndo() || isModalOpen || !store.currentList}
                id='undo-button'
                onClick={handleUndo}
                className={undoClass}
                variant="contained">
                    <UndoIcon />
            </Button>
            <Button 
                disabled={!store.canRedo() || isModalOpen || !store.currentList}
                id='redo-button'
                onClick={handleRedo}
                className={redoClass}
                variant="contained">
                    <RedoIcon />
            </Button>
            <Button 
                disabled={!store.canClose() || isModalOpen || !store.currentList}
                id='close-button'
                onClick={handleClose}
                className={closeClass}
                variant="contained">
                    <CloseIcon />
            </Button>
        </div>
    )
}

export default EditToolbar;