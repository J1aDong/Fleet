'use strict';

import * as types from './ActionTypes';
import HttpUtil from '../common/HttpUtil';
import Constant from '../common/Constant';
import md5 from 'md5';
import {toastShort} from '../component/Toast';
import {isEmail, isPhoneNumber} from '../common/CommonApi';

export function login(username, password, navigator)
{
    return dispatch =>
    {
        console.log('action login');

        dispatch(fetchLoading());

        var url = Constant.LOGIN;

        var json;

        if (isEmail(username))
        {
            console.log('是邮箱');
            json = {
                role: 'DEVELOPER',
                email: username,
                password: md5(password)
            };
        } else if (isPhoneNumber(username))
        {
            console.log('是电话号码');
            json = {
                role: 'DEVELOPER',
                mobile: username,
                password: md5(password)
            }
        } else
        {
            console.log('是普通姓名');
            json = {
                role: 'DEVELOPER',
                name: username,
                password: md5(password)
            }
        }

        HttpUtil.post(url, json)
            .then((json) =>
            {
                if (json.status)
                {
                    // dispatch(fetchLogin(json.data.token, navigator));
                    var token = json.data.token;
                    global.storage.save({
                        key: 'userToken',
                        rawData: {
                            userToken: token
                        }
                    })
                    fetchProducts();
                } else
                {
                    dispatch(fetchFail());
                }
            }).catch((err) =>
        {
            console.log(err);
            dispatch(fetchFail());
        });
    }
}

function fetchProducts()
{
    var url = Constant.PRODUCTS;
    var params = {
        limit: 15,
        page: 1,
        isAsc: true
    };


    HttpUtil.get(url, params).then((json) =>
    {
        console.log(json);
        if (json.status)
        {

        } else
        {
            dispatch(fetchFail());
        }
    }).catch(err =>
    {
        console.log(err);
        dispatch(fetchFail());
    })
}

function fetchLoading()
{
    toastShort('正在加载');
    return {
        type: types.FETCH_LOADING
    }
}

function fetchLogin(token, navigator)
{
    toastShort('登录成功-->token-->' + token);
    navigator.pop();
    return {
        type: types.FETCH_LOGIN,
        token: token
    }
}

function fetchFail()
{
    toastShort('登录失败');
    return {
        type: types.FETCH_FAIL
    }
}
