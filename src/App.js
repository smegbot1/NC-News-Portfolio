import React, { Component } from 'react';
import { Router } from '@reach/router';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';

import './App.css';

import Header from './components/Header';
import NavBar from './components/NavBar';
import ArticlesList from './components/ArticlesList';
import Loader from './components/Loader';
import ErrDisplayer from './components/ErrDisplayer';
import SingleArticle from './components/SingleArticle';

export default class App extends Component {
    state = {
        username: 'tickle122',
        isLoading: true,
        snackBarOpen: false,
        err: ''
    };
    
    handleClose = (_, reason) => {
        if (reason === 'clickaway') return;
    
        this.setState({ snackBarOpen: false });
    };

    componentDidMount() {
        axios.interceptors.response.use(null, (err) => {
            if (err.response && err.response.data) {
                this.setState({ snackBarOpen: true, err: err.response.data.msg || 'Unexpected error occured' });
            } else {
                this.setState({ snackBarOpen: true, err: 'Unexpected error occured' });
            };
            return Promise.reject(err);
        });
        this.setState({ isLoading: false })
    };

    render() {
        if (this.state.isLoading) return <Loader />

        return (
            <div className='App'>
                <Header username={this.state.username} />
                <NavBar />
                <Router>
                    <ArticlesList path='/' />
                    <ArticlesList path=':topic' />
                    <SingleArticle path='/articles/:article_id' username={this.state.username} />
                    <ErrDisplayer default />
                </Router>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.snackBarOpen}
                    onClose={this.handleClose}
                    autoHideDuration={5000}
                    message={this.state.err}
                />
            </div>
        );
    };
};
