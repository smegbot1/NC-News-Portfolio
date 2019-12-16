import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { removeComment } from '../utils/api';

export default class CommentCard extends Component {
    state = {
        isLoading: false
    };

    handleDelete = async () => {
        if (this.state.isLoading) return;
        this.setState({ isLoading: true })

        try {
            await removeComment(this.props.comment_id);
            this.props.getComments();
        } catch (err) {
            this.setState({ isLoading: false });
            alert('CANNOT REMOVE THIS COMMENT --- CommentCard.jsx Line 23')
        };
    };

    render() {
        const { author, body, created_at, votes, username } = this.props;

        return (
            <div className='commentCard'>
                <div>
                    {(username === author) && <Button className='delButton' onClick={this.handleDelete} variant='outlined' size='small' color="secondary">Delete</Button>}
                </div>
                <h5>{author}</h5>
                <p>{body}</p>
                <p><em>made on {created_at}</em> ---- {votes} Votes</p>
            </div>
        );
    };
};