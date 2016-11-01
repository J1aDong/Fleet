'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    BackAndroid
} from 'react-native';
import {statusHeight} from '../common/CommonApi';

class MyStatusBar extends Component {
    render()
    {
        return (
            <View style={styles.container}/>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: statusHeight()
    }
});

export default MyStatusBar;