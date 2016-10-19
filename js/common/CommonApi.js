'use strict';

import {Platform} from 'react-native';

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

export function isAndroid()
{
    return Platform.OS == "android";
}
