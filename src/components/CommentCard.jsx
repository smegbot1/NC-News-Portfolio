import React from 'react';

const CommentCard = ({ author, body, comment_id, created_at, votes }) => {
    return (
        <div className='commentCard'>
            <h5>{author}</h5>
            <p>{body}</p>
            <p><em>made on {created_at}</em> ---- {votes} Votes</p>
        </div>
    );
};

export default CommentCard;