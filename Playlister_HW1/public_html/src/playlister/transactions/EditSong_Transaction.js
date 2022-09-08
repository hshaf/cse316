import jsTPS_Transaction from "../../common/jsTPS.js"
/**
 * EditSong_Transaction
 * 
 * This class represents a transaction that works with editing a
 * song in a playlist. It will be managed by the transaction stack.
 * 
 */
export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(initModel, songId, songTitle, songArtist, songYoutubeId) {
        super();
        this.model = initModel;
        this.songId = songId;
        this.newSongTitle = songTitle;
        this.newSongArtist = songArtist;
        this.newSongYoutubeId = songYoutubeId;

        let currentSong = this.model.getSong(songId);
        this.oldSongTitle = currentSong.title;
        this.oldSongArtist = currentSong.artist;
        this.oldSongYoutubeId = currentSong.youTubeId;
    }

    doTransaction() {
        this.model.editSong(this.songId, this.newSongTitle, this.newSongArtist, this.newSongYoutubeId);
    }
    
    undoTransaction() {
        this.model.editSong(this.songId, this.oldSongTitle, this.oldSongArtist, this.oldSongYoutubeId);
    }
}