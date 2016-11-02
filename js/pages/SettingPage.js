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
import MyStatusBar from '../component/MyStatusBar';
import LoginPage from '../pages/LoginPage';

class SettingPage extends Component {

    _exit()
    {
        const {navigator} = this.props;

        global.storage.save({
            key: 'userToken',
            rawData: ''
        });
        global.token = '';
        navigator.replace({
            name: 'LoginPage',
            component: LoginPage,
            enableSwipeBack: false
        })
    }

    render()
    {
        return (
            <View style={styles.container}>
                <MyStatusBar/>
                <View style={styles.itemView}>
                    <Text style={{textAlign: 'center', color: 'white'}}>版本号:0.1.2</Text>
                </View>
                <TouchableOpacity onPress={() => this._exit()}>
                    <View style={styles.exitButton}>
                        <Text style={{color: 'white'}}>注销</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    componentWillMount()
    {
        BackAndroid.addEventListener('hardwareBackPress', () => this.onBackAndroid());
    }

    componentWillUnMount()
    {
        BackAndroid.removeEventListener('hardwareBackPress', () => this.onBackAndroid());
    }

    onBackAndroid()
    {
        const {navigator} = this.props;
        const routers = navigator.getCurrentRoutes();
        if (routers.length > 1)
        {
            navigator.pop();
            return true;
        }
        return false;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    itemView: {
        marginTop: 100,
        backgroundColor:'gray',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        padding:10
    },
    exitButton: {
        height: 50,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        width: 100,
        marginTop: 200
    }
});

export default SettingPage;