import React, { Component } from 'react';
import { fetchSingleArticle } from '../utils/api';
import Loader from './Loader';
import ErrDisplayer from './ErrDisplayer';

class SingleArticle extends Component {
    state = {
        article: {},
        isLoading: true,
        err: ''
    };

    componentDidMount() {
        this.getArticle()
    };

    getArticle = async () => {
        try {
            const { article } = await fetchSingleArticle(this.props.article_id)
            this.setState({ article , isLoading: false });
        } catch (err) {
            this.setState({ err: err.msg, isLoading: false });
        };
    };

    render() {
        const { article: { topic, title, author, created_at, body, votes, comment_count }, isLoading, err } = this.state;

        if (isLoading) return <Loader />

        if (err) return <ErrDisplayer err={err} />

        return (
            <main>
                <h2><strong>{topic} - </strong>{title}</h2>
                <h4>By <em>{author}</em> on {created_at}</h4>
                <p>{body}</p>
                <p>Votes: {votes}</p>
                <p>{comment_count} people have commented on this article.</p>
            </main>
        );
    }
}

export default SingleArticle;