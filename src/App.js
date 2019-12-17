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
import { fetchTopics } from './utils/api';

axios.defaults.baseURL = 'https://nc-news-dc.herokuapp.com/api'; 

class App extends Component {
    state = {
        username: 'tickle122',
        topics: [],
        isLoading: true,
        snackBarOpen: false,
        err: ''
    };
    
    handleClose = (_, reason) => {
        if (reason === 'clickaway') return;
    
        this.setState({ snackBarOpen: false });
    };

    getTopics = async () => {
        try {
            const { data: { topics } } = await fetchTopics();
            this.setState({ ...this.state, topics, isLoading: false });
        } catch (err) {
            this.setState({ err: err.msg, isLoading: false });
        };
    };

    componentDidMount() {
        this.getTopics();

        axios.interceptors.response.use(null, (err) => {
            if (err.response && err.response.data) {
                this.setState({ snackBarOpen: true, err: err.response.data.msg || 'Unexpected error occured' });
            } else {
                this.setState({ snackBarOpen: true, err: 'Unexpected error occured' });
            }

            return Promise.reject(err);
        });
    };

    render() {
        const { username, isLoading, topics } = this.state;

        if (isLoading) return <Loader />

        return (
            <div className='App'>
                <Header username={username} />
                { topics.length !== 0 && <NavBar topics={topics} /> }
                <Router>
                    <ArticlesList path='/' />
                    <ArticlesList path=':topic' />
                    <SingleArticle path='/articles/:article_id' username={username} />
                    <ErrDisplayer default />
                </Router>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={this.state.snackBarOpen}
                    onClose={this.handleClose}
                    message={this.state.err}
                />
            </div>
        );
    };
};

export default App;
