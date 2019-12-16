import React from 'react';
import { Link } from '@reach/router';

const ArticleCard = ({ article_id, title, topic, author, created_at, comment_count }) => {
    return (
        <article>
            <Link to={`/articles/${article_id}`}>
                <h2>{title}</h2>
            </Link>
            <h3>By {author}</h3>
            <h4><em>{topic}</em></h4>
            <p>Date: {created_at}</p>
            <h5>{comment_count} Comments</h5>
        </article>
    );
};

export default ArticleCard;