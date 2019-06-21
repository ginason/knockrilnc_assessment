import axios from 'axios';
import apiConfig from './config';

const pathParamParsing = (path, parameters) => {
    let result = '';
    let pathItems = path.toString().split('/');
    pathItems.forEach((item, index) => {
        if (index !== 0) result += '/';
        if (item.substring(0, 1) === ':' && parameters[item.substring(1, item.length)]) {
            console.log(parameters[item.substring(1, item.length)]);

            result += parameters[item.substring(1, item.length)];
        } else {
            result += item;
        }
    });
    return result;
};
export const get = (path, parameters ={}) => {
    console.log('/Lib/index.js :: GET :: ' + apiConfig[path]);
    let realPath = pathParamParsing(apiConfig[path], parameters);
    return axios.get(realPath, { params: parameters })
        .then((response) => {
            console.log('/Lib/index.js :: GET :: ' + path + ' :: Success!');
            return Promise.resolve(response);
        })
        .catch((err) => {
            console.log('/Lib/index.js :: GET :: ' + path + ' :: Failed!');
            //console.log(err);
            return Promise.reject(err);
        });
};
