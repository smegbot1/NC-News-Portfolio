import axios from 'axios';

axios.defaults.baseURL = 'https://nc-news-dc.herokuapp.com/api'; 

export const fetchTopics = () => axios.get('/topics');

export const fetchArticlesByTopic = (topic, order, sort_by, offset) => axios.get('/articles', { params: { topic, sort_by, order, offset } });

export const fetchSingleArticle = article_id => axios.get(`/articles/${article_id}`);

export const fetchCommentsByArticleId = (article_id, offset) => axios.get(`/articles/${article_id}/comments`, { params: { offset } });

export const removeComment = comment_id => axios.delete(`/comments/${comment_id}`);

export const addComment = (article_id, body, username) => axios.post(`/articles/${article_id}/comments`, { username, body })

export const voteComment = (type, id, inc_votes) => axios.patch(`/${type}/${id}`, { inc_votes });