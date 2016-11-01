'use strict';

import * as types from './ActionTypes';
import mqtt from 'react-native-mqtt';
import {toastShort} from '../component/Toast';
import HomePage from '../pages/HomePage';

var mqttClient;
var SUBSCRIBE_TOPIC;

export function connectMqtt(agentId, agentToken, navigator)
{
    SUBSCRIBE_TOPIC = "agents/" + agentId + "/downstream";

    return dispatch =>
    {
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
                toastShort('断开成功');
                dispatch(mqttDisconnected());
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
                dispatch(mqttConnected(navigator));
            });

            client.connect();
        }).catch(function (err)
        {
            console.log(err);
        });
    }
}

function mqttConnected(navigator)
{
    toastShort("已连接");

    navigator.push({
        name: 'HomePage',
        component: HomePage,
        enableSwipeBack: false
    });

    return {
        type: types.MQTT_CONNECTED
    }
}

function mqttDisconnected()
{
    toastShort("已断开");
    return {
        type: types.MQTT_DISCONNECTED
    }
}

export function sendMqtt(payLoad)
{
    return dispatch =>
    {
        mqttClient.publish(SUBSCRIBE_TOPIC, JSON.stringify(payLoad), 0, false);
    }
}