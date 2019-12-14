import React, { Component } from 'react';
import axios from 'axios';

import Loader from './Loader';
import ArticleCard from './ArticleCard';

class ArticlesList extends Component {
    state = {
        articles: [],
        isLoading: true
    };

    componentDidMount() {
        this.getArticles();
    };

    getArticles = () => {
        axios.get('/articles').then(res => {
            this.setState({ articles: res.data.articles, isLoading: false });
        })
    }

    render() {
        const { isLoading, articles } = this.state;

        if (isLoading) return <Loader />

        return (
            <div>
                {articles.map((article, i) => <ArticleCard key={i} {...article} />)}
            </div>
        );
    }
}

export default ArticlesList;