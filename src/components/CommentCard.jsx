import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import moment from 'moment';

import { removeComment } from '../utils/api';
import Loader from './Loader';
import Voter from './Voter';

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
        const { comment_id, author, body, created_at, votes, username } = this.props;

        if (this.state.isLoading) return <Loader />

        return (
            <div className='commentCard'>
                {(username === author) && <Button type="button" onClick={this.handleDelete} disabled={this.state.isLoading} variant='outlined' size='small' color="secondary">Delete</Button>}
                <h5>{author}</h5>
                <p>{body}</p>
                <p><em>posted {moment(created_at, "YYYYMMDD").fromNow()}</em></p>
                <Voter type='comments' votes={votes} id={comment_id} />
            </div>
        );
    };
};