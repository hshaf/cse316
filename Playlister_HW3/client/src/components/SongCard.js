import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);

    const { song, index } = props;

    const [state, setState] = useState({
        isDragging: false,
        draggedTo: false
    });

    function handleDragStart(event) {
        event.dataTransfer.setData("song", event.target.id);
        setState(prevState => ({
            isDragging: true,
            draggedTo: prevState.draggedTo
        }));
    }
    function handleDragOver(event) {
        event.preventDefault();
        setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    function handleDragEnter(event) {
        event.preventDefault();
        setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    function handleDragLeave(event) {
        event.preventDefault();
        setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: false
        }));
    }
    function handleDrop(event) {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        // Get target song card number
        targetId = targetId.substring(0, targetId.indexOf("-"));
        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        // Get source song card number
        sourceId = sourceId.substring(0, sourceId.indexOf("-"));
        
        setState(prevState => ({
            isDragging: false,
            draggedTo: false
        }));

        // ASK THE MODEL TO MOVE THE DATA
        console.log('source id=' + sourceId + ' to target id=' + targetId);
        store.addMoveSongTransaction(sourceId, targetId);
    }
    function handleEditSong(event) {
        event.stopPropagation();
        store.selectEditSong(index);
    }

    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onDoubleClick={handleEditSong}
            draggable="true"
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={'remove-' + index + '-song'}
                className="list-card-button"
                value={"\u2715"}
            />
        </div>
    );
}

export default SongCard;