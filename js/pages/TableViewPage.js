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
    BackAndroid,
    StatusBar
} from 'react-native';
import {TabViewAnimated, TabBarTop} from 'react-native-tab-view';
import {statusHeight} from '../common/CommonApi';

class SettingPage extends Component {
    constructor(props)
    {
        super(props);

        this.state = {
            index: 0,
            routes: [
                {key: '1', title: 'First'},
                {key: '2', title: 'Second'},
            ],
        }
    }

    _handleChangeTab = (index) =>
    {
        this.setState({index});
    };

    _renderHeader = (props) =>
    {
        return <TabBarTop {...props} style={{paddingTop: statusHeight()}}/>;
    };

    _renderScene = ({route}) =>
    {
        switch (route.key)
        {
            case '1':
                return (
                    <View style={[styles.page, {backgroundColor: '#ff4081'}]}>
                    </View>
                );
            case '2':
                return (
                    <View style={[styles.page, {backgroundColor: '#673ab7'}]}>
                    </View>
                );
            default:
                return null;
        }
    };

    render()
    {
        return (
            <TabViewAnimated
                style={styles.container}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onRequestChangeTab={this._handleChangeTab}
            />
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
        backgroundColor: 'white',
    },
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SettingPage;