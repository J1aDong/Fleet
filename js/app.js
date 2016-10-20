'use strict';

import React from 'react';
import {
    AppRegistry,
    Navigator
} from 'react-native';
import HomePage from './pages/HomePage';
import {isAndroid} from './common/CommonApi';

class App extends React.Component {
    render()
    {
        let defaultName = 'HomePage';
        let defaultComponent = HomePage;
        return (
            <Navigator
                initialRoute={{name: defaultName, component: defaultComponent}}
                configureScene={(route) =>
                {
                    return Navigator.SceneConfigs.PushFromRight;
                }}
                renderScene={(route, navigator) =>
                {
                    let Component = route.component;
                    return <Component {...route.params} navigator={navigator}/>
                }}
            />
        )
    }
}

export default App;