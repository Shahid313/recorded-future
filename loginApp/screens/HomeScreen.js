import React from "react";
import {Text, Pressable, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {

    const logout = () => {
        AsyncStorage.removeItem('loggedIn');
        navigation.navigate("SignUp");
    }

    return (
        <Pressable style={styles.container}>
            <TouchableOpacity onPress={() => {logout()}} style={styles.logoutButton}>
                <Text style={{color:'#fff'}}>Logout</Text>
            </TouchableOpacity>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },

    logoutButton:{
        backgroundColor:'#013088',
        width:60,
        height:40,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center'
    }

})

export default HomeScreen;