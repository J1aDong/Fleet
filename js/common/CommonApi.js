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
