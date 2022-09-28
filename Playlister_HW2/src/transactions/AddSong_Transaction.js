import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * AddSong_Transaction
 * 
 * This class represents a transaction that works with
 * adding songs. It will be managed by the transaction stack.
 */
export default class AddSong_Transaction extends jsTPS_Transaction {
    constructor(initApp) {
        super();
        this.app = initApp;
    }

    doTransaction() {
        this.app.addSong();
        this.newSongId = this.app.state.currentList.songs.length - 1;
    }
    
    undoTransaction() {
        this.app.deleteSong(this.newSongId);
    }
}