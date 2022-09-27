import React, { Component } from 'react';

export default class EditSongModal extends Component {
    render() {
        const { editSongCallback,
                hideEditSongModalCallback } = this.props;
        return (
            <div 
                className="modal" 
                id="edit-song-modal" 
                data-animation="slideInOutLeft">
                    <div className="modal-root" id='edit-song-root'>
                        <div className="modal-north">
                            Edit Song
                        </div>
                        <div className="edit-song-flex-container">
                            <div className="edit-song-flex-left">
                                <label htmlFor="edit-song-title-text">Title:</label>
                                <br />
                                <label htmlFor="edit-song-artist-text">Artist:</label>
                                <br />
                                <label htmlFor="edit-song-youtube-id-text">YouTube Id:</label>
                            </div>
                            <div className="edit-song-flex-right">
                                <input type="text" id="edit-song-title-text" />
                                <br />
                                <input type="text" id="edit-song-artist-text" />
                                <br />
                                <input type="text" id="edit-song-youtube-id-text" />
                            </div>
                        </div>                
                        <div className="modal-south">
                            <input type="button" 
                                id="edit-song-confirm-button" 
                                className="modal-button" 
                                onClick={editSongCallback}
                                value='Confirm' />
                            <input type="button" 
                                id="edit-song-cancel-button" 
                                className="modal-button" 
                                onClick={hideEditSongModalCallback}
                                value='Cancel' />
                        </div>
                    </div>
            </div>
        );
    }
}