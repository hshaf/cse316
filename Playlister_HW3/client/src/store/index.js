import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction';
import AddSong_Transaction from '../transactions/AddSong_Transaction';
import DeleteSong_Transaction from '../transactions/DeleteSong_Transaction';
import EditSong_Transaction from '../transactions/EditSong_Transaction';
import api from '../api'
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    DELETE_LIST: "DELETE_LIST",
    SELECT_DELETE_LIST: "SELECT_DELETE_LIST",
    SELECT_EDIT_SONG: "SELECT_EDIT_SONG",
    UPDATE_LIST: "UPDATE_LIST"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        selectedDeleteList: null,
        selectedEditSong: 0,
        selectedDeleteSong: 0,
        isModalOpen: false
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    // currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true
                });
            }
            // Select a list to delete
            case GlobalStoreActionType.SELECT_DELETE_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    selectedDeleteList: payload,
                    isModalOpen: true
                });
            }
            // Select a song to delete
            case GlobalStoreActionType.SELECT_EDIT_SONG: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    selectedEditSong: payload.songId
                });
            }
            // Delete a list
            case GlobalStoreActionType.DELETE_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });
            }
            // Update current list
            case GlobalStoreActionType.UPDATE_LIST: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });
            }
            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // ctrl + z/y calls undo/redo
    document.onkeydown = function (event) {
        if (event.ctrlKey) {
            if (event.key === 'z') {
                // if a modal is open, do not allow undo
                if (store.isModalOpen) {
                    console.log('modal open, cannot undo');
                    return;
                }
                store.undo();
            }
            else if (event.key === 'y') {
                // if a modal is open, do not allow redo
                if (store.isModalOpen) {
                    console.log('modal open, cannot redo');
                    return;
                }
                store.redo();
            }
        }
    }

    store.updateToolbarButtons = function () {
        console.log('update toolbar buttons');
        if (store.isModalOpen) {
            store.disableButton("add-list-button");
            store.disableButton("add-song-button");
            store.disableButton("undo-button");
            store.disableButton("redo-button");
            store.disableButton("close-button");
        }

        else {
            if (!store.currentList) {
                store.disableButton("add-song-button");
                store.disableButton("close-button");
            }
            else {
                store.enableButton("add-song-button");
                store.enableButton("close-button");
            }
            if (tps.hasTransactionToUndo()) {
                store.enableButton("undo-button");
            }
            else {
                store.disableButton("undo-button");
            }
            if (tps.hasTransactionToRedo()) {
                store.enableButton("redo-button");
            }
            else {
                store.disableButton("redo-button");
            }
            store.enableButton("add-list-button");
        }
    }

    // This function enables a playlist button  
    store.enableButton = function(id) {
        let button = document.getElementById(id);
        if(button == null) return;
        button.classList.remove("disabled");
        button.disabled = false;
    }

    // This function disables a playlist button
    store.disableButton = function(id) {
        let button = document.getElementById(id);
        if(button == null) return;
        button.classList.add("disabled");
        button.disabled = true;
    }

    // This function adds a new list
    store.createNewList = function () {
        const newPlaylist = {
            name: "Untitled" + store.newListCounter,
            songs: []
        };
        async function asyncCreateNewList() {
            let response = await api.createPlaylist(newPlaylist);
            if (response.data.success) {
                console.log('add list success');

                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.CREATE_NEW_LIST,
                    payload: playlist
                });

                console.log('new playlist object id: ' + playlist._id);
                store.history.push('/playlist/' + playlist._id);
            }
        }
        asyncCreateNewList();
    }

    store.selectDeleteList = function (id) {
        async function asyncSelectDeleteList(id) {
            let playlist = store.idNamePairs.filter(list => list._id === id)[0];
            storeReducer({
                type: GlobalStoreActionType.SELECT_DELETE_LIST,
                payload: playlist
            })
        }
        asyncSelectDeleteList(id);
        store.showDeleteListModal();
    }

    store.showDeleteListModal = function () {
        // store.isModalOpen = true;
        store.updateToolbarButtons();
        let modal = document.getElementById("delete-list-modal");
        modal.classList.add("is-visible");
    }

    store.hideDeleteListModal = function () {
        store.isModalOpen = false;
        store.updateToolbarButtons();
        let modal = document.getElementById("delete-list-modal");
        modal.classList.remove("is-visible");
    }

    // This function deletes a list
    store.deleteList = function () {
        async function asyncDeleteList() {
            let response = await api.deletePlaylist(store.selectedDeleteList._id);
            if (response.data.success) {
                console.log('delete list success');

                storeReducer({
                    type: GlobalStoreActionType.DELETE_LIST,
                });
                store.loadIdNamePairs();
            }
        }
        asyncDeleteList();
        store.hideDeleteListModal();
    }

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        if (!newName) {
            console.log('New playlist name empty, could not change list name');
            return;
        }
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        tps.clearAllTransactions();
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    // This function adds a song to the current list
    store.addSong = function () {
        async function asyncAddSong() {
            let playlist = store.currentList;
            let song = {
                "title": "Untitled",
                "artist": "Unknown",
                "youTubeId": "dQw4w9WgXcQ"
            };

            // Add new song to list
            playlist.songs.push(song);
        }
        asyncAddSong();
        store.updateList();
    }

    // THIS FUNCTION ADDS A MoveSong_Transaction TO THE TRANSACTION STACK
    store.addMoveSongTransaction = function (start, end) {
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }

    store.addAddSongTransaction = function () {
        if (!store.currentList) {
            console.log('no playlist open, could not add song');
            return;
        }
        // if (this.state.isModalOpen) {
        //     console.log('a modal is currently open, cannot add a song');
        //     return;
        // }
        let transaction = new AddSong_Transaction(store);
        tps.addTransaction(transaction);
    }

    // This function moves a song in a list
    store.moveSong = function (start, end) {
        let list = store.currentList;

        // WE NEED TO UPDATE THE STATE FOR THE APP
        if (start < end) {
            let temp = list.songs[start];
            for (let i = start; i < end;) {
                list.songs[i] = list.songs[++i];
            }
            list.songs[end] = temp;
        }
        else if (start > end) {
            let temp = list.songs[start];
            for (let i = start; i > end;) {
                list.songs[i] = list.songs[--i];
            }
            list.songs[end] = temp;
        }
        store.updateList();
    }

    store.selectDeleteSong = function (songId) {
        async function asyncSelectDeleteSong(id) {
            // Set selected delete song id
            store.selectedDeleteSong = id;
        }
        if (!store.currentList) {
            console.log('no list currently open, could not delete song');
            return;
        }
        asyncSelectDeleteSong(songId);
        store.showDeleteSongModal();
    }

    // This function deletes a song in a playlist
    store.deleteSong = function (songId) {
        store.currentList.songs.splice(songId, 1);
        store.updateList();
    }

    // This function restores a song previously deleted from a playlist
    store.restoreSong = function (songId, songTitle, songArtist, songYoutubeId) {
        let song = {
            "title": songTitle,
            "artist": songArtist,
            "youTubeId": songYoutubeId
        };
        store.currentList.songs.splice(songId, 0, song);
        store.updateList();
    }

    store.addDeleteSongTransaction = function (songId) {
        if (!store.currentList) {
            console.log('no playlist open, could not delete song');
            return;
        }
        let transaction = new DeleteSong_Transaction(store, songId);
        tps.addTransaction(transaction);
    }

    store.deleteMarkedSong = function () {
        store.addDeleteSongTransaction(store.selectedDeleteSong);
        store.hideDeleteSongModal();
    }

    store.showDeleteSongModal = function () {
        store.isModalOpen = true;
        store.updateToolbarButtons();
        let modal = document.getElementById("delete-song-modal");
        document.getElementById("delete-song-span").innerHTML = store.currentList.songs[store.selectedDeleteSong].title;
        modal.classList.add("is-visible");
    }

    store.hideDeleteSongModal = function () {
        store.isModalOpen = false;
        store.updateToolbarButtons();
        let modal = document.getElementById("delete-song-modal");
        modal.classList.remove("is-visible");
    }

    store.selectEditSong = function (songId) {
        async function asyncSelectEditSong(id) {
            // Set selected edit song id
            // storeReducer({
            //     type: GlobalStoreActionType.SELECT_EDIT_SONG,
            //     payload: {
            //         songId: id,
            //         playlist: store.currentList
            //     }
            // })
            store.selectedEditSong = id;
        }
        if (!store.currentList) {
            console.log('no list currently open, could not edit song');
            return;
        }
        asyncSelectEditSong(songId);
        store.showEditSongModal();
    }

    store.editMarkedSong = function () {
        let title = document.getElementById("edit-song-title-text").value;
        let artist = document.getElementById("edit-song-artist-text").value;
        let youTubeId = document.getElementById("edit-song-youtube-id-text").value;

        store.addEditSongTransaction(store.selectedEditSong, title, artist, youTubeId);
        store.hideEditSongModal();
    }

    store.addEditSongTransaction = function (songId, songTitle, songArtist, songYoutubeId) {
        let transaction = new EditSong_Transaction(store, songId, songTitle, songArtist, songYoutubeId);
        tps.addTransaction(transaction);
    }

    store.editSong = function (songId, songTitle, songArtist, songYoutubeId) {
        async function asyncEditSong(songId, songTitle, songArtist, songYoutubeId) {
            let song = store.currentList.songs[songId];
            song.title = songTitle;
            song.artist = songArtist;
            song.youTubeId = songYoutubeId;
        }
        if (!store.currentList) {
            console.log('no list currently open, could not add song');
            return;
        }
        asyncEditSong(songId, songTitle, songArtist, songYoutubeId);
        store.updateList();
    }

    store.showEditSongModal = function () {
        store.isModalOpen = true;
        store.updateToolbarButtons();
        let modal = document.getElementById("edit-song-modal");
        if (store.currentList && store.selectedEditSong < store.currentList.songs.length) {
            document.getElementById("edit-song-title-text").value = store.currentList.songs[store.selectedEditSong].title;
            document.getElementById("edit-song-artist-text").value = store.currentList.songs[store.selectedEditSong].artist;
            document.getElementById("edit-song-youtube-id-text").value = store.currentList.songs[store.selectedEditSong].youTubeId;
        }
        modal.classList.add("is-visible");
    }

    store.hideEditSongModal = function () {
        store.isModalOpen = false;
        store.updateToolbarButtons();
        let modal = document.getElementById("edit-song-modal");
        modal.classList.remove("is-visible");
    }

    // This function updates the current list
    store.updateList = function() {
        if (!store.currentList) {
            console.log('no current list opened, could not update list');
            return;
        }
        async function asyncUpdateList(playlist) {
            let response = await api.updatePlaylistById(playlist._id, playlist);
            if (response.data.success) {
                async function getListPairs(playlist) {
                    response = await api.getPlaylistPairs();
                    if (response.data.success) {
                        let pairsArray = response.data.idNamePairs;
                        storeReducer({
                            type: GlobalStoreActionType.UPDATE_LIST,
                            payload: {
                                idNamePairs: pairsArray,
                                playlist: playlist
                            }
                        });
                    }
                }
                getListPairs(playlist);
            }
        }
        asyncUpdateList(store.currentList);
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}