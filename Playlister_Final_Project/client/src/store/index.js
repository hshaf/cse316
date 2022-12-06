import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from './store-request-api'
import CreateSong_Transaction from '../transactions/CreateSong_Transaction'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction'
import RemoveSong_Transaction from '../transactions/RemoveSong_Transaction'
import UpdateSong_Transaction from '../transactions/UpdateSong_Transaction'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});
console.log("create GlobalStoreContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    SET_IS_EXPANDED_LIST: "SET_IS_EXPANDED_LIST",
    SET_IS_PLAYING_LIST: "SET_IS_PLAYING_LIST",
    REFRESH_STORE: "REFRESH_STORE",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    LOAD_USER_PLAYLISTS: "LOAD_USER_PLAYLISTS",
    LOAD_USER_PLAYLISTS_AFTER_DELETE: "_LOAD_USER_PLAYLISTS_AFTER_DELETE",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    PUBLISH_LIST: "PUBLISH_LIST",
    EDIT_SONG: "EDIT_SONG",
    RESET_STORE: "RESET_STORE",
    REMOVE_SONG: "REMOVE_SONG",
    HIDE_MODALS: "HIDE_MODALS"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

const CurrentModal = {
    NONE : "NONE",
    DELETE_LIST : "DELETE_LIST",
    EDIT_SONG : "EDIT_SONG",
    REMOVE_SONG : "REMOVE_SONG"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentModal : CurrentModal.NONE,
        idNamePairs: [],
        userPlaylists: [],
        currentList: null,
        isExpandedList: false,
        isPlayingList: false,
        currentSongIndex : -1,
        currentSong : null,
        newListCounter: 0,
        listNameActive: false,
        listIdMarkedForDeletion: null,
        listMarkedForDeletion: null
    });
    const history = useHistory();

    console.log("inside useGlobalStore");

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    console.log("auth: " + auth);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    userPlaylists: payload.playlists,
                    currentList: null,
                    isExpandedList: false,
                    isPlayingList: false,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    userPlaylists: store.userPlaylists,
                    currentList: null,
                    isExpandedList: false,
                    isPlayingList: false,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                })
            }
            // Reset store values
            case GlobalStoreActionType.RESET_STORE: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: [],
                    userPlaylists: [],
                    currentList: null,
                    isExpandedList: false,
                    isPlayingList: false,
                    currentSongIndex : -1,
                    currentSong : null,
                    newListCounter: 0,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {                
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    userPlaylists: payload.playlists,
                    currentList: payload.newList,
                    isExpandedList: true,
                    isPlayingList: false,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload,
                    userPlaylists: store.userPlaylists,
                    currentList: null,
                    isExpandedList: store.isExpandedList,
                    isPlayingList: store.isPlayingList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            // Get all of the user's playlists
            case GlobalStoreActionType.LOAD_USER_PLAYLISTS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    userPlaylists: payload,
                    currentList: null,
                    isExpandedList: store.isExpandedList,
                    isPlayingList: store.isPlayingList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            // Get all of the user's playlists after deleting a list
            case GlobalStoreActionType.LOAD_USER_PLAYLISTS_AFTER_DELETE: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    userPlaylists: payload,
                    currentList: null,
                    isExpandedList: false,
                    isPlayingList: false,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    currentModal : CurrentModal.DELETE_LIST,
                    idNamePairs: store.idNamePairs,
                    userPlaylists: store.userPlaylists,
                    currentList: store.currentList,
                    isExpandedList: store.isExpandedList,
                    isPlayingList: store.isPlayingList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: payload.id,
                    listMarkedForDeletion: payload.playlist
                });
            }
            case GlobalStoreActionType.REFRESH_STORE: {
                return setStore({
                    currentModal : store.currentModal,
                    idNamePairs: store.idNamePairs,
                    userPlaylists: store.userPlaylists,
                    currentList: store.currentList,
                    isExpandedList: store.isExpandedList,
                    isPlayingList: store.isPlayingList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    listIdMarkedForDeletion: store.listIdMarkedForDeletion,
                    listMarkedForDeletion: store.listMarkedForDeletion
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    userPlaylists: store.userPlaylists,
                    currentList: payload.playlist,
                    isExpandedList: payload.isExtendList,
                    isPlayingList: payload.isPlayingList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            // Publish a list
            case GlobalStoreActionType.PUBLISH_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    userPlaylists: payload.playlists,
                    currentList: payload.playlist,
                    isExpandedList: payload.isExtendList,
                    isPlayingList: payload.isPlayingList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            // For expanding lists
            case GlobalStoreActionType.SET_IS_EXPANDED_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    userPlaylists: store.userPlaylists,
                    currentList: store.currentList,
                    isExpandedList: payload,
                    isPlayingList: store.isPlayingList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            // For playing lists
            case GlobalStoreActionType.SET_IS_PLAYING_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    userPlaylists: store.userPlaylists,
                    currentList: store.currentList,
                    isExpandedList: store.isExpandedList,
                    isPlayingList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    userPlaylists: store.userPlaylists,
                    currentList: payload,
                    isExpandedList: store.isExpandedList,
                    isPlayingList: store.isPlayingList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            // 
            case GlobalStoreActionType.EDIT_SONG: {
                return setStore({
                    currentModal : CurrentModal.EDIT_SONG,
                    idNamePairs: store.idNamePairs,
                    userPlaylists: store.userPlaylists,
                    currentList: store.currentList,
                    isExpandedList: store.isExpandedList,
                    isPlayingList: store.isPlayingList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            case GlobalStoreActionType.REMOVE_SONG: {
                return setStore({
                    currentModal : CurrentModal.REMOVE_SONG,
                    idNamePairs: store.idNamePairs,
                    userPlaylists: store.userPlaylists,
                    currentList: store.currentList,
                    isExpandedList: store.isExpandedList,
                    isPlayingList: store.isPlayingList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            case GlobalStoreActionType.HIDE_MODALS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    userPlaylists: store.userPlaylists,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    isExpandedList: store.isExpandedList,
                    isPlayingList: store.isPlayingList,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                if (newName.length === 0) {
                    newName = playlist.name;
                }
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function asyncLoadUserPlaylists(playlist) {
                            const response = await api.getPlaylists();
                            if (response.data.success) {
                                let playlists = response.data.data;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        playlist: playlist,
                                        playlists: playlists
                                    }
                                });
                            }
                            else {
                                console.log("API FAILED TO GET THE USER'S PLAYLISTS");
                            }
                        }
                        asyncLoadUserPlaylists(playlist);
                    }
                        // async function getListPairs(playlist) {
                        //     response = await api.getPlaylistPairs();
                        //     if (response.data.success) {
                        //         let pairsArray = response.data.idNamePairs;
                        //         storeReducer({
                        //             type: GlobalStoreActionType.CHANGE_LIST_NAME,
                        //             payload: {
                        //                 idNamePairs: pairsArray,
                        //                 playlist: playlist
                        //             }
                        //         });
                        //         // history.push("/playlist/" + playlist._id);
                        //     }
                        // }
                        // getListPairs(playlist);
                    
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        tps.clearAllTransactions();
        // history.push("/");
    }

    // Function for publishing a list
    store.publishList = function () {
        if (store.currentList) {
            store.currentList.isPublished = true;
            let date = new Date();
            // store.currentList.publishDate = date.toLocaleDateString("en-US");
            store.currentList.publishDate = date;
            // console.log(date);
            
            // Update list and get updated user lists

            async function asyncUpdateCurrentList() {
                const response = await api.updatePlaylistById(store.currentList._id, store.currentList);
                if (response.data.success) {
                    // storeReducer({
                    //     type: GlobalStoreActionType.PUBLISH_LIST,
                    //     payload: {
                    //         playlist: store.currentList,
                    //         isPlayingList: store.isPlayingList,
                    //         isExtendList: store.isExpandedList
                    //     }
                    // });
                    async function asyncLoadUserPlaylists() {
                        const response = await api.getPlaylists();
                        if (response.data.success) {
                            let playlists = response.data.data;
                            storeReducer({
                                type: GlobalStoreActionType.PUBLISH_LIST,
                                payload: {
                                    playlists: playlists,
                                    playlist: store.currentList,
                                    isPlayingList: store.isPlayingList,
                                    isExtendList: store.isExpandedList
                                }
                            });
                        }
                        else {
                            console.log("API FAILED TO GET THE USER'S PLAYLISTS");
                        }
                    }
                    asyncLoadUserPlaylists();
                }
            }
            asyncUpdateCurrentList();

            // End
        }
    }

    // Function for duplicating a playlist
    store.duplicateList = async function () {
        // let newListName = "Untitled" + store.newListCounter;
        // Parameter list is: (newListName, newSongs, userEmail, username, isPublished, publishDate, likes, dislikes, listens, comments)
        const response = await api.createPlaylist(store.currentList.name, store.currentList.songs, auth.user.email, auth.user.username, false, "No publish date", [], [], 0, []);
        console.log("createNewList response: " + response);
        if (response.status === 201) {
            tps.clearAllTransactions();
            let newList = response.data.playlist;
            // storeReducer({
            //     type: GlobalStoreActionType.CREATE_NEW_LIST,
            //     payload: newList
            // }
            // );
            /* LOAD USER LISTS */

            async function asyncLoadUserPlaylists(newList) {
                const response = await api.getPlaylists();
                if (response.data.success) {
                    let playlists = response.data.data;
                    storeReducer({
                        type: GlobalStoreActionType.CREATE_NEW_LIST,
                        payload: {
                            playlists: playlists,
                            newList: newList
                        }
                    });
                }
                else {
                    console.log("API FAILED TO GET THE USER'S PLAYLISTS");
                }
            }
            asyncLoadUserPlaylists(newList);

            /* LOAD USER LISTS */
            
            // store.loadUserPlaylists();

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            // history.push("/playlist/" + newList._id);
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    store.playList = function (id) {
        store.setCurrentList(id);
        storeReducer({
            type: GlobalStoreActionType.SET_IS_PLAYING_LIST,
            payload: true
        });
    }

    store.isListPublished = function () {
        if (store.currentList) {
            return store.currentList.isPublished !== true;
        }
    }

    store.stopPlayingList = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_IS_PLAYING_LIST,
            payload: false
        });
    }

    store.resetStore = function () {
        storeReducer({
            type: GlobalStoreActionType.RESET_STORE
        });
    }

    store.expandList = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_IS_EXPANDED_LIST,
            payload: true
        });
    }

    store.closeExpandList = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_IS_EXPANDED_LIST,
            payload: false
        });
    }

    store.refreshStore = function () {
        storeReducer({
            type: GlobalStoreActionType.REFRESH_STORE
        });
    }

    store.clearTransactions = function() {
        tps.clearAllTransactions();
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        // Parameter list is: (newListName, newSongs, userEmail, username, isPublished, publishDate, likes, dislikes, listens, comments)
        const response = await api.createPlaylist(newListName, [], auth.user.email, auth.user.username, false, "No publish date", [], [], 0, []);
        console.log("createNewList response: " + response);
        if (response.status === 201) {
            tps.clearAllTransactions();
            let newList = response.data.playlist;
            // storeReducer({
            //     type: GlobalStoreActionType.CREATE_NEW_LIST,
            //     payload: newList
            // }
            // );
            /* LOAD USER LISTS */

            async function asyncLoadUserPlaylists(newList) {
                const response = await api.getPlaylists();
                if (response.data.success) {
                    let playlists = response.data.data;
                    storeReducer({
                        type: GlobalStoreActionType.CREATE_NEW_LIST,
                        payload: {
                            playlists: playlists,
                            newList: newList
                        }
                    });
                }
                else {
                    console.log("API FAILED TO GET THE USER'S PLAYLISTS");
                }
            }
            asyncLoadUserPlaylists(newList);

            /* LOAD USER LISTS */
            
            // store.loadUserPlaylists();

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            // history.push("/playlist/" + newList._id);
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
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

    // This function loads the users playlists
    store.loadUserPlaylists = function () {
        async function asyncLoadUserPlaylists() {
            const response = await api.getPlaylists();
            if (response.data.success) {
                let playlists = response.data.data;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_USER_PLAYLISTS,
                    payload: playlists
                });
            }
            else {
                console.log("API FAILED TO GET THE USER'S PLAYLISTS");
            }
        }
        asyncLoadUserPlaylists();
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = function (id) {
        async function getListToDelete(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: {id: id, playlist: playlist}
                });
            }
        }
        getListToDelete(id);
    }
    store.unmarkListForDeletion = function (id) {
        storeReducer({
            type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
            payload: {
                id: null, 
                playlist: null
            }
        });
        store.hideModals();
    }
    store.deleteList = function (id) {
        async function processDelete(id) {
            let response = await api.deletePlaylistById(id);
            if (response.status === 200) {
                // store.loadIdNamePairs();
                // LOAD USER PLAYLISTS

                async function asyncLoadUserPlaylists() {
                    const response = await api.getPlaylists();
                    if (response.data.success) {
                        let playlists = response.data.data;
                        storeReducer({
                            type: GlobalStoreActionType.LOAD_USER_PLAYLISTS_AFTER_DELETE,
                            payload: playlists
                        });
                    }
                    else {
                        console.log("API FAILED TO GET THE USER'S PLAYLISTS");
                    }
                }
                asyncLoadUserPlaylists();

                // LOAD USER PLAYLISTS
                // history.push("/");
            }
        }
        processDelete(id);
    }
    store.deleteMarkedList = function() {
        store.deleteList(store.listIdMarkedForDeletion);
        store.hideModals();
    }

    // ctrl + z/y calls undo/redo
    document.onkeydown = function (event) {
        if (event.ctrlKey) {
            if (event.key === 'z') {
                // if a modal is open, do not allow undo
                if (store.isDeleteListModalOpen() || store.isEditSongModalOpen() || store.isRemoveSongModalOpen()) {
                    console.log('modal open, cannot undo');
                    return;
                }
                store.undo();
            }
            else if (event.key === 'y') {
                // if a modal is open, do not allow redo
                if (store.isDeleteListModalOpen() || store.isEditSongModalOpen() || store.isRemoveSongModalOpen()) {
                    console.log('modal open, cannot redo');
                    return;
                }
                store.redo();
            }
        }
    }
    // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
    // TO SEE IF THEY REALLY WANT TO DELETE THE LIST

    store.showEditSongModal = (songIndex, songToEdit) => {
        storeReducer({
            type: GlobalStoreActionType.EDIT_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToEdit}
        });        
    }
    store.showRemoveSongModal = (songIndex, songToRemove) => {
        storeReducer({
            type: GlobalStoreActionType.REMOVE_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToRemove}
        });        
    }
    store.hideModals = () => {
        storeReducer({
            type: GlobalStoreActionType.HIDE_MODALS,
            payload: {}
        });    
    }
    store.isDeleteListModalOpen = () => {
        return store.currentModal === CurrentModal.DELETE_LIST;
    }
    store.isEditSongModalOpen = () => {
        return store.currentModal === CurrentModal.EDIT_SONG;
    }
    store.isRemoveSongModalOpen = () => {
        return store.currentModal === CurrentModal.REMOVE_SONG;
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = function (id, isPlayingList, isExtendList) {
        async function asyncSetCurrentList(id, isPlayingList, isExtendList) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                response = await api.updatePlaylistById(playlist._id, playlist);
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: {
                            playlist: playlist,
                            isExtendList: isExtendList,
                            isPlayingList: isPlayingList
                        }
                    });
                    // history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id, isPlayingList, isExtendList);
    }

    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.addNewSong = function() {
        let index = this.getPlaylistSize();
        this.addCreateSongTransaction(index, "Untitled", "?", "dQw4w9WgXcQ");
    }
    // THIS FUNCTION CREATES A NEW SONG IN THE CURRENT LIST
    // USING THE PROVIDED DATA AND PUTS THIS SONG AT INDEX
    store.createSong = function(index, song) {
        let list = store.currentList;      
        list.songs.splice(index, 0, song);
        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
    // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
    store.moveSong = function(start, end) {
        let list = store.currentList;

        // WE NEED TO UPDATE THE STATE FOR THE APP
        if (start < end) {
            let temp = list.songs[start];
            for (let i = start; i < end; i++) {
                list.songs[i] = list.songs[i + 1];
            }
            list.songs[end] = temp;
        }
        else if (start > end) {
            let temp = list.songs[start];
            for (let i = start; i > end; i--) {
                list.songs[i] = list.songs[i - 1];
            }
            list.songs[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION REMOVES THE SONG AT THE index LOCATION
    // FROM THE CURRENT LIST
    store.removeSong = function(index) {
        let list = store.currentList;      
        list.songs.splice(index, 1); 

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION UPDATES THE TEXT IN THE ITEM AT index TO text
    store.updateSong = function(index, songData) {
        let list = store.currentList;
        let song = list.songs[index];
        song.title = songData.title;
        song.artist = songData.artist;
        song.youTubeId = songData.youTubeId;

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    store.addNewSong = () => {
        let playlistSize = store.getPlaylistSize();
        store.addCreateSongTransaction(
            playlistSize, "Untitled", "?", "dQw4w9WgXcQ");
    }
    // THIS FUNCDTION ADDS A CreateSong_Transaction TO THE TRANSACTION STACK
    store.addCreateSongTransaction = (index, title, artist, youTubeId) => {
        // ADD A SONG ITEM AND ITS NUMBER
        let song = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        let transaction = new CreateSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }    
    store.addMoveSongTransaction = function (start, end) {
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }
    // THIS FUNCTION ADDS A RemoveSong_Transaction TO THE TRANSACTION STACK
    store.addRemoveSongTransaction = () => {
        let index = store.currentSongIndex;
        let song = store.currentList.songs[index];
        let transaction = new RemoveSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }
    store.addUpdateSongTransaction = function (index, newSongData) {
        let song = store.currentList.songs[index];
        let oldSongData = {
            title: song.title,
            artist: song.artist,
            youTubeId: song.youTubeId
        };
        let transaction = new UpdateSong_Transaction(this, index, oldSongData, newSongData);        
        tps.addTransaction(transaction);
    }
    store.updateCurrentList = function() {
        async function asyncUpdateCurrentList() {
            const response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: {
                        playlist: store.currentList,
                        isPlayingList: store.isPlayingList,
                        isExtendList: store.isExpandedList
                    }
                });
            }
        }
        asyncUpdateCurrentList();
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }
    store.canAddNewSong = function() {
        return (store.currentList !== null);
    }
    store.canUndo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToUndo());
    }
    store.canRedo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToRedo());
    }
    store.canClose = function() {
        return (store.currentList !== null);
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };