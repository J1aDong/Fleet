'use strict';

import * as types from './ActionTypes';
import HttpUtil from '../common/HttpUtil';
import Constant from '../common/Constant';
import md5 from 'md5';
import {toastShort} from '../component/Toast';

export function login(username, password, navigator)
{
    return dispatch =>
    {
        console.log('action login');

        dispatch(fetchLoading());

        var url = Constant.LOGIN;

        var json = {
            role: 'DEVELOPER',
            mobile: username,
            password: md5(password)
        };

        HttpUtil.post(url, json)
            .then((json) =>
            {
                if (json.status)
                {
                    dispatch(fetchLogin(json.data.token, navigator));
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
