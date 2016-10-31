'use strict';

import {Platform, Dimensions} from 'react-native';

export function statusHeight()
{
    if (Platform.OS == "ios")
    {
        return 22;
    } else
    {
        return 0;
    }
}

export function getDeviceWidth()
{
    return Dimensions.get('window').width;
}

export function isAndroid()
{
    return Platform.OS == "android";
}

export function isEmail(s)
{
    var str = s.trim();
    if (str.length != 0)
    {
        var reg = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        var r = str.match(reg);
        if (r !== null)
        {
            return true;
        }
    }
    return false;
}

export function isPhoneNumber(s)
{
    var str = s.trim();
    if (str.length != 0)
    {
        var reg = /^((13[0-9])|(15[^4,\D])|(18[0,0-9]))\d{8}$/;
        var r = str.match(reg);
        if (r !== null)
        {
            return true;
        }
    }
    return false;
}