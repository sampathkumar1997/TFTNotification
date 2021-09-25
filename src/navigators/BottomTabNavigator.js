import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tab1 from '../screens/Tab1'
import Tab2 from '../screens/Tab2'
import Tab3 from '../screens/Tab3'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = props => {

    const [notificationNavigation, setNotificationNavigation] = useState('')
    useEffect(() => {
        getNotificationNavigation()
    }, [])

    const getNotificationNavigation = async () => {
        const navigation = await AsyncStorage.getItem('notificationNavigation');
        setNotificationNavigation(navigation)
    }

    const RefreshPage = () => {
        return (
            <Tab.Navigator
                backBehavior='initialRoute'
                tabBarOptions={tabBarOptions}
                initialRouteName={notificationNavigation == 'tab2' ? 'Tab 2'
                    : notificationNavigation == 'tab3' ? 'Tab 3'
                        : 'Tab 1'}
            >
                <Tab.Screen name="Tab 1" component={Tab1}
                />
                <Tab.Screen name="Tab 2" component={Tab2}
                />
                <Tab.Screen name="Tab 3" component={Tab3}
                />

            </Tab.Navigator>
        );
    }

    const tabBarOptions = {
        activeTintColor: 'red',
        inactiveTintColor: 'black',
        style: {
            backgroundColor: 'white',
        },
        tabStyle: {
            color: 'black',
            marginVertical: 5,
        },
        keyboardHidesTabBar: true,
    }
    return (

        // < RefreshPage />
        <Tab.Navigator
            backBehavior='initialRoute'
            tabBarOptions={tabBarOptions}
            initialRouteName={notificationNavigation == 'tab2' ? 'Tab 2'
                : notificationNavigation == 'tab3' ? 'Tab 3'
                    : 'Tab 1'}
        >


            <Tab.Screen name="Tab 1" component={Tab1}
            />
            <Tab.Screen name="Tab 2" component={Tab2}
            />
            <Tab.Screen name="Tab 3" component={Tab3}
            />




        </Tab.Navigator>
    )
}

export default BottomTabNavigator;