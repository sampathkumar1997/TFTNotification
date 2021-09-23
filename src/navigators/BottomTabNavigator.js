import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tab1 from '../screens/Tab1'
import Tab2 from '../screens/Tab2'
import Tab3 from '../screens/Tab3'

const Tab = createBottomTabNavigator();

const BottomTabNavigator = props => {

    const tabBarOptions = {
        activeTintColor: 'red',
        inactiveTintColor: 'black',
        style: {
            backgroundColor: 'white',
            // paddingBottom: 5,
            // paddingTop: 5,
            borderTopWidth: 1,
        },
        tabStyle: {
            color: 'black',
            marginVertical: 5,
        },
        keyboardHidesTabBar: true,
    }

    return (
        <Tab.Navigator
            backBehavior='initialRoute'
            tabBarOptions={tabBarOptions}
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

export default BottomTabNavigator;