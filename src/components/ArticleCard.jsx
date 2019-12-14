import React from 'react';

const ArticleCard = ({ title, topic, author, created_at, comment_count }) => {
    return (
        <article>
            <h2>{title}</h2>
            <h3>By {author}</h3>
            <h4><em>{topic}</em></h4>
            <p>Date: {created_at}</p>
            <h5>{comment_count} Comments</h5> {/* Link this to get comment by article id */}
        </article>
    );
};

export default ArticleCard;