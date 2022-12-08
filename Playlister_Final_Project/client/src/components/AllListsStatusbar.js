import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function AllListsStatusbar() {
    const { store } = useContext(GlobalStoreContext);

    let addListClass = "playlister-button";

    let isModalOpen = store.isDeleteListModalOpen();

    function handleCreateNewList() {
        store.createNewList();
    }

    let text ="";
    if (store.allListsSearchFilter)
        text = store.allListsSearchFilter;
    return (
        <div id="playlister-statusbar">
            <Typography variant="h2" style={{fontSize:'40px', fontFamily: "Calibri, sans-serif"}}>{text} Playlists</Typography>
        </div>
    );
}

export default AllListsStatusbar;