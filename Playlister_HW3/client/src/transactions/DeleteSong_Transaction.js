import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * DeleteSong_Transaction
 * 
 * This class represents a transaction that works with song
 * deletion. It will be managed by the transaction stack.
 */
export default class DeleteSong_Transaction extends jsTPS_Transaction {
    constructor(store, songId) {
        super();
        this.store = store;
        this.deleteSongId = songId;

        let currentSong = this.store.currentList.songs[this.deleteSongId];
        this.oldSongTitle = currentSong.title;
        this.oldSongArtist = currentSong.artist;
        this.oldSongYoutubeId = currentSong.youTubeId;
    }

    doTransaction() {
        this.store.deleteSong(this.deleteSongId);
    }
    
    undoTransaction() {
        this.store.restoreSong(this.deleteSongId, this.oldSongTitle, this.oldSongArtist, this.oldSongYoutubeId);
    }
}