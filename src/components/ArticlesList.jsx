import React, { Component } from 'react';

import Loader from './Loader';
import ArticleCard from './ArticleCard';
import ArticlesFilter from './ArticlesFilter';
import { fetchArticlesByTopic } from '../utils/api';

class ArticlesList extends Component {
    state = {
        articles: [],
        order: '',
        sort_by: '',
        isLoading: false,
        err: ''
    };

    componentDidMount() {
        this.getArticlesByTopic();
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.props.topic !== prevProps.topic) {
            this.setState({ ...this.state, isLoading: false }, () => this.getArticlesByTopic());
        };

        if (this.state.order !== prevState.order) {
            this.setState({ ...this.state, isLoading: false }, () => this.getArticlesByTopic());
        };

        if (this.state.sort_by !== prevState.sort_by) {
            this.setState({ ...this.state, isLoading: false }, () => this.getArticlesByTopic());
        };
    };

    getArticlesByTopic = () => {
        const { topic } = this.props;
        const { order, sort_by } = this.state;

        fetchArticlesByTopic(topic, order, sort_by)
            .then(res => {
                this.setState({ articles: res.articles, isLoading: false });
            })
            .catch(res => {
                this.setState({ err: res.msg, isLoading: false });
            });
    };

    handleOrder = order => {
        this.setState({ ...this.state, order });
    };

    handleSortBy = sort_by => {
        this.setState({ ...this.state, sort_by });
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
                <ArticlesFilter handleOrder={ this.handleOrder } handleSortBy={this.handleSortBy}/>
                {articles.map((article, i) => <ArticleCard key={i} {...article} />)}
            </div>
        );
    };
};

export default ArticlesList;