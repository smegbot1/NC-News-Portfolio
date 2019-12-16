const axios = require('axios');

const request = axios.create({ baseURL: 'https://nc-news-dc.herokuapp.com/api' });

export const fetchTopics = async () => {
    const { data } = await request.get('/topics');
    return data;
};

export const fetchArticlesByTopic = async (topic, order) => {
    const { data } = await request.get('/articles', {
        params: { topic },
        query: { sort_by: 'author', order }
    });
    return data;
};