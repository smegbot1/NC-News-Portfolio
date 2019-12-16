import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { removeComment } from '../utils/api';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


const CommentCard = ({ comment_id, author, body, created_at, votes, username, getComments }) => {
    const classes = useStyles();

    const handleDelete = async () => {
        try {
            await removeComment(comment_id);
            getComments();
        } catch (err) {
            Window.alert('CANNOT REMOVE THIS COMMENT --- CommentCard.jsx Line 23')
        };
    };

    return (
        <div className='commentCard'>
            <div className={classes.root}>
                {(username === author) && <Button onClick={handleDelete} variant='outlined' size='small' color="secondary">Delete</Button>}
            </div>
            <h5>{author}</h5>
            <p>{body}</p>
            <p><em>made on {created_at}</em> ---- {votes} Votes</p>
        </div>
    );
};

export default CommentCard;