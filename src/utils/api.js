const axios = require('axios');

const request = axios.create({ baseURL: 'https://nc-news-dc.herokuapp.com/api' });

export const fetchTopics = () => request.get('/topics');

export const fetchArticlesByTopic = (topic, order, sort_by) => {
    return request.get('/articles', {
        params: { topic, sort_by, order }
    });
};

export const fetchSingleArticle = async article_id => request.get(`/articles/${article_id}`);

export const fetchCommentsByArticleId = article_id => request.get(`/articles/${article_id}/comments`);

export const removeComment = comment_id => request.delete(`/comments/${comment_id}`);

export const addComment = (article_id, body) => {
    return request.post(`/articles/${article_id}/comments`, { body });
};