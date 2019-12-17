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
        if (this.props.topic !== prevProps.topic || this.state.order !== prevState.order || this.state.sort_by !== prevState.sort_by) {
            this.setState({ isLoading: false }, () => this.getArticlesByTopic());
        };
    };

    getArticlesByTopic = async () => {
        const { order, sort_by } = this.state;

        try {
            const { data: { articles } } = await fetchArticlesByTopic(this.props.topic, order, sort_by);
            this.setState({ articles, isLoading: false });
        } catch (err) {
            this.setState({ err: err.msg, isLoading: false });            
        };
    };

    handleOrder = order => {
        this.setState({ order });
    };

    handleSortBy = sort_by => {
        this.setState({ sort_by });
    };

    render() {
        const { isLoading, articles } = this.state;

        if (isLoading) return <Loader />
        
        return (
            <div>
                <ArticlesFilter handleOrder={ this.handleOrder } handleSortBy={this.handleSortBy}/>
                {articles.map((article, i) => <ArticleCard key={i} {...article} />)}
            </div>
        );
    };
};

export default ArticlesList;