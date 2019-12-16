import React, { Component } from 'react';
import { fetchSingleArticle, fetchCommentsByArticleId } from '../utils/api';
import Loader from './Loader';
import ErrDisplayer from './ErrDisplayer';
import CommentCard from './CommentCard';

class SingleArticle extends Component {
    state = {
        article: {},
        comments: [],
        isLoading: true,
        err: ''
    };

    componentDidMount() {
        this.getArticle();
        this.getComments();
    };

    getArticle = async () => {
        try {
            const { article } = await fetchSingleArticle(this.props.article_id);
            this.setState({ article , isLoading: false });
        } catch (err) {
            this.setState({ err: err.msg, isLoading: false });
        };
    };

    getComments = async () => {
        try {
            const { comments } = await fetchCommentsByArticleId(this.props.article_id);
            this.setState({ ...this.state, comments, isLoading: false });
        } catch (err) {
            this.setState({ err: err.msg, isLoading: false });
        };
    };

    render() {
        const { article: { topic, title, author, created_at, body, votes, comment_count }, comments, isLoading, err } = this.state;

        if (isLoading) return <Loader />

        if (err) return <ErrDisplayer err={err} />

        return (
            <main>
                <h2><strong>{topic} - </strong>{title}</h2>
                <h4>By <em>{author}</em> on {created_at}</h4>
                <p>{body}</p>
                <p>Votes: {votes}</p>
                <p>{comment_count} people have commented on this article.</p>
                <hr/>
                {comments.map(comment => <CommentCard key={comment.comment_id} {...comment} />)}
            </main>
        );
    }
}

export default SingleArticle;