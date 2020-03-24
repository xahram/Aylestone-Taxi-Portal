import axios from 'axios';

const instance = axios.create();

// instance.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// instance.defaults.headers.post['Content-Type'] = 'application/json';
// instance.defaults.headers.post['Access-Control-Allow-Origin'] = '*';


export default instance;