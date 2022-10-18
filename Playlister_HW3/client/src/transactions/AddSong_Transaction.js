import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * AddSong_Transaction
 * 
 * This class represents a transaction that works with
 * adding songs. It will be managed by the transaction stack.
 */
export default class AddSong_Transaction extends jsTPS_Transaction {
    constructor(store) {
        super();
        this.store = store;
    }

    doTransaction() {
        this.store.addSong();
        this.newSongId = this.store.currentList.songs.length - 1;
    }
    
    undoTransaction() {
        this.store.deleteSong(this.newSongId);
    }
}