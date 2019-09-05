import axios from 'axios';
import {message,Modal} from 'antd';
import downFile from 'js-file-download';
import qs from 'qs';
axios.defaults.timeout = 10000;
axios.defaults.paramsSerializer = function (params) {
    return qs.stringify(params,{arrayFormat:"comma"});
}
axios.interceptors.request.use(
    config => {
        try {
            const token = JSON.parse(localStorage.getItem('LOGIN_USER')).token;
            if (token){
                config.headers['x-user-token'] = token;
            }
        }catch (e) {

        }
        return config;
    },
    error => {
         return Promise.reject({
             code:'1000111',
             message:'网络异常'
         });
    }
);
axios.interceptors.response.use(
    response =>{
        //判断是否进行文件下载 xhr 注意设置 responseType:'blob',
        const  dispositionHeader = response.headers && response.headers['content-disposition'];
        if (dispositionHeader && /^attachment/i.test(dispositionHeader)){
            const  matches = dispositionHeader.match(/(?<=filename(\s)*=(\s)*)(.+)((?=;)|$)/ig),
                fileName = (matches && matches.length>0) ? matches[0] :undefined;
            if (fileName){
                downFile(response.data,window.decodeURIComponent(fileName));
            }
            return response;
        }
        const data = response.data;
        if(+data.code == 200){
            return response;
        }

        console.log('axios_data:',data);
        if (+data.code == 401){
            // if (!window.loginOut){
            //     window.loginOut = true;
            //     Modal.info({
            //         title:'未登录',
            //         onOk(){
            //             window.location = '#/login/loginByMobile?url='+window.location.href;
            //             window.loginOut = false;
            //         },
            //         okText:'去登录'
            //     });
            // }
            // window.location.href  = './xxxx/#/sssskk/?url='+window.location.href;
            data.message = '';
        }else if(+data.code === -4){
            data.message = '门户接口未登录';
        }
        data.message && message.error(data.message.replace(/\[|]/g,''));
        return  Promise.reject(data);
    },
    error => {
        if (error.response){
            switch (error.response.status) {
                case 400:
                    error.message = '请求错误';
                    break;
                case 401:
                    error.message = '未授权，请登录';
                    break;
                case 403:
                    error.message = '拒绝访问';
                    break;
                case 404:
                    error.message = `请求地址出错:${error.response.config.url}`;
                    break;
                case 408:
                    error.message = '请求超时';
                    break;
                case 500:
                    error.message = '服务器内部错误';
                    break;
                case 501:
                    error.message = '服务未实现';
                    break;
                case 502:
                    error.message = '网关错误';
                    break;
                case 503:
                    error.message = '服务不可用';
                    break;
                case 504:
                    error.message = '网关超时';
                    break;
                case 505:
                    error.message = 'HTTP版本不支持';
                    break;
                default:

                    break;
            }
        }else{
            if (error.message.includes('timeout')){
                //判断请求异常信息中是否含有超时timeout字符串
                error.message = '请求超时，请刷新页面';
            }else {
                error.message = '网络异常';
            }
            error.code = '1000111';
        }
        return Promise.reject(error);
    }
);



