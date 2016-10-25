'use strict';

var HTTPUtil = {};

HTTPUtil.prototype.get = function (url, params, headers)
{
    if (params)
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
    }

    return new Promise(function (resolve, reject)
    {
        fetch(url, {
            method: 'GET',
            header: headers
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
            resolve(response);
        }).catch((err) =>
        {
            reject({status: -1});
        })
    });
};

HTTPUtil.prototype.post = function (url, formData)
{
    return new Promise(function (resolve, reject)
    {
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: formData,
        })
            .then((response) =>
            {
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
                resolve(response);
            })
            .catch((err)=>
            {
                reject({status: -1});
            })
    });
};

export default HTTPUtil;