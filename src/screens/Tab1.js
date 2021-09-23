import React, { useEffect, useState } from 'react';
import { View, Text, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-community/clipboard';


const Tab1 = ({ navigation }) => {

    const [fcmToken, setFcmToken] = useState('')
    useEffect(() => {
        getFcmToken()
    }, [])

    const copyToClipboard = () => {
        Clipboard.setString(fcmToken);
        ToastAndroid.show("Fcm Token Copied", ToastAndroid.SHORT);
    }

    const getFcmToken = async () => {
        const fcmToken = await AsyncStorage.getItem('fcmToken');
        setFcmToken(fcmToken)
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <Text >Tab 1</Text>

            <Text onPress={copyToClipboard} style={{marginTop:20}}> FCM Token: </Text>
            <Text onPress={copyToClipboard} style={{marginTop:10}}> {fcmToken} </Text>

        </View>
    )
}


export default Tab1