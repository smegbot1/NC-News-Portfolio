import React, { Component } from 'react';

export default class PageNav extends Component {
    state = {
        page: 0,
        lastPage: 0,
        items: ''
    };

    componentDidUpdate(prevProps) {
        if (prevProps.total !== this.props.total) this.setState({ lastPage: Math.floor(this.props.total / this.props.size) });
        if (prevProps.items !== this.props.items) this.setState({ items: this.props.items, page: 0 });
    };

    handlePage = (page) => {
        if ((this.state.page === 0 && page < 0) || (this.state.page === this.state.lastPage && page > 0)) return;

        this.setState({ page: this.state.page + page }, () => this.props.refresh(this.state.page * this.props.size));
    };

    render() {
        return <div>
            <button onClick={() => this.handlePage(-1)}>Previous</button>
                {this.state.page + 1}
            <button onClick={() => this.handlePage(1)}>Next</button>
        </div>
    };
};