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
    ListView,
    StatusBar
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import DrawerLayout from 'react-native-drawer-layout';

import {statusHeight, getDeviceWidth} from '../common/CommonApi';
import Toolbar from '../component/ToolBar';
import BdMapView from '../component/BdMapView';
import Setting from './SettingPage';
import TableViewPage from './TableViewPage';
import MqttPage from './MqttPage';
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

        const menu = <MqttPage navigator={navigator}/>;

        return (
            <DrawerLayout drawerWidth={getDeviceWidth() > 600 ? 500 : 300} renderNavigationView={() => menu}
                          ref={(drawer) =>
                          {
                              return this.drawer = drawer
                          }}>
                <View style={styles.container}>
                    <StatusBar
                        barStyle="default"/>
                    <View style={styles.toolbarStatus}/>
                    <Toolbar style={styles.toolbar}
                             title="Fleet"
                             leftOnClick={() =>
                             {
                                 console.log('按了左边');
                                 that.drawer.openDrawer();

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
            </DrawerLayout>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    toolbarStatus: {
        marginTop: statusHeight(),
        backgroundColor: 'white'
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