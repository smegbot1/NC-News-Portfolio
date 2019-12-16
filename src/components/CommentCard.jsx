import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import { removeComment } from '../utils/api';
import Loader from './Loader';
import ErrDisplayer from './ErrDisplayer';

export default class CommentCard extends Component {
    state = {
        isLoading: false,
        err: ''
    };

    handleDelete = async () => {
        if (this.state.isLoading) return;
        this.setState({ isLoading: true });

        try {
            await removeComment(this.props.comment_id);
            this.props.getComments();
        } catch (err) {
            this.setState({ err: err.msg, isLoading: false });
        };
    };

    render() {
        const { author, body, created_at, votes, username } = this.props;
        const { isLoading, err } = this.state;

        if (isLoading) return <Loader />

        if (err) return <ErrDisplayer err={err} />

        return (
            <div className='commentCard'>
                <div>
                    {(username === author) && <Button type="button" onClick={this.handleDelete} disabled={this.state.isLoading} variant='outlined' size='small' color="secondary">Delete</Button>}
                </div>
                <h5>{author}</h5>
                <p>{body}</p>
                <p><em>made on {created_at}</em> ---- {votes} Votes</p>
            </div>
        );
    };
};