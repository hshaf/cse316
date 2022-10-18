import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * EditSong_Transaction
 * 
 * This class represents a transaction that works with song
 * editing. It will be managed by the transaction stack.
 */
export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(store, songId, songTitle, songArtist, songYoutubeId) {
        super();
        this.store = store;
        this.songId = songId;
        this.newSongTitle = songTitle;
        this.newSongArtist = songArtist;
        this.newSongYoutubeId = songYoutubeId;

        let currentSong = this.store.currentList.songs[this.songId];
        this.oldSongTitle = currentSong.title;
        this.oldSongArtist = currentSong.artist;
        this.oldSongYoutubeId = currentSong.youTubeId;
    }

    doTransaction() {
        this.store.editSong(this.songId, this.newSongTitle, this.newSongArtist, this.newSongYoutubeId);
    }
    
    undoTransaction() {
        this.store.editSong(this.songId, this.oldSongTitle, this.oldSongArtist, this.oldSongYoutubeId);
    }
}