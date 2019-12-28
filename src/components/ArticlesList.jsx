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
        offset: 0,
        page: 1
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
        try {
            const { data: { articles } } = await fetchArticlesByTopic(this.props.topic, this.state.order, this.state.sort_by, this.state.offset);
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

    handlePage = ({ target: { value } }) => {
        this.setState(state => ({ ...state, page: state.page + (+value / 5), offset: state.offset + +value }), () => this.getArticlesByTopic());
    };

    render() {
        if (this.state.isLoading) return <Loader />;
        
        return (
            <div>
                <PageNav page={this.state.page} handlePage={this.handlePage} next={5} previous={-5} />
                <ArticlesFilter handleOrder={ this.handleOrder } handleSortBy={this.handleSortBy}/>
                {this.state.articles.map((article, i) => <ArticleCard key={i} {...article} />)}
            </div>
        );
    };
};