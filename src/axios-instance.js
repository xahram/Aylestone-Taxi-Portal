import axios from 'axios';

const instance = axios.create({
    auth: {
        username: "fe29870bb21e908416bc104e84aa56b134dcf8b5",  //This could be your email
        password: '85e28b28d476d2d336f96901b3633da38519e24b'
    },
    headers: {
        "Content-Type": "application/json"
    }
});

// instance.defaults.headers.common['APP KEY'] = 'fe29870bb21e908416bc104e84aa56b134dcf8b5';
// instance.defaults.headers.common['SECRET KEY'] = '85e28b28d476d2d336f96901b3633da38519e24b';
// instance.defaults.headers.common['Authorization'] = window.btoa('fe29870bb21e908416bc104e84aa56b134dcf8b5' + ':' +'85e28b28d476d2d336f96901b3633da38519e24b');

export default instance;