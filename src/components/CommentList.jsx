import React, { Component } from 'react';

import CommentCard from './CommentCard';
import { fetchCommentsByArticleId } from '../utils/api';
import Loader from './Loader';
import NewCommentForm from './NewCommentForm';
import ViewToggler from './ViewToggler';

export default class CommentList extends Component {
    state = {
        comments: [],
        isLoading: true
    };

    componentDidMount() {
        this.getComments();
    };

    getComments = async () => {
        try {
            const { data: { comments } } = await fetchCommentsByArticleId(this.props.article_id);
            this.setState({ comments, isLoading: false });
        } catch (err) {
            this.setState({ err: err.msg, isLoading: false });
        };
    };

    render() {
        if (this.state.isLoading) return <Loader />

        return (
            <section>
                <ViewToggler close="Post Comment" open="Hide" username={this.props.username}>
                    <NewCommentForm getComments={this.getComments} article_id={this.props.article_id} username={this.props.username} />
                </ViewToggler>
                {this.state.comments.map(comment => <CommentCard key={comment.comment_id} {...comment} username={this.props.username} getComments={this.getComments} />)}
            </section>
        );
    }
};