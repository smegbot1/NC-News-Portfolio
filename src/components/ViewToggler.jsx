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
        const { children, text1, text2 } = this.props;
        const { isVisible } = this.state;

        return (
            <section>
                <Button onClick={this.handleClick} variant='text' size='small' color="primary">{isVisible ? text1 : text2}</Button>
                {isVisible && children}
            </section>
        );
    };
};