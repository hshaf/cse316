import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function DeleteSongModal(props) {
    const { store } = useContext(GlobalStoreContext);
    let deleteSongModal = 
        <div 
            className="modal" 
            id="delete-song-modal" 
            data-animation="slideInOutLeft">
                <div className="modal-root" id='delete-song-root'>
                    <div className="modal-north">
                        Delete song?
                    </div>
                    <div className="modal-center">
                        <div className="modal-center-content">
                            Are you sure you wish to permanently remove <span id="delete-song-span"></span> from the playlist?
                        </div>
                    </div>
                    <div className="modal-south">
                        <input type="button" 
                            id="delete-song-confirm-button" 
                            className="modal-button" 
                            onClick={store.deleteMarkedSong}
                            value='Confirm' />
                        <input type="button" 
                            id="delete-song-cancel-button" 
                            className="modal-button" 
                            onClick={store.hideDeleteSongModal}
                            value='Cancel' />
                    </div>
                </div>
        </div>

    return (
        deleteSongModal
    );
}

export default DeleteSongModal;