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

class MqttPage extends Component {
    constructor(props)
    {
        super(props);

        var agentId = '577ba294280c474b40aad690';
        var agentToken = 'WlCllVNCPCZlHlhVyxaNHBiwABdgwuMk';

        var SUBSCRIBE_TOPIC = "agents/" + agentId + "/downstream";
        var PUBLISH_TOPIC = "jsonUp";

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
            });

            client.on('connect', function ()
            {
                console.log('连接成功');
            });

            client.connect();
        }).catch(function (err)
        {
            console.log(err);
        });
    }

    render()
    {
        return (
            <View style={styles.container}>
                <Text>HomePage</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }
});

export default MqttPage;