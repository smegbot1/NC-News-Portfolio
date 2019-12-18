import axios from 'axios';

axios.defaults.baseURL = 'https://nc-news-dc.herokuapp.com/api'; 

// export const interceptErr = err => {
//     if (err.response && err.response.data) {
//         this.setState({ snackBarOpen: true, err: err.response.data.msg || 'Unexpected error occured' });
//     } else {
//         this.setState({ snackBarOpen: true, err: 'Unexpected error occured' });
//     }

//     return Promise.reject(err);
// };

// export const interceptErr = () => axios.interceptors.response.use(null, (err) => {
//     if (err.response && err.response.data) {
//         this.setState({ snackBarOpen: true, err: err.response.data.msg || 'Unexpected error occured' });
//     } else {
//         this.setState({ snackBarOpen: true, err: 'Unexpected error occured' });
//     }

//     return Promise.reject(err);
// });