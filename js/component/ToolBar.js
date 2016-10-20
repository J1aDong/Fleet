'use strict';

import React, {Component, PropTypes} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class ToolBar extends Component {
    constructor(props)
    {
        super(props);
    }

    static propTypes = {
        title: PropTypes.string, //中间的标题
        leftOnClick: PropTypes.func, //左边按钮的监听
        rightOnClick: PropTypes.func//右边按钮的监听
    };

    render()
    {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.leftOnClick}>
                    <Icon name="ios-menu" size={30} color='#303030'/>
                </TouchableOpacity>

                <Text style={styles.textCenter}>{this.props.title}</Text>

                <TouchableOpacity onPress={this.props.rightOnClick}>
                    <Icon name="ios-contact" size={30} color='#303030'/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textCenter: {
        flex: 1,
        fontFamily: 'FZQingKeBenYueSongS-R-GB',
        textAlign: 'center',
        fontSize: 25
    },
});

export default ToolBar;