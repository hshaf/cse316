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
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import { WorkspaceScreen } from '.';
import { EditToolbar } from '.';
import { PublishToolbar } from '.';
import { PublishWorkspaceScreen } from '.';

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
            // store.setCurrentList(id, true, false);
            store.setCurrentListAndIncrement(id, true, false);
        }
    }

    function handleClick(event, id) {
        if (event.detail === 1) {
            handleLoadList(event, id);
        }
        else if (event.detail === 2) {
            if (!store.currentList.isPublished) {
                handleToggleEdit(event);
            }
        }
    }

    function handleExpandList(event) {
        event.stopPropagation();
        store.clearTransactions();

        if (store.currentList && store.currentList._id !== playlist._id) {
            store.setCurrentList(playlist._id, false, true);
        }
        else {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(playlist._id, store.isPlayingList, true);
        }
    }

    function handleCloseExpandList(event) {
        event.stopPropagation();
        store.clearTransactions();

        // No longer in edit mode
        store.setCurrentList(playlist._id, store.isPlayingList, false);
    }

    function handleLike(event) {
        event.stopPropagation();
        store.likeList(playlist._id);
    }

    function handleDislike(event) {
        event.stopPropagation();
        store.dislikeList(playlist._id);
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
    // Color for cards that haven't been published
    let cardbgcolor = '#F6F6E6';
    if (playlist.isPublished) {
        // Color for cards that have been published
        cardbgcolor = '#C4BEEE';
    }
    if (selected) {
        // Color for cards that are selected
        cardbgcolor = '#DAB810';
    }
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
    let monthPublished = "";
    let dayPublished = "";
    let yearPublished = "";

    if (playlist.datePublished !== "No publish date") {
        const D = new Date(playlist.publishDate);
        monthPublished = monthNames[D.getMonth()];
        dayPublished = D.getDate();
        yearPublished = D.getFullYear();
    }
    let cardElement =
        <ListItem
            id={playlist._id}
            key={playlist._id}
            sx={{ bgcolor:cardbgcolor, marginLeft:'10px', marginTop: '13px', marginBottom:'2px', display: 'flex', p: 1, borderRadius:'15px', outline:'2px solid black', ":hover":{bgcolor:cardbgcolor} }}
            style={{ height:'100px', width:'100%' }}
            button
            onClick={(event) => {
                handleClick(event, playlist._id)
                // handleLoadList(event, playlist._id)
            }}
        >
            <Box style={{width:'100%'}}>
                <Box style={{paddingTop:'0px',paddingBottom:'0px'}}sx={{ p: 1, flexGrow: 1 }}>
                    <Typography style={{ fontSize: '16pt', fontFamily: "Calibri, sans-serif", fontWeight:'bold' }}>{playlist.name}</Typography>
                    <Typography><span style={{fontWeight:'bold'}}>By:</span> {playlist.ownerUsername}</Typography>
                </Box>
                <Box display="flex" justifyContent="flex-end">
                    <IconButton onClick={(event)=>{handleExpandList(event)}} style={{padding:'0px', color:'black' ,marginRight:'15px'}}><KeyboardDoubleArrowDownIcon style={{fontSize:'38px'}}></KeyboardDoubleArrowDownIcon></IconButton>
                </Box>
            </Box>
        </ListItem>
    if (playlist.isPublished) {
        cardElement =
        <ListItem
            id={playlist._id}
            key={playlist._id}
            sx={{ bgcolor:cardbgcolor, marginLeft:'10px', marginTop: '13px', marginBottom:'2px', display: 'flex', p: 1, borderRadius:'15px', outline:'2px solid black', ":hover":{bgcolor:cardbgcolor} }}
            style={{ height:'100px', width:'100%' }}
            button
            onClick={(event) => {
                handleClick(event, playlist._id)
                // handleLoadList(event, playlist._id)
            }}
        >
            <Box style={{width:'100%'}}>
                <Box display="flex">
                    <Box style={{paddingTop:'0px',paddingBottom:'0px'}}sx={{ p: 1, flexGrow: 1 }}>
                        <Typography style={{ fontSize: '16pt', fontFamily: "Calibri, sans-serif", fontWeight:'bold' }}>{playlist.name}</Typography>
                        <Typography><span style={{fontWeight:'bold'}}>By:</span> {playlist.ownerUsername}</Typography>
                    </Box>
                    <Box display="flex" justifyContent='center' alignItems='center' style={{marginRight:'50px'}}>
                        <IconButton onClick={(event)=>{handleLike(event)}}><ThumbUpAltOutlinedIcon style={{fontSize:'35px'}}></ThumbUpAltOutlinedIcon></IconButton>
                        <Typography style={{paddingRight:'15px'}}>{playlist.likes.length}</Typography>
                        <IconButton onClick={(event)=>{handleDislike(event)}}><ThumbDownAltOutlinedIcon style={{fontSize:'35px'}}></ThumbDownAltOutlinedIcon></IconButton>
                        <Typography style={{paddingRight:'15px'}}>{playlist.dislikes.length}</Typography>
                    </Box>
                </Box>
                <Box display="flex">
                    <Box style={{paddingTop:'0px',paddingBottom:'0px'}}sx={{ p: 1, flexGrow: 1 }}>
                        <Typography style={{paddingTop:'10px',fontSize:'12px',color:'green'}}><span style={{color:'black',fontWeight:'bold'}}>Published:</span> {monthPublished} {dayPublished}, {yearPublished}</Typography>
                    </Box>
                    <Box display="flex">
                        <Box>
                            <Typography style={{marginRight:'80px', paddingTop:'10px',fontSize:'12px',color:'red'}}><span style={{color:'black',fontWeight:'bold'}}>Listens:</span> {playlist.listens}</Typography>
                        </Box>
                        <Box>
                            <IconButton onClick={(event)=>{handleExpandList(event)}} style={{padding:'0px', color:'black' ,marginRight:'15px'}}><KeyboardDoubleArrowDownIcon style={{fontSize:'38px'}}></KeyboardDoubleArrowDownIcon></IconButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </ListItem>
    }
    if (store.currentList && store.isExpandedList && playlist._id === store.currentList._id && !playlist.isPublished) {
        cardElement =
        <ListItem
            id={playlist._id}
            key={playlist._id}
            sx={{ bgcolor:cardbgcolor, marginLeft:'10px', marginTop: '13px', marginBottom:'2px', display: 'flex', p: 1, borderRadius:'15px', outline:'2px solid black', ":hover":{bgcolor:cardbgcolor} }}
            style={{ height:'475px', width:'100%' }}
        >
            <Box style={{width:'100%'}}>
                <Box style={{paddingTop:'0px',paddingBottom:'0px'}}sx={{ p: 1, flexGrow: 1 }}>
                    <Typography style={{ fontSize: '16pt', fontFamily: "Calibri, sans-serif", fontWeight:'bold' }}>{playlist.name}</Typography>
                    <Typography><span style={{fontWeight:'bold'}}>By:</span> {playlist.ownerUsername}</Typography>
                </Box>
                <Box id="song-card-selector">
                    <WorkspaceScreen />
                </Box>
                <Box style={{marginTop:'10px'}} display="flex" flexDirection="column">
                    <Box>
                        <EditToolbar />
                    </Box>
                    <Box display="flex" justifyContent="flex-end">
                        <IconButton onClick={(event)=>{handleCloseExpandList(event)}} style={{padding:'0px', color:'black' ,marginRight:'15px'}}><KeyboardDoubleArrowUpIcon style={{fontSize:'38px'}}></KeyboardDoubleArrowUpIcon></IconButton>
                    </Box>
                </Box>
            </Box>
        </ListItem>
    }
    if (store.currentList && store.isExpandedList && playlist._id === store.currentList._id && playlist.isPublished) {
        cardElement =
        <ListItem
            id={playlist._id}
            key={playlist._id}
            sx={{ bgcolor:cardbgcolor, marginLeft:'10px', marginTop: '13px', marginBottom:'2px', display: 'flex', p: 1, borderRadius:'15px', outline:'2px solid black', ":hover":{bgcolor:cardbgcolor} }}
            style={{ height:'475px', width:'100%' }}
        >
            <Box style={{width:'100%'}}>
                <Box display="flex">
                    <Box style={{paddingTop:'0px',paddingBottom:'0px'}}sx={{ p: 1, flexGrow: 1 }}>
                        <Typography style={{ fontSize: '16pt', fontFamily: "Calibri, sans-serif", fontWeight:'bold' }}>{playlist.name}</Typography>
                        <Typography><span style={{fontWeight:'bold'}}>By:</span> {playlist.ownerUsername}</Typography>
                    </Box>
                    <Box display="flex" justifyContent='center' alignItems='center' style={{marginRight:'50px'}}>
                        <IconButton onClick={(event)=>{handleLike(event)}}><ThumbUpAltOutlinedIcon style={{fontSize:'35px'}}></ThumbUpAltOutlinedIcon></IconButton>
                        <Typography style={{paddingRight:'15px'}}>{playlist.likes.length}</Typography>
                        <IconButton onClick={(event)=>{handleDislike(event)}}><ThumbDownAltOutlinedIcon style={{fontSize:'35px'}}></ThumbDownAltOutlinedIcon></IconButton>
                        <Typography style={{paddingRight:'15px'}}>{playlist.dislikes.length}</Typography>
                    </Box>
                </Box>
                <Box id="song-card-selector">
                    <PublishWorkspaceScreen />
                </Box>
                <Box style={{marginTop:'10px'}} display="flex" flexDirection="column">
                    <Box>
                        <PublishToolbar />
                    </Box>
                    {/* <Box display="flex" justifyContent="flex-end">
                        <IconButton onClick={(event)=>{handleCloseExpandList(event)}} style={{padding:'0px', color:'black' ,marginRight:'15px'}}><KeyboardDoubleArrowUpIcon style={{fontSize:'38px'}}></KeyboardDoubleArrowUpIcon></IconButton>
                    </Box> */}
                    <Box display="flex">
                    <Box style={{paddingTop:'0px',paddingBottom:'0px'}}sx={{ p: 1, flexGrow: 1 }}>
                        <Typography style={{paddingTop:'10px',fontSize:'12px',color:'green'}}><span style={{color:'black',fontWeight:'bold'}}>Published:</span> {monthPublished} {dayPublished}, {yearPublished}</Typography>
                    </Box>
                    <Box display="flex">
                        <Box>
                            <Typography style={{marginRight:'80px', paddingTop:'10px',fontSize:'12px',color:'red'}}><span style={{color:'black',fontWeight:'bold'}}>Listens:</span> {playlist.listens}</Typography>
                        </Box>
                        <Box>
                            <IconButton onClick={(event)=>{handleCloseExpandList(event)}} style={{padding:'0px', color:'black' ,marginRight:'15px'}}><KeyboardDoubleArrowUpIcon style={{fontSize:'38px'}}></KeyboardDoubleArrowUpIcon></IconButton>
                        </Box>
                    </Box>
                    </Box>
                </Box>
            </Box>
        </ListItem>
    }
    if (editActive) {
        cardElement =
        <ListItem
            id={playlist._id}
            key={playlist._id}
            sx={{ bgcolor:cardbgcolor, marginLeft:'10px', marginTop: '13px', marginBottom:'2px', display: 'flex', p: 1, borderRadius:'15px', outline:'2px solid black', ":hover":{bgcolor:cardbgcolor} }}
            style={{ height:'100px', width:'100%' }}
        >
            <TextField
                // margin="normal"
                required
                fullWidth
                id={"list-" + playlist._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                // className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={playlist.name}
                inputProps={{style: {fontSize: 30}}}
                InputLabelProps={{style: {fontSize: 18}}}
                autoFocus
                onBlur={toggleEdit}
            />
        </ListItem>
    }
    return (
        cardElement
    );
}

export default ListCard;