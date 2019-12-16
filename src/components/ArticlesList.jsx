import React, { Component } from 'react';

import Loader from './Loader';
import ArticleCard from './ArticleCard';
import ArticlesFilter from './ArticlesFilter';
import ErrDisplayer from './ErrDisplayer';
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

    getArticlesByTopic = async () => {
        const { topic } = this.props;
        const { order, sort_by } = this.state;

        try {
            const { data: { articles } } = await fetchArticlesByTopic(topic, order, sort_by);
            this.setState({ ...this.state, articles, isLoading: false });
        } catch (err) {
            this.setState({ err: err.msg, isLoading: false });            
        };
    };

    handleOrder = order => {
        this.setState({ ...this.state, order });
    };

    handleSortBy = sort_by => {
        this.setState({ ...this.state, sort_by });
    };

    render() {
        const { isLoading, articles, err } = this.state;

        if (isLoading) return <Loader />

        if (err) return <ErrDisplayer err={err}/>

        return (
            <div>
                <ArticlesFilter handleOrder={ this.handleOrder } handleSortBy={this.handleSortBy}/>
                {articles.map((article, i) => <ArticleCard key={i} {...article} />)}
            </div>
        );
    };
};

export default ArticlesList;