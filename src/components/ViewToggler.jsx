import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export default class ViewToggler extends Component {
    state = {
        isVisible: false
    };

    handleClick = () => {
        this.setState(currentState => ({ isVisible: !currentState.isVisible }));
    };

    render() {
        const { children, open, close } = this.props;
        const { isVisible } = this.state;

        return (
            <section>
                <Button onClick={this.handleClick} variant='text' size='small' color="primary">{isVisible ? open : close}</Button>
                {isVisible && children}
            </section>
        );
    };
};