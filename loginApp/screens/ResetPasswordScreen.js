import React,{useState, useEffect} from "react";
import {Text, View, Image, TouchableOpacity, StyleSheet, Keyboard, TextInput, Pressable} from 'react-native';
import RecordedFutureLogo from '../assets/RecordedFutureLogo.png';
import Icon from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../baseUrl';

const ResetPasswordScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [notMatching, setNotMatching] = useState(false);
    const [notFilled, setNotFilled] = useState(false);

    const reset = () => {
        if(newPassword != confirmNewPassword){
            setNotMatching(true);
        }else if(email == '' || password == '' || newPassword == '' || confirmNewPassword == ''){
            setNotFilled(true);
        }else{
            const data = new FormData();
            data.append('email', email);
            data.append('password', password);
            data.append('newPassword', newPassword);
            Axios.post(url+"/reset_password", data).then((response) => {
                if(response.data.isReset == true){
                    alert("Password Changed Succesfully Sign In");
                    navigation.navigate('SignIn');
                }else{
                    alert("This User does not exist");
                }
            })
        }
    }

    return (
        <Pressable onPress={() => {Keyboard.dismiss()}} style={styles.container}>
            <Image style={styles.logo} source={RecordedFutureLogo}/>
            <TextInput
            style={styles.inputEmail}
            placeholder="Email Adress"
            onChangeText={(e) => {setEmail(e)}}
            />

           <TextInput
            style={styles.password}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(e) => {setPassword(e)}}
            />

           <TextInput
            style={styles.newPassword}
            secureTextEntry={true}
            placeholder="New Password"
            onChangeText={(e) => {setNewPassword(e)}}
            />

            <TextInput
            style={styles.confirmNewPassword}
            secureTextEntry={true}
            placeholder="Confirm New Password"
            onChangeText={(e) => {setConfirmNewPassword(e)}}
            />

            <TouchableOpacity onPress={() => {reset()}} style={styles.signUpButton}>
                <Text style={styles.signUpButtonText}>RESET</Text>
            </TouchableOpacity>

            {notMatching ? (
                <View style={{justifyContent:'center',alignItems:'center', top:30}}>
                <Text style={{color:'red'}}>NEW PASSWORD AND</Text>
                <Text style={{color:'red'}}>CONFIRM NEW PASSWORD DOES NOT MATCH</Text>
                </View>
                
            ):null}

            {notFilled ? (
                <Text style={{color:'red',top:30}}>PEASE FILL ALL FIELDS</Text>
            ):null}

        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },

    logo:{
        width:'85%',
        height:51,
        top:30
    },

    inputEmail: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 12,
        width:'85%',
        top:50,
        borderColor:'gray',
        fontSize:16
      },

      password:{
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 12,
        width:'85%',
        top:35,
        borderColor:'gray',
        fontSize:16
      },

      newPassword:{
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 12,
        width:'85%',
        top:19.5,
        borderColor:'gray',
        fontSize:16
      },

      confirmNewPassword:{
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 12,
        width:'85%',
        top:4,
        borderColor:'gray',
        fontSize:16
      },

      signUpButton:{
          backgroundColor:'#80b8e7',
          width:130,
          height:40,
          left:110,
          justifyContent:'center',
          alignItems:'center',
          top:3,
          borderRadius:5

      },

      signUpButtonText:{
          color:'#fff',
          fontSize:15
      },



})

export default ResetPasswordScreen;