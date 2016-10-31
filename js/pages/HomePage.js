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
    StatusBar,
    InteractionManager
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import DrawerLayout from 'react-native-drawer-layout';
import Immutable from 'immutable';

import {statusHeight, getDeviceWidth, get} from '../common/CommonApi';
import Toolbar from '../component/ToolBar';
import BdMapView from '../component/BdMapView';
import Setting from './LoginPage';
import MqttPage from './MqttPage';
import QRCodeScreen from '../component/QRCodeScreen';
import {toastShort} from '../component/Toast';

class HomePage extends Component {
    constructor(props)
    {
        super(props);

        this.state = {
            data: Immutable.fromJS({
                latitude: 0,
                longitude: 0,
            })
        }
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
                    <BdMapView location={true} style={styles.top} onLocationChange={(event) =>
                    {
                        var latitude = event.nativeEvent.latitude;
                        var longitude = event.nativeEvent.longitude;
                        console.log("latitude" + latitude + "longitude" + longitude);
                        if (that.state.data.latitude != latitude || that.state.data.longitude != longitude)
                        {
                            that.setState({
                                data: {
                                    latitude: latitude,
                                    longitude: longitude,
                                }
                            });
                        }
                    }}/>
                    <View style={[styles.bottom, {alignItems: 'center'}]}>
                        <View style={{marginTop: 30}}>
                            <Text style={{
                                fontSize: 20,
                                fontFamily: 'FZQingKeBenYueSongS-R-GB'
                            }}>纬度:{that.state.data.latitude}</Text>
                            <Text style={{
                                fontSize: 20,
                                fontFamily: 'FZQingKeBenYueSongS-R-GB'
                            }}>经度:{that.state.data.longitude}</Text>
                        </View>
                    </View>
                    {/*{that._renderActionButton(navigator)}*/}

                </View>
            </DrawerLayout>
        )

    }

    _renderActionButton(navigator)
    {
        var that = this;

        return (
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