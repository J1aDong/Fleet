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
    BackAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {login} from '../actions/login';

class LoginPage extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            username: '',
            password: ''
        };
    }

    _login()
    {
        const {dispatch, navigator} = this.props;

        dispatch(login(this.state.username, this.state.password, navigator));
    }

    render()
    {

        const {login} = this.props;
        if (login.loading)
        {
            console.log("page-->正在加载");
        }
        if (login.text)
        {
            console.log("page-->" + login.text);
        }

        return (
            <View style={styles.container}>
                <View style={styles.icon}>
                    <Icon name="md-person" color="#373447" size={70}/>
                </View>
                <Text style={{color: 'white', marginTop: 20}}>Fleet</Text>
                <View style={{
                    backgroundColor: '#312E3F', width: 300, flexDirection: 'row', alignItems: 'center',
                    paddingLeft: 10, marginTop: 60
                }}>
                    <Icon name="ios-happy" color="white" size={30}/>
                    <TextInput
                        underlineColorAndroid='transparent'
                        placeholder='请输入用户名'
                        placeholderTextColor="white"
                        style={{height: 40, flex: 1, marginLeft: 20, color: 'white'}}
                        onChangeText={(text) => this.setState({username: text})}
                        value={this.state.username}
                    />
                </View>

                <View style={{
                    backgroundColor: '#312E3F', width: 300, flexDirection: 'row', alignItems: 'center',
                    paddingLeft: 10, marginTop: 10
                }}>
                    <Icon name="md-key" color="white" size={30}/>
                    <TextInput
                        underlineColorAndroid='transparent'
                        placeholder='请输入密码'
                        placeholderTextColor="white"
                        secureTextEntry={true}
                        style={{height: 40, flex: 1, marginLeft: 20, color: 'white'}}
                        onChangeText={(text) => this.setState({password: text})}
                        value={this.state.password}
                    />
                </View>

                <TouchableOpacity onPress={() => this._login()}>
                    <View style={{
                        backgroundColor: '#211F27', width: 300, flexDirection: 'row', alignItems: 'center',
                        paddingLeft: 10, marginTop: 10, height: 50, justifyContent: 'center', borderRadius: 5
                    }}>
                        <Text style={{color: 'white'}}>Log In</Text>
                    </View>
                </TouchableOpacity>
            </View>
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
        backgroundColor: '#373447'
    },
    icon: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        borderRadius: 100
    }
});

//容器组件使用 connect() 方法连接 Redux
function mapStateToProps(state)
{
    const {login} = state;
    return {
        login
    }
}

export default connect(mapStateToProps)(LoginPage);