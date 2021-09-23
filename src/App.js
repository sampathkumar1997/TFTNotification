import React, { useState, useEffect } from 'react';
import LoginScreen from '../src/screens/LoginScreen'
import MainStack from '../src/navigators/MainStack'
import { NavigationContainer } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {

  const [loggedIn, setLoggedIn] = useState('')
  const [fcmToken, setFcmToken]= useState('')

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      //When a notification arrives when app is in foreground state
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage.notification.body));
    }
    );

    /////If Notification comes when app is in background state
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
    requestUserPermission()
    return () => {
      unsubscribe();
    }
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken() //<---- Add this
      console.log('Authorization status:', authStatus);
    }
  }

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log("Your Firebase Token is:", fcmToken);
      await AsyncStorage.setItem("fcmToken", fcmToken);
      setFcmToken(fcmToken)
    } else {
      console.log("Failed", "No token received");
    }
  }

  const ChildPage = () => {
    return (
      <>
        {
          loggedIn ?
            <MainStack />
            :
            <LoginScreen />
        }

      </>
    )
  }

  return (
    <NavigationContainer>
      <ChildPage />
    </NavigationContainer >
  );
}

export default App;
