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
import mqtt from 'react-native-mqtt';
import {statusHeight} from '../common/CommonApi';
import {toastShort} from '../component/Toast';

var agentId = '577ba294280c474b40aad690';
var agentToken = 'WlCllVNCPCZlHlhVyxaNHBiwABdgwuMk';
var SUBSCRIBE_TOPIC = "agents/" + agentId + "/downstream";
var PUBLISH_TOPIC = "jsonUp";
var mqttClient;

class MqttPage extends Component {
    constructor(props)
    {
        super(props);

        var options = {
            host: 'broker.j1st.io',
            port: 1883,
            protocol: 'tcp',
            clientId: agentId,
            user: agentId,
            pass: agentToken,
            tls: false,
            auth: true
        };

        mqtt.createClient(options).then(function (client)
        {
            mqttClient = client;

            client.on('closed', function ()
            {
                console.log('mqtt.event.closed');

            });

            client.on('error', function (msg)
            {
                console.log('mqtt.event.error', msg);

            });

            client.on('message', function (msg)
            {
                console.log('mqtt.event.message', msg);
                toastShort('接收到消息' + JSON.stringify(msg));
            });

            client.on('connect', function ()
            {
                console.log('连接成功');
                client.subscribe(SUBSCRIBE_TOPIC, 0);
                toastShort('连接成功');
            });
        }).catch(function (err)
        {
            console.log(err);
        });
    }

    _connectClient()
    {
        mqttClient.connect();
    }

    _publishClient()
    {
        mqttClient.publish(SUBSCRIBE_TOPIC, 'test', 0, false);
    }

    render()
    {
        return (
            <View style={styles.container}>
                <View style={styles.toolbarStatus}/>
                <Text style={{textAlign: 'center', fontSize: 30}}>Mqtt Sample</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 40}}>
                    <Text style={{flex: 2, textAlign: 'center'}}>Agent Id</Text>
                    <Text style={{flex: 5, textAlign: 'center'}}>{agentId}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 40}}>
                    <Text style={{flex: 2, textAlign: 'center'}}>Agent Token</Text>
                    <Text style={{flex: 5, textAlign: 'center'}}>{agentToken}</Text>
                </View>
                <TouchableOpacity onPress={() =>
                {
                    this._connectClient();
                }}>
                    <View style={styles.button}>
                        <Text style={{color: 'white'}}>连接</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() =>
                {
                    this._publishClient();
                }}>
                    <View style={styles.button}>
                        <Text style={{color: 'white'}}>发送</Text>
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
    toolbarStatus: {
        marginTop: statusHeight(),
        backgroundColor: 'white'
    },
    button: {
        width: 70,
        height: 70,
        backgroundColor: 'red',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    }
});

export default MqttPage;