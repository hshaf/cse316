import jsTPS_Transaction from "../../common/jsTPS.js"
/**
 * RemoveSong_Transaction
 * 
 * This class represents a transaction that works with removing
 * songs from a playlist. It will be managed by the transaction stack.
 * 
 */
export default class RemoveSong_Transaction extends jsTPS_Transaction {
    constructor(initModel, songId) {
        super();
        this.model = initModel;
        this.deleteSongId = songId;

        let currentSong = this.model.getSong(songId);
        this.oldSongTitle = currentSong.title;
        this.oldSongArtist = currentSong.artist;
        this.oldSongYoutubeId = currentSong.youTubeId;
    }

    doTransaction() {
        this.model.deleteSong(this.deleteSongId);
    }
    
    undoTransaction() {
        this.model.restoreSong(this.deleteSongId, this.oldSongTitle, this.oldSongArtist, this.oldSongYoutubeId);
    }
}