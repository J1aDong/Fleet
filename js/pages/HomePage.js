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
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

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
                    <ActionButton buttonColor="rgba(231,76,60,1)" hideShadow={true}>
                        <ActionButton.Item buttonColor='#9b59b6' title="New Task"
                                           onPress={() => console.log("notes tapped!")}>
                            <Icon name="md-create" style={styles.actionButtonIcon}/>
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() =>
                        {
                        }}>
                            <Icon name="md-notifications-off" style={styles.actionButtonIcon}/>
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() =>
                        {
                        }}>
                            <Icon name="md-done-all" style={styles.actionButtonIcon}/>
                        </ActionButton.Item>
                    </ActionButton>
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
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});

export default HomePage;