'use strict';

import * as types from './ActionTypes';
import HttpUtil from '../common/HttpUtil';
import Constant from '../common/Constant';
import md5 from 'md5';
import {toastShort, toastLong} from '../component/Toast';
import {isEmail, isPhoneNumber} from '../common/CommonApi';
import AgentList from '../pages/AgentList';

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

        //存储用户名
        global.storage.save({
            key: 'username',
            rawData: username
        });

        HttpUtil.post(url, json)
            .then((json) =>
            {
                if (json.status)
                {
                    // dispatch(fetchLogin(json.data.token, navigator));
                    var token = json.data.token;
                    global.storage.save({
                        key: 'userToken',
                        rawData: token
                    });
                    global.token = token;
                    dispatch(fetchProducts(navigator));
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

export function fetchProducts(navigator)
{
    return dispatch =>
    {
        var url = Constant.PRODUCTS;
        var params = {
            limit: 15,
            page: 1,
            isAsc: true
        };

        HttpUtil.get(url, params).then((json) =>
        {
            if (json.status)
            {
                console.log(json);
                var productInfo = json.data.productInfo;
                var product;
                for (var i = 0; i < productInfo.length; i++)
                {
                    var name = productInfo[i].name.toUpperCase().trim();
                    console.log("name-->" + name);
                    if (name == "J1ST DEMO")
                    {
                        product = productInfo[i];
                    }
                }
                if (product)
                {
                    // toastShort('有J1ST Demo这个项目');

                    //存储productId
                    global.storage.save({
                        key: 'productId',
                        rawData: product.id
                    });

                    dispatch(fetchAgents(product.id, navigator));
                } else
                {
                    toastLong("请确保当前账户下有J1ST Demo这个product，再重试");
                }
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
}

function fetchLoading()
{
    toastShort('正在加载');
    return {
        type: types.FETCH_LOADING
    }
}

export function fetchAgents(productId, navigator)
{
    return dispatch =>
    {
        var url = Constant.AGENTS(productId);
        console.log("url-->" + url);
        var params = {
            productId: productId,
            limit: 30,
            page: 1,
            isAsc: true,
            activated: false
        };
        HttpUtil.get(url, params)
            .then((json) =>
            {
                if (json.status)
                {
                    var agents = json.data.agentInfo;
                    navigator.push({
                        name: 'AgentList',
                        component: AgentList,
                        passProps: {
                            agents: agents
                        },
                        enableSwipeBack: true
                    })
                }
            }).catch(err =>
        {
            console.log(err);
        })
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
    console.log('登录失败');
    return {
        type: types.FETCH_FAIL
    }
}
