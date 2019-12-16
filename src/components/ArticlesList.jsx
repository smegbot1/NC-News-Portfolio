import React, { Component } from 'react';

import Loader from './Loader';
import ArticleCard from './ArticleCard';
import AuthorFilter from './AuthorFilter';
import { fetchArticlesByTopic } from '../utils/api';

class ArticlesList extends Component {
    state = {
        articles: [],
        isLoading: false,
        err: ''
    };

    componentDidMount() {
        this.getArticlesByTopic();
    };

    componentDidUpdate(prevProps) {
        if (this.props.topic !== prevProps.topic) {
            this.setState({ isLoading: false }, () => this.getArticlesByTopic());
        };
    };

    getArticlesByTopic = () => {
        const { topic, order } = this.props;

        fetchArticlesByTopic(topic, order)
            .then(res => {
                this.setState({ articles: res.articles, isLoading: false });
            })
            .catch(res => {
                this.setState({ err: res.msg, isLoading: false });
            });
    };

    render() {
        const { isLoading, articles } = this.state;

        if (isLoading) return <Loader />

        // if (err) return <ErrDisplayer />

        return (
            <div>
                {/* Sort by author (alphabetically, asc or desc) */}
                {/* create filter with options:
                    1. by Author
                    2. by Author (desc)
                possibly need search by author option
                */}
                <p>Sort articles by author: </p>
                <AuthorFilter />
                {articles.map((article, i) => <ArticleCard key={i} {...article} />)}
            </div>
        );
    };
};

export default ArticlesList;