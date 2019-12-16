import React, { Component } from 'react';
import { Router } from '@reach/router';

import './App.css';

import Header from './components/Header';
import NavBar from './components/NavBar';
import ArticlesList from './components/ArticlesList';
import { fetchTopics } from './utils/api';
import Loader from './components/Loader';
import ErrDisplayer from './components/ErrDisplayer';
import SingleArticle from './components/SingleArticle';

class App extends Component {
    state = {
        username: 'weegembump',
        topics: [],
        isLoading: true,
        err: ''
    };

    getTopics = () => {
        fetchTopics()
            .then(res => {
                this.setState({ topics: res.topics, isLoading: false })
            })
            .catch(res => {  
                this.setState({ err: res.msg, isLoading: false })
            });
    };

    componentDidMount() {
        this.getTopics();
    };

    render() {
        const { username, isLoading, topics, err } = this.state;

        if (isLoading) return <Loader />

        if (err) return <ErrDisplayer />

        return (
            <div className='App'>
                <Header username={username} />
                { topics.length !== 0 && <NavBar topics={topics} /> }
                <Router>
                    <ArticlesList path='/' />
                    <ArticlesList path=':topic' />
                    <SingleArticle path='/articles/:article_id' />
                    <ErrDisplayer default />
                </Router>
            </div>
        );
    };
};

export default App;
