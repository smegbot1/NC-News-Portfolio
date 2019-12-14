import React, { Component } from 'react';
import axios from 'axios';

import Loader from './Loader';
import ArticleCard from './ArticleCard';

class ArticlesList extends Component {
    state = {
        articles: [],
        isLoading: false
    };

    componentDidMount() {
        this.getArticlesByTopic();
    };

    componentDidUpdate(prevProps) {
        if (this.props.topic !== prevProps.topic) {
            this.setState({ isLoading: false }, () => this.getArticlesByTopic());
        }
    }


    getArticlesByTopic = () => {
        if (this.state.isLoading) return;

        axios.get('/articles', {
            params: { topic: this.props.topic }
        }).then(res => {
            this.setState({ articles: res.data.articles, isLoading: false });
        });
    };

    render() {
        const { isLoading, articles } = this.state;

        if (isLoading) return <Loader />

        return (
            <div>
                {/* Sort by author (alphabetically, asc or desc) */}
                {/* create filter with options:
                    1. by Author
                    2. by Author (desc)
                possibly need search by author option
                */}
                {articles.map((article, i) => <ArticleCard key={i} {...article} />)}
            </div>
        );
    };
};

export default ArticlesList;