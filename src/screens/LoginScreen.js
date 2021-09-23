import React, { Component, useState, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, } from 'react-native';
import MainStack from '../navigators/MainStack'

const Login = (props, navigation) => {

    const [login, setLogin] = useState(false)

    const handleLogin = async () => {
        setLogin(true)
    }

    return (
        <>
            {login ?
                <MainStack />
                :
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                    <TouchableOpacity
                        style={{
                            alignSelf: 'center', marginBottom: 20, padding: 15, width: '80%', backgroundColor: 'red', borderRadius: 10,
                            alignItems: 'center', justifyContent: 'center'
                        }}
                        onPress={handleLogin}
                    >
                        <Text>Next </Text>
                    </TouchableOpacity>
                </View>
            }

        </>

    )
}

const styles = StyleSheet.create({
})

export default Login