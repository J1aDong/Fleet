'use strict';

import * as types from '../actions/ActionTypes';

const initialState = {
    isConnect: false,
    agentId: ''
};

export default function mqtt(state = initialState, action)
{
    console.log('reducer --> mqtt');

    switch (action.type)
    {
        case types.MQTT_CONNECTED:
            console.log('MQTT_CONNECTED');
            return Object.assign({}, state, {
                agentId: action.agentId
            });
        default:
            return state;
    }
}
