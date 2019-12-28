import React, { Component } from 'react';

import CommentCard from './CommentCard';
import { fetchCommentsByArticleId } from '../utils/api';
import Loader from './Loader';
import NewCommentForm from './NewCommentForm';
import ViewToggler from './ViewToggler';
import PageNav from './PageNav';

export default class CommentList extends Component {
    state = {
        comments: [],
        isLoading: true,
        page: 1,
        offset: 0
    };

    componentDidMount() {
        this.getComments();
    };

    getComments = async () => {
        try {
            const { data: { comments } } = await fetchCommentsByArticleId(this.props.article_id, this.state.offset);
            this.setState({ comments, isLoading: false });
        } catch (err) {
            this.setState({ err: err.msg, isLoading: false });
        };
    };

    handlePage = ({ target: { value } }) => {
        this.setState(state => ({ ...state, page: state.page + (+value / 10), offset: state.offset + +value }), () => this.getComments());
    };

    render() {
        if (this.state.isLoading) return <Loader />;

        return (
            <section>
                <ViewToggler close="Post Comment" open="Hide" username={this.props.username}>
                    <NewCommentForm getComments={this.getComments} article_id={this.props.article_id} username={this.props.username} />
                </ViewToggler>
                <PageNav page={this.state.page} handlePage={this.handlePage} next={10} previous={-10} />
                {this.state.comments.map(comment => <CommentCard key={comment.comment_id} {...comment} username={this.props.username} getComments={this.getComments} />)}
            </section>
        );
    };
};