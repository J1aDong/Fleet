'use strict';

import {combineReducers} from 'redux';
import login from './login';
import mqtt from './mqtt';

const rootReducer = combineReducers({
    login, mqtt
});

export default rootReducer;