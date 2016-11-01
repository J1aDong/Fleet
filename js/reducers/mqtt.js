'use strict';

import * as types from '../actions/ActionTypes';

const initialState = {
    isConnect: false,
};

export default function login(state = initialState, action)
{
    switch (action.type)
    {
        case types.FETCH_LOADING:
            console.log('FETCH_LOADING');
            return Object.assign({}, state, {
                loading: true
            });
        case types.FETCH_LOGIN:
            return Object.assign({}, state, {
                loading: false,
                text: action.token
            });
        case types.FETCH_FAIL:
            return Object.assign({}, state, {
                loading: false,
                text: 'fail'
            });
        default:
            return state;
    }
}
