'use strict';

import React, {Component, PropTypes} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    findNodeHandle
} from 'react-native';
import {BlurView} from 'react-native-blur';
import {isAndroid} from '../common/CommonApi';

const background = 'http://iphonewallpapers-hd.com/thumbs/firework_iphone_wallpaper_5-t2.jpg';

class BlurImageView extends Component {
    state = {
        viewRef: 0
    };

    imageLoaded()
    {
        this.setState({viewRef: findNodeHandle(this.refs.backgroundImage)})
    }

    render()
    {
        if (isAndroid())
        {
            return (
                <Image
                    source={{uri: background}}
                    style={styles.container}
                    ref={'backgroundImage'}
                    onLoadEnd={this.imageLoaded.bind(this)}
                >
                    <BlurView
                        blurRadius={20}
                        overlayColor={'rgba(255, 255, 255,0.2)'}
                        style={styles.blurView}
                        viewRef={this.state.viewRef}
                    />
                </Image>
            )
        } else
        {
            return (
                <Image source={{uri: background}} style={styles.container}>
                    <BlurView blurType="light" style={styles.container}/>
                </Image>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: 'transparent',
        height: 200,
        width: 200,
    },
    blurView: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        right: 0
    },
});

export default BlurImageView;