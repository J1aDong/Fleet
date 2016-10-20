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
    ListView
} from 'react-native';

import {statusHeight} from '../common/CommonApi';
import Toolbar from '../component/ToolBar';
import BdMapView from '../component/BdMapView';
import Setting from '../pages/Setting';

class HomePage extends Component {
    constructor(props)
    {
        super(props);

        this.state = {}
    }

    render()
    {
        const {navigator} = this.props;

        return (
            <View style={styles.container}>
                <Toolbar style={styles.toolbar}
                         title="Fleet"
                         leftOnClick={() =>
                         {
                             console.log('按了左边');
                             navigator.push({
                                 name: 'Setting',
                                 component: Setting
                             });
                         }} rightOnClick={() =>
                {
                    console.log('点击右边');
                    navigator.push({
                        name: 'Setting',
                        component: Setting
                    })
                }}/>
                <BdMapView location={true} style={styles.top}/>
                <View style={styles.bottom}>

                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: statusHeight()
    },
    toolbar: {
        height: 30,
    },
    text: {
        fontSize: 20, textAlign: 'center'
    },
    top: {
        flex: 2
    },
    bottom: {
        flex: 3
    }
});

export default HomePage;