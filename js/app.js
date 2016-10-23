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
        let defaultEnableSwipeBack = true;

        return (
            <Navigator
                initialRoute={{name: defaultName, component: defaultComponent, enableSwipeBack: defaultEnableSwipeBack}}
                configureScene={(route) =>
                {
                    let enableSwipeBack = route.enableSwipeBack;
                    if (enableSwipeBack)
                    {
                        return Navigator.SceneConfigs.PushFromRight;
                    } else
                    {
                        return {
                            ...Navigator.SceneConfigs.PushFromRight,
                            gestures: null
                        }
                    }

                }}
                renderScene={(route, navigator) =>
                {
                    let Component = route.component;
                    return <Component {...route.passProps} navigator={navigator}/>
                }}
            />
        )
    }
}

export default App;