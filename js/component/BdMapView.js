'use strict';

import React, {Component, PropTypes} from 'react';
import {requireNativeComponent} from 'react-native';

var RCTBdMap = requireNativeComponent('RCTBdMap', BdMapView);

export default class BdMapView extends Component {
    static propTypes = {
        location: PropTypes.bool, //是否开启定位
    };

    render()
    {
        return <RCTBdMap {...this.props}/>;
    }
}
