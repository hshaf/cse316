import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);

    let addListClass = "playlister-button";

    let isModalOpen = store.isDeleteListModalOpen();

    function handleCreateNewList() {
        store.createNewList();
    }

    let text ="";
    if (store.currentList)
        text = store.currentList.name;
    return (
        <div id="playlister-statusbar">
            <Fab 
                disabled={isModalOpen}
                color="transparent" 
                style={{background: 'transparent', boxShadow: 'none', marginBottom:'5px'}}
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
                className={addListClass}
            >
                <AddIcon style={{fontSize:'48px'}}/>
            </Fab>
                <Typography variant="h2" style={{fontSize:'40px', fontFamily: "Calibri, sans-serif"}}>Your Lists</Typography>
        </div>
    );
}

export default Statusbar;