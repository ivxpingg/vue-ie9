/**
 * axios组件自己定义封装，增加基础配置、请求前、后拦截器处理。
 * @return axios对象
 * */

import axios from 'axios';
import utils from '@/lib/utils';
import Config from '@/config';

const ajaxUrl = window.location.origin + Config[Config.env].ajaxUrl;

function setContentTypeIfUnset(headers, value) {
    if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
        headers['Content-Type'] = value;
    }
}

axios.defaults.withCredentials=true;

const Ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000,
    transformRequest: [function transformRequest(data, headers) {
        /* 把类似content-type这种改成Content-Type */
        let keys = Object.keys(headers);
        let normalizedName = 'Content-Type';
        keys.forEach(name => {
            if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
                headers[normalizedName] = headers[name];
                delete headers[name];
            }
        });
        if (utils.isFormData(data) ||
            utils.isArrayBuffer(data) ||
            utils.isStream(data) ||
            utils.isFile(data) ||
            utils.isBlob(data)
        ) {
            return data;
        }
        if (utils.isURLSearchParams(data)) {
            setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
            return data.toString();
        }
        /* 这里是重点，其他的其实可以照着axios的源码抄 */
        /* 这里就是用来解决POST提交json数据的时候是直接把整个json放在request payload中提交过去的情况
         * 这里简单处理下，把 {name: 'admin', pwd: 123}这种转换成name=admin&pwd=123就可以通过
         * x-www-form-urlencoded这种方式提交
         * */
        if (utils.isObject(data)) {
            setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
            let keys2 = Object.keys(data);
            /* 这里就是把json变成url形式，并进行encode */
            return encodeURI(keys2.map(name => `${name}=${data[name]}`).join('&'));
        }
        return data;
    }]
});


//ajax请求前拦截器
Ajax.interceptors.request.use(function (config) {
    if (config.method === 'post' && utils.isUndefined(config.headers['Content-Type'])) {
        config.headers['Content-Type'] = 'application/json;charset=utf-8';
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});
//ajax响应后拦截器
Ajax.interceptors.response.use(function (response) {
    // if (response.data.errCode === 'A0002'){ }
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

export default Ajax;