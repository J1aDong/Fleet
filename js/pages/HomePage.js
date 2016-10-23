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
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import {statusHeight} from '../common/CommonApi';
import Toolbar from '../component/ToolBar';
import BdMapView from '../component/BdMapView';
import Setting from '../pages/Setting';
import QRCodeScreen from '../component/QRCodeScreen';
import {toastShort} from '../component/Toast';

class HomePage extends Component {
    constructor(props)
    {
        super(props);

        this.state = {}
    }

    // 扫描成功的回调
    _onSuccess(result)
    {
        console.log(result);
        toastShort('扫描成功' + result);
    }

    render()
    {
        const {navigator} = this.props;
        var that = this;

        return (
            <View style={styles.container}>
                <Toolbar style={styles.toolbar}
                         title="Fleet"
                         leftOnClick={() =>
                         {
                             console.log('按了左边');
                             navigator.push({
                                 name: 'Setting',
                                 component: Setting,
                                 enableSwipeBack: true
                             });
                         }} rightOnClick={() =>
                {
                    console.log('点击右边');
                    navigator.push({
                        name: 'Setting',
                        component: Setting,
                        enableSwipeBack: true
                    })
                }}/>
                <BdMapView location={true} style={styles.top}/>
                <View style={styles.bottom}>
                    <ActionButton buttonColor="rgba(231,76,60,1)" hideShadow={true}>
                        <ActionButton.Item buttonColor='#9b59b6' title="扫描二维码"
                                           onPress={() =>
                                           {
                                               console.log("notes tapped!");
                                               navigator.push({
                                                   name: 'QRCodeScreen',
                                                   title: 'QRCode',
                                                   component: QRCodeScreen,
                                                   passProps: {
                                                       onSuccess: that._onSuccess,
                                                       cancelButtonVisible: true
                                                   },
                                                   enableSwipeBack: false
                                               })
                                           }}>
                            <Icon name="md-qr-scanner" style={styles.actionButtonIcon}/>
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() =>
                        {
                        }}>
                            <Icon name="md-notifications-off" style={styles.actionButtonIcon}/>
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() =>
                        {
                        }}>
                            <Icon name="md-done-all" style={styles.actionButtonIcon}/>
                        </ActionButton.Item>
                    </ActionButton>
                </View>
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
    },
    top: {
        flex: 2
    },
    bottom: {
        flex: 3
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});

export default HomePage;