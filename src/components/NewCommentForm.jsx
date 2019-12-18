import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { addComment } from '../utils/api';

export default class NewCommentForm extends Component {
    state = {
        comment: '',
        err: ''
    };

    handleChange = ({ target }) => {
        this.setState({ comment: target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.state.comment === '' ? alert('Please enter your comment.') : this.postComment();
    };
    
    postComment = async () => {
        try {
            addComment(this.props.article_id, this.state.comment, this.props.username);
            this.setState({ comment: '' }, () => this.props.getComments());
        } catch (err) {
            this.setState({ err: err.msg })
        };
    };

    render() {
        return (
            <form noValidate autoComplete="off">
                <div>
                    <TextField
                    id="filled-multiline-static"
                    label="Comment"
                    multiline
                    rows="3"
                    value={this.state.comment}
                    variant="filled"
                    onChange={this.handleChange}
                    required
                    />
                </div>
                <Button onClick={this.handleSubmit} variant='text' size='small' color="primary">Post</Button>
            </form>
        );
    };
};