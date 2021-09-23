import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

class MainStack extends Component {
    state = {}
    render() {
        return (
            <Stack.Navigator screenOptions={{ animationEnabled: false, headerShown: false }}>
                <Stack.Screen name="Home" component={BottomTabNavigator} />  
            </Stack.Navigator>
        );
    }
}

export default MainStack;