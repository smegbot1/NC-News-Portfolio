import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

export default class NewCommentForm extends Component {
    state = {
        comment: ''
    };

    handleChange = ({ target }) => {
        this.setState({ comment: target.value });
    };

    render() {
        return (
            <form noValidate autoComplete="off">
                <div>
                    <TextField
                    id="filled-multiline-static"
                    label="Comment"
                    multiline
                    rows="4"
                    value={this.state.comment}
                    variant="filled"
                    onChange={this.handleChange}
                    />
                </div>
            </form>
        );
    };
};