import React, { Component } from 'react';
import { Router } from '@reach/router';
import axios from 'axios';

import './App.css';

import Header from './components/Header';
import NavBar from './components/NavBar';
import ArticlesList from './components/ArticlesList';

axios.defaults.baseURL = 'https://nc-news-dc.herokuapp.com/api';

class App extends Component {
    state = {
        topics: []
    };

    getTopics = () => {
        axios.get('/topics').then(res => {
            this.setState({ topics: res.data.topics });
        });
    };

    componentDidMount() {
        this.getTopics();
    };

    render() {
        const { topics } = this.state;
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
    }
}

export default App;
