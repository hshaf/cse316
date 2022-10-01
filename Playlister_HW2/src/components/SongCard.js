import React from "react";

export default class SongCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDragging: false,
            draggedTo: false,
            isSelected: false
        }
    }
    handleDragStart = (event) => {
        console.log('handle drag start');
        event.dataTransfer.setData("song", event.target.id);
        this.setState(prevState => ({
            isDragging: true,
            draggedTo: prevState.draggedTo,
            isSelected: true
        }));
    }
    handleDragOver = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    handleDragEnter = (event) => {
        console.log('handle drag enter');
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    handleDragLeave = (event) => {
        console.log('handle drag leave');
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: false
        }));
    }
    handleDrop = (event) => {
        console.log('drop reached');
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        
        this.setState(prevState => ({
            isDragging: false,
            draggedTo: false,
            isSelected: false
        }));

        // ASK THE MODEL TO MOVE THE DATA
        if (targetId) {this.props.moveCallback(sourceId, targetId);}
    }
    handleDragEnd = (event) => {
        console.log('handle drag end');
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: false,
            draggedTo: false,
            isSelected: false
        }));
    }
    handleClick = (event) => {
        if (event.detail === 2) {
            this.handleEditSong(event);
        }
    }
    handleEditSong = (event) => {
        event.stopPropagation();
        this.props.editSongCallback(this.getItemNum() - 1);
    }
    handleDeleteSong = (event) => {
        event.stopPropagation();
        this.props.deleteSongCallback(this.getItemNum() - 1);
    }

    getItemNum = () => {
        return this.props.id.substring("playlist-song-".length);
    }

    render() {
        const { song } = this.props;
        let num = this.getItemNum();
        console.log("num: " + num);
        let youtubeLink = "https://www.youtube.com/watch?v=" + song.youTubeId;
        let itemClass = "playlister-song";
        if (this.state.draggedTo) {
            itemClass = "playlister-song-dragged-to";
        }
        if (this.state.isSelected) {
            itemClass += " song-card-selected";
        }
        return (
            <div
                id={'song-' + num}
                className={itemClass}
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
                onDrop={this.handleDrop}
                onDragEnd={this.handleDragEnd}
                onClick={this.handleClick}
                draggable="true"
            >
                {num}. <a href={youtubeLink}>{song.title} by {song.artist}</a>
                <input
                        type="button"
                        id={"delete-song-" + num}
                        className="list-card-button"
                        onClick={this.handleDeleteSong}
                        value={"X"} />
            </div>
        )
    }
}