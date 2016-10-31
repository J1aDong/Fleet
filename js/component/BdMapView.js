'use strict';

import React, {Component, PropTypes} from 'react';
import {requireNativeComponent} from 'react-native';

var RCTBdMap = requireNativeComponent('RCTBdMap', BdMapView, {nativeOnly: {onLocationChange: true}});

export default class BdMapView extends Component {
    static propTypes = {
        location: PropTypes.bool, //是否开启定位
        onLocationChange: PropTypes.func,
    };

    render()
    {
        return <RCTBdMap {...this.props} onChange={(event) =>
        {
            this.props.onLocationChange(event)
        }}/>;
    }
}
