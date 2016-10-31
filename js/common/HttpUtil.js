'use strict';

var HTTPUtil = {};

HTTPUtil.get = function (url, params)
{
    if (params)
    {
        let paramsArray = [];
        //encodeURIComponent
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
        if (url.search(/\?/) === -1)
        {
            url += '?' + paramsArray.join('&')
        } else
        {
            url += '&' + paramsArray.join('&')
        }
    }

    return new Promise(function (resolve, reject)
    {
        console.log('url-->' + url);
        var Authorization = 'Bearer ' + global.token;
        console.log(Authorization);
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': Authorization
            }
        }).then((response) =>
        {
            if (response.ok)
            {
                return response.json();
            } else
            {
                reject({status: response.status});
            }
        }).then((response) =>
        {
            console.log(JSON.stringify(response));
            resolve(response);
        }).catch((err) =>
        {
            reject({status: -1});
        })
    });
};

HTTPUtil.post = function (url, json)
{
    return new Promise(function (resolve, reject)
    {
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json),
        })
            .then((response) =>
            {
                console.log(response);
                if (response.ok)
                {
                    return response.json();
                } else
                {
                    reject({status: response.status})
                }
            })
            .then((response) =>
            {
                console.log(JSON.stringify(response));
                resolve(response);
            })
            .catch((err)=>
            {
                reject(err);
            })
    });
};

export default HTTPUtil;