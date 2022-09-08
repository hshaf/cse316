import jsTPS_Transaction from "../../common/jsTPS.js"
/**
 * AddSong_Transaction
 * 
 * This class represents a transaction that works with adding
 * songs to a playlist. It will be managed by the transaction stack.
 * 
 */
export default class AddSong_Transaction extends jsTPS_Transaction {
    constructor(initModel) {
        super();
        this.model = initModel;
    }

    doTransaction() {
        this.model.addSong();
        this.newSongId = this.model.getPlaylistSize() - 1;
    }
    
    undoTransaction() {
        this.model.deleteSong(this.newSongId);
    }
}