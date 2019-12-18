import React, { Component } from 'react';

import CommentCard from './CommentCard';
import { fetchCommentsByArticleId } from '../utils/api';
import Loader from './Loader';
import NewCommentForm from './NewCommentForm';
import ViewToggler from './ViewToggler';

class CommentList extends Component {
    state = {
        comments: [],
        isLoading: true,
        err: ''
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
        const { comments, isLoading } = this.state;

        if (isLoading) return <Loader />

        return (
            <section>
                <ViewToggler close="Post Comment" open="Hide" username={this.props.username}>
                    <NewCommentForm getComments={this.getComments} article_id={this.props.article_id} username={this.props.username} />
                </ViewToggler>
                {comments.map(comment => <CommentCard key={comment.comment_id} {...comment} username={this.props.username} getComments={this.getComments} />)}
            </section>
        );
    }
}

export default CommentList;