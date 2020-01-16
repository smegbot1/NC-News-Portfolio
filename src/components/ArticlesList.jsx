import React, { Component } from 'react';

import Loader from './Loader';
import ArticleCard from './ArticleCard';
import ArticlesFilter from './ArticlesFilter';
import { fetchArticlesByTopic } from '../utils/api';
import PageNav from './PageNav';

export default class ArticlesList extends Component {
    state = {
        articles: [],
        order: '',
        sort_by: '',
        isLoading: false,
        article_count: 0
    };

    componentDidMount() {
        this.getArticlesByTopic();
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.props.topic !== prevProps.topic || this.state.order !== prevState.order || this.state.sort_by !== prevState.sort_by) {
            this.setState({ isLoading: false }, () => this.getArticlesByTopic());
        };
    };

    getArticlesByTopic = async (offset = 0) => {
        try {
            const { data: { articles, article_count } } = await fetchArticlesByTopic(this.props.topic, this.state.order, this.state.sort_by, offset);
            this.setState({ articles, article_count, isLoading: false });
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
        if (this.state.isLoading) return <Loader />;

        return (
            <div>
                <PageNav total={this.state.article_count} items={this.props.topic} refresh={this.getArticlesByTopic} size={5} />
                <ArticlesFilter handleOrder={this.handleOrder} handleSortBy={this.handleSortBy}/>
                {this.state.articles.map((article, i) => <ArticleCard key={i} {...article} />)}
            </div>
        );
    };
};