import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    // const { idNamePair, selected } = props;
    const { playlist, selected } = props;

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    let cardbgcolor = '#F6F6E6';
    if (selected) 
        cardbgcolor = '#DAB810';
    let cardElement =
        <ListItem
            id={playlist._id}
            key={playlist._id}
            sx={{ bgcolor:cardbgcolor, marginLeft:'10px', marginTop: '13px', marginBottom:'2px', display: 'flex', p: 1, borderRadius:'15px', outline:'2px solid black', ":hover":{bgcolor:cardbgcolor} }}
            style={{ height:'100px', width:'100%' }}
            button
            onClick={(event) => {
                handleLoadList(event, playlist._id)
            }}
        >
            <Box style={{width:'100%'}}>
                <Box sx={{ p: 1, flexGrow: 1 }}>
                    <Typography style={{ fontSize: '16pt', fontFamily: "Calibri, sans-serif", fontWeight:'bold' }}>{playlist.name}</Typography>
                    <Typography><span style={{fontWeight:'bold'}}>By:</span> {playlist.ownerUsername}</Typography>
                </Box>
                <Box display="flex" justifyContent="flex-end">
                    <KeyboardDoubleArrowDownIcon style={{fontSize:'38px'}}></KeyboardDoubleArrowDownIcon>
                </Box>
            </Box>
            {/* <Box sx={{ p: 1 }}>
                <IconButton onClick={handleToggleEdit} aria-label='edit'>
                    <EditIcon style={{fontSize:'48pt'}} />
                </IconButton>
            </Box>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={(event) => {
                        handleDeleteList(event, playlist._id)
                    }} aria-label='delete'>
                    <DeleteIcon style={{fontSize:'48pt'}} />
                </IconButton>
            </Box> */}
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + playlist._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={playlist.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;