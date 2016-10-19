'use strict';

import React, {Component} from 'react';
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
    render()
    {
        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <Icon name="ios-menu" size={30} color='#303030'/>
                </TouchableOpacity>

                <Text style={styles.textCenter}>Fleet</Text>

                <TouchableOpacity>
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