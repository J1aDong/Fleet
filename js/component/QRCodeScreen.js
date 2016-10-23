'use strict';

import React, {Component} from 'react'

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Vibration,
    StatusBar
} from 'react-native'

import Camera from 'react-native-camera';

var QRCodeScreen = React.createClass({

    propTypes: {
        cancelButtonVisible: React.PropTypes.bool,
        cancelButtonTitle: React.PropTypes.string,
        onSuccess: React.PropTypes.func,
        onCancel: React.PropTypes.func,
    },

    getDefaultProps: function ()
    {
        return {
            cancelButtonVisible: false,
            cancelButtonTitle: 'Cancel',
        };
    },

    _onPressCancel: function ()
    {
        var that = this;
        requestAnimationFrame(function ()
        {
            that.props.navigator.pop();
            if (that.props.onCancel)
            {
                that.props.onCancel();
            }
        });
    },

    _onBarCodeRead: function (result)
    {
        var that = this;

        if (this.barCodeFlag)
        {
            this.barCodeFlag = false;

            setTimeout(function ()
            {
                Vibration.vibrate();
                that.props.navigator.pop();
                that.props.onSuccess(result.data);
            }, 1000);
        }
    },

    render: function ()
    {
        var cancelButton = null;
        this.barCodeFlag = true;

        if (this.props.cancelButtonVisible)
        {
            cancelButton = <CancelButton onPress={this._onPressCancel} title={this.props.cancelButtonTitle}/>;
        }

        return (
            <Camera onBarCodeRead={this._onBarCodeRead} style={styles.camera}>
                <StatusBar
                    barStyle="light-content"/>
                <View style={styles.rectangleContainer}>
                    <View style={styles.rectangle}/>
                </View>
                {cancelButton}
            </Camera>
        );
    },
});

var CancelButton = React.createClass({
    render: function ()
    {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    },
});

var styles = StyleSheet.create({

    camera: {
        flex: 1,
        alignItems: 'center',
    },

    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },

    rectangle: {
        height: 200,
        width: 250,
        borderWidth: 2,
        borderColor: '#00FF00',
        backgroundColor: 'transparent',
    },

    cancelButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 15,
        width: 100,
        bottom: 10,
        marginTop:50
    },
    cancelButtonText: {
        fontSize: 17,
        fontWeight: '500',
        color: '#0097CE',
    },
});

module.exports = QRCodeScreen;