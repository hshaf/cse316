import React from 'react';
import YouTube from 'react-youtube';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

export default function PlaylisterYouTubePlayer(props) {
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT
    const { songs } = props;
    const { store } = useContext(GlobalStoreContext);

    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    let playlist = songs;

    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    let currentSong = 0;

    let currrentPlaylistText = <Typography id="current-playlist-text" fontSize='14px' fontWeight='bold'>Playlist: </Typography>
    let currentSongText = <Typography id="current-song-text" fontSize='14px' fontWeight='bold'>Song #: </Typography>
    let currentSongTitleText = <Typography id="current-song-title-text" fontSize='14px' fontWeight='bold'>Title: </Typography>
    let currentSongArtistText = <Typography id="current-song-artist-text" fontSize='14px' fontWeight='bold'>Artist: </Typography>

    const playerOptions = {
        height: '280vh',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    let ytplayer = null;

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        let song = playlist[currentSong];
        player.loadVideoById(song);
        player.playVideo();

        // let currrentPlaylistText = <Typography id="current-playlist-text" fontSize='14px' fontWeight='bold'>Playlist: </Typography>
        // let currentSongText = <Typography id="current-song-text" fontSize='14px' fontWeight='bold'>Song #: </Typography>
        // let currentSongTitleText = <Typography id="current-song-title-text" fontSize='14px' fontWeight='bold'>Title: </Typography>
        // let currentSongArtistText = <Typography id="current-song-artist-text" fontSize='14px' fontWeight='bold'>Artist: </Typography>
        
        if (store.currentList.songs.length > 0) {
            // Update playlist info box below player
            // currrentPlaylistText = <Typography id="current-playlist-text" fontSize='14px' fontWeight='bold'>Playlist: {store.currentList.name}</Typography>
            document.getElementById("current-playlist-text").innerHTML = 'Playlist: ' + store.currentList.name;
            // currentSongText = <Typography id="current-song-text" fontSize='14px' fontWeight='bold'>Song #: {((currentSong % playlist.length) + 1)}</Typography>
            document.getElementById("current-song-text").innerHTML = 'Song #: ' + ((currentSong % playlist.length) + 1);
            // currentSongTitleText = <Typography id="current-song-title-text" fontSize='14px' fontWeight='bold'>Title: {store.currentList.songs[currentSong].title}</Typography>
            document.getElementById("current-song-title-text").innerHTML = 'Title: ' + store.currentList.songs[currentSong].title;
            // currentSongArtistText = <Typography id="current-song-artist-text" fontSize='14px' fontWeight='bold'>Artist: {store.currentList.songs[currentSong].artist}</Typography>
            document.getElementById("current-song-artist-text").innerHTML = 'Artist: ' + store.currentList.songs[currentSong].artist;
        }
        else {
            currrentPlaylistText = <Typography id="current-playlist-text" fontSize='14px' fontWeight='bold'>Playlist: </Typography>
            currentSongText = <Typography id="current-song-text" fontSize='14px' fontWeight='bold'>Song #: </Typography>
            currentSongTitleText = <Typography id="current-song-title-text" fontSize='14px' fontWeight='bold'>Title: </Typography>
            currentSongArtistText = <Typography id="current-song-artist-text" fontSize='14px' fontWeight='bold'>Artist: </Typography>
        }
    }

    // Using this because % in JavaScript isn't the modulo operator
    function mod(n, m) {
        return ((n % m) + m) % m;
    }      

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        currentSong++;
        // currentSong = currentSong % playlist.length;
        currentSong = mod(currentSong, playlist.length);
    }

    function decSong() {
        currentSong--;
        // currentSong = currentSong % playlist.length;
        currentSong = mod(currentSong, playlist.length);
    }

    function onPlayerReady(event) {
        ytplayer = event.target;
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
    }

    function handleSkipPrevious() {
        if (ytplayer) {
            decSong();
            loadAndPlayCurrentSong(ytplayer);
        }
        else {
            console.log('ytplayer null')
        }
    }

    function handleSkipNext() {
        if (ytplayer) {
            incSong();
            loadAndPlayCurrentSong(ytplayer);
        }
    }

    function handlePlay() {
        if (ytplayer) {
            ytplayer.playVideo();
        }
    }

    function handleStop() {
        if (ytplayer) {
            ytplayer.pauseVideo();
        }
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }

    return (
        <Box id="youtube-player">
            <Box bgcolor='black'>
                <YouTube
                    videoId={playlist[currentSong]}
                    opts={playerOptions}
                    onReady={onPlayerReady}
                    onStateChange={onPlayerStateChange} />
            </Box>
            <Box style={{borderRadius:'10px'}} bgcolor='#C4BEEE' id="player-info-and-buttons">
                <Box display="flex" justifyContent="center">
                    <Typography fontWeight='bold'>Now Playing</Typography>
                </Box>
                <Box style={{minHeight:'85px', maxHeight:'85px'}} marginLeft='10px'>
                    {currrentPlaylistText}
                    {currentSongText}
                    {currentSongTitleText}
                    {currentSongArtistText}
                </Box>
                <Box display="flex" justifyContent="center">
                    <Box display="flex" justifyContent="center" style={{minWidth:'350px',maxWidth:'350px',minHeight:'30px',maxHeight:'30px',border:'2px solid black',borderRadius:'10px'}} bgcolor='#F6F6E6'>
                        <IconButton onClick={handleSkipPrevious}><SkipPreviousIcon style={{color:'black', fontSize:'28px'}}></SkipPreviousIcon></IconButton>
                        <IconButton onClick={handleStop}><StopIcon style={{color:'black', fontSize:'28px'}}></StopIcon></IconButton>
                        <IconButton onClick={handlePlay}><PlayArrowIcon style={{color:'black', fontSize:'28px'}}></PlayArrowIcon></IconButton>
                        <IconButton onClick={handleSkipNext}><SkipNextIcon style={{color:'black', fontSize:'28px'}}></SkipNextIcon></IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}