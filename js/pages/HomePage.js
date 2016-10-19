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
    ListView
} from 'react-native';

import {statusHeight} from '../common/CommonApi';
import Toolbar from '../component/ToolBar';

class HomePage extends Component {
    constructor(props)
    {
        super(props);

        this.state = {}
    }

    render()
    {
        return (
            <View style={styles.container}>
                <Toolbar style={styles.toolbar}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: statusHeight()
    },
    toolbar: {
        height: 30,
    },
    text: {
        fontSize: 20, textAlign: 'center'
    }
});

export default HomePage;