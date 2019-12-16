import React, { Component } from 'react';

import CommentCard from './CommentCard';
import { fetchCommentsByArticleId } from '../utils/api';
import Loader from './Loader';
import ErrDisplayer from './ErrDisplayer';
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
            this.setState({ ...this.state, comments, isLoading: false });
        } catch (err) {
            this.setState({ err: err.msg, isLoading: false });
        };
    };

    render() {
        const { comments, isLoading, err } = this.state;

        if (isLoading) return <Loader />

        if (err) return <ErrDisplayer err={err} />

        return (
            <section>
                <ViewToggler text2="Add Comment" text1="Hide">
                    <NewCommentForm />
                </ViewToggler>
                {/* <CommentCard ........ user={this.props.user} />
                    --------> (author === props.user) && deleteCommentButton */}
                {comments.map(comment => <CommentCard key={comment.comment_id} {...comment} username={this.props.username} getComments={this.getComments} />)}
            </section>
        );
    }
}

export default CommentList;