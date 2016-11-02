'use strict';

import * as types from './ActionTypes';
import mqtt from 'react-native-mqtt';
import {toastShort} from '../component/Toast';
import Constant from '../common/Constant';

var mqttClient;
var SUBSCRIBE_TOPIC;

export function connectMqtt(agentId, agentToken, navigator, dispatch)
{
    SUBSCRIBE_TOPIC = "jsonLocation2";

    var promise = new Promise((resolve, reject) =>
    {
        var options = {
            host: Constant.MqttHost,
            port: Constant.MqttPort,
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
                mqttDisconnected();
                reject('断开成功');
            });

            client.on('error', function (msg)
            {
                console.log('mqtt.event.error', msg);
                reject('断开成功');
            });

            client.on('message', function (msg)
            {
                console.log('mqtt.event.message', msg);
                toastShort('发送成功');
            });

            client.on('connect', function ()
            {
                console.log('连接成功');
                client.subscribe(SUBSCRIBE_TOPIC, 0);
                toastShort('连接成功');
                dispatch(mqttConnected(agentId, navigator));
                resolve('连接成功');
            });

            client.connect();
        }).catch(function (err)
        {
            console.log(err);
        });
    });
    return promise;
}

function mqttConnected(agentId, navigator)
{
    return {
        type: types.MQTT_CONNECTED,
        agentId: agentId
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
        if (typeof (mqttClient) == "undefined")
        {
            toastShort("尚未连接，请先连接");
            return;
        }
        mqttClient.publish(SUBSCRIBE_TOPIC, JSON.stringify(payLoad), 0, false);
    }
}