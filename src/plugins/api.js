import Axios from 'axios';

const CancelToken = Axios.CancelToken;

export const axios = Axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    responseType: 'json',
    // withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    timeout: 5000,
});

//全局响应拦截器
axios.interceptors.response.use(response => {
    return response.data;
}, error => {
    return Promise.reject(error);
});

let configs = {};
const apis = {};

const modules = import.meta.glob('../modules/*/apis.js',{ eager: true });
console.dir(modules);

Object.keys(modules).forEach(key => {
    const {default: api} = modules[key];
    configs = {...configs, ...api};
});

Object.keys(configs).forEach(key => {
    const config = configs[key];

    function request(...rest) {
        config.method = config.method?.toLowerCase() || 'get';
        let parameter;
        let query;
        if (config.restful) {
            const restful = rest[0];
            config.transform ? config.url = config.original : config.original = config.url;
            const match = config.url.match(/{[^{}]+}/g);
            if (match && match.length > 0) {
                match.forEach(str => {
                    str = str.slice(1, -1);
                    if (!restful || Object.prototype.toString.call(restful) !== '[object Object]' || !Object.keys(restful).includes(str)) {
                        let cancel;
                        config.cancelToken = new CancelToken(c => cancel = c);
                        cancel(`${key} 请求中 ${str} 参数未注入`);
                    } else {
                        config.url = config.url.replace(`{${str}}`, restful[str]);
                    }
                });
                config.transform = true;
            } else {
                let cancel;
                config.cancelToken = new CancelToken(c => cancel = c);
                cancel('你似乎并不需要 restful，请删除 restful 属性，或赋值为 false');
            }
            parameter = rest[1];
            query = rest[2];
        } else {
            parameter = rest[0];
            query = rest[1];
        }
        
        if (config.method === 'get' || config.method === 'delete') {
            config.params = {...parameter, ...query};
        } else if (config.method === 'post' || config.method === 'put' || config.method === 'patch') {
            config.data = parameter;
            config.params = query;
        }
        return axios.request(config);
    }
    
    apis[key] = request;
});

export default apis;
