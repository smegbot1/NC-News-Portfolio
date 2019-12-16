const axios = require('axios');

const request = axios.create({ baseURL: 'https://nc-news-dc.herokuapp.com/api' });

export const fetchTopics = async () => {
    const { data } = await request.get('/topics');
    return data;
};

export const fetchArticlesByTopic = async (topic, order, sort_by) => {
    const { data } = await request.get('/articles', {
        params: { topic, sort_by, order }
    });
    return data;
};

export const fetchSingleArticle = async article_id => {
    const { data } = await request.get(`/articles/${article_id}`);
    return data;
};

export const fetchCommentsByArticleId = async article_id => {
    const { data } = await request.get(`/articles/${article_id}/comments`);
    return data;
};