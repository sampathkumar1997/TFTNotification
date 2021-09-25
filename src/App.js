import React, { useState, useEffect } from 'react';
import LoginScreen from '../src/screens/LoginScreen'
import MainStack from '../src/navigators/MainStack'
import { NavigationContainer } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import { Alert, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification'
import BottomTabNavigator from './navigators/BottomTabNavigator';
const App = ({ navigation }) => {

  const [loggedIn, setLoggedIn] = useState(false)
  const [fcmToken, setFcmToken] = useState('')

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      //When a notification arrives when app is in foreground state
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // ToastAndroid.show(JSON.stringify(remoteMessage), ToastAndroid.SHORT);
      PushNotification.createChannel({
        channelId: "mychannel", // (required)
        channelName: "My channel", // (required)
        vibrate: true,
      }, (created) => {
        PushNotification.localNotification({
          channelId: "mychannel",
          autoCancel: true,
          bigText: remoteMessage.notification.body,
          subText: 'Notification',
          title: `${remoteMessage.notification.title}`,
          message: `${remoteMessage.notification.body}`,
          vibrate: true,
          vibration: 300,
          playSound: true,
          soundName: 'default',
          ignoreInForeground: false,
          importance: 'high',
          invokeApp: true,
          allowWhileIdle: true,
          priority: 'high',
          visibility: 'public'
        })
      })
      remoteMessage?.data?.navigation && AsyncStorage.setItem("notificationNavigation", remoteMessage.data.navigation);
      setLoggedIn(true)
    }
    );

    /////If Notification comes when app is in background state
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      setLoggedIn(true)

    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      remoteMessage?.data?.navigation && AsyncStorage.setItem("notificationNavigation", remoteMessage.data.navigation);
      setLoggedIn(true)
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
            <BottomTabNavigator to={'tab2'}  />
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
