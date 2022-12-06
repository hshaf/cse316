import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'

function CommentCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ draggedTo, setDraggedTo ] = useState(0);
    const { username, comment, index } = props;

    let cardClass = "comment-card unselected-comment-card";
    return (
        <div
            key={index}
            id={'comment-' + index + '-card'}
            className={cardClass}
        >
            <Typography style={{fontWeight:'bold'}} paddingBottom='10px'>{username}</Typography>
            <Typography>{comment}</Typography>
        </div>
    );
}

export default CommentCard;