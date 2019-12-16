import React, { Component } from 'react';
import { Router } from '@reach/router';

import './App.css';

import Header from './components/Header';
import NavBar from './components/NavBar';
import ArticlesList from './components/ArticlesList';
import { fetchTopics } from './utils/api';
import Loader from './components/Loader';

class App extends Component {
    state = {
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
        const { isLoading, topics } = this.state;

        if (isLoading) return <Loader />

        // if (err) return <ErrDisplayer />

        return (
            <div className='App'>
                <Header />
                { topics.length !== 0 && <NavBar topics={topics} /> }
                <Router>
                    <ArticlesList path='/' />
                    <ArticlesList path=':topic' />
                </Router>
            </div>
        );
    };
};

export default App;
