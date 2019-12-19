import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import { addComment } from '../utils/api';

export default class NewCommentForm extends Component {
    state = {
        comment: '',
        err: '',
        snack: '',
        snackBarOpen: false
    };

    handleChange = ({ target }) => {
        this.setState({ comment: target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.state.comment === '' ?
            this.setState({ snackBarOpen: true, snack: 'Please enter your comment.' }) : 
            this.postComment();
    };
    
    postComment = async () => {
        try {
            await addComment(this.props.article_id, this.state.comment, this.props.username);
            this.setState({ snackBarOpen: true, snack: 'Comment posted!', comment: '' }, () => this.props.getComments());
        } catch (err) {
            this.setState({ err: err.msg })
        };
    };

    handleClose = (_, reason) => {
        if (reason === 'clickaway') return;
    
        this.setState({ snackBarOpen: false });
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
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.snackBarOpen}
                    onClose={this.handleClose}
                    autoHideDuration={5000}
                    message={this.state.snack}
                />
            </form>
        );
    };
};