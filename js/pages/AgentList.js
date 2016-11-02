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
    ListView
} from 'react-native';
import MyStatusBar from '../component/MyStatusBar';
import {connect} from 'react-redux';
import {connectMqtt} from '../actions/mqtt';
import HomePage from '../pages/HomePage';

class AgentList extends Component {
    constructor(props)
    {
        super(props);

        var agents = this.props.agents;
        console.log(JSON.stringify(agents));

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(agents)
        }
    }

    render()
    {
        return (
            <View style={styles.container}>
                <MyStatusBar/>
                <ListView
                    dataSource={this.state.dataSource}
                    renderHeader={() => this._renderHeader()}
                    renderRow={(rowData) => this._renderRow(rowData)}/>

            </View>
        )
    }

    _renderHeader()
    {
        return (
            <View>
                <Text style={styles.headText}>请选择一个Agnet用于连接</Text>
            </View>
        )
    }

    _handleAgent(rowData)
    {
        console.log(JSON.stringify(rowData));

        const {dispatch, navigator} = this.props;

        var agentId = rowData.id;
        var agentToken = rowData.token;

        console.log('agentId-->' + agentId + ",agentToken-->" + agentToken);

        connectMqtt(agentId, agentToken, navigator, dispatch).then(function (value)
        {
            console.log(value);

            navigator.resetTo({
                name: 'HomePage',
                component: HomePage,
                enableSwipeBack: false
            });
        }, function (value)
        {
            console.log(value)
        });
    }

    _renderRow(rowData)
    {
        return (
            <TouchableOpacity onPress={() => this._handleAgent(rowData)}>
                <View style={styles.itemView}>
                    <Text style={styles.itemText}>{rowData.id}</Text>
                    <Text style={styles.itemText}>{rowData.connected ? "已连接" : "未连接"}</Text>
                </View>
            </TouchableOpacity>
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
        backgroundColor: 'white'
    },
    itemText: {
        fontSize: 20,
        fontFamily: 'FZQingKeBenYueSongS-R-GB',
        color: 'white',
        textAlign: 'center'
    },
    itemView: {
        backgroundColor: '#373447',
        paddingLeft: 30,
        margin: 10,
        borderRadius: 10,
        paddingRight: 30,
        padding: 10,
    },
    headText: {
        fontSize: 20,
        fontFamily: 'FZQingKeBenYueSongS-R-GB',
        textAlign: 'center'
    }
});

//容器组件使用 connect() 方法连接 Redux
function mapStateToProps(state)
{
    const {mqtt} = state;
    return {
        mqtt
    }
}

export default connect(mapStateToProps)(AgentList);