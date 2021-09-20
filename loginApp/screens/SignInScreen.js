import React,{useState, useEffect} from "react";
import {Text, View, Image, TouchableOpacity, StyleSheet, Keyboard, TextInput, Pressable} from 'react-native';
import RecordedFutureLogo from '../assets/RecordedFutureLogo.png';
import Icon from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../baseUrl';
import Toast from 'react-native-simple-toast';

const SignInScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notFilled, setNotFilled] = useState(false);

    const resetPassword = () => {
        navigation.navigate('ResetPassword');
    }

    const signIn = async () => {
        if(email == '' || password == ''){
            setNotFilled(true);
        }else{
        const data = new FormData();
        data.append('email', email);
        data.append('password', password);
      await  Axios.post(url+"/signin", data).then((response) => {
            if(response.data.loggedIn == true){
                        console.log(response.data.user)
                       AsyncStorage.setItem(
                        'loggedIn',
                        JSON.stringify(response.data.user)
                      );

                navigation.navigate('Home');
            }
        });

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

            <TouchableOpacity onPress={() => {signIn()}} style={styles.signUpButton}>
                <Text style={styles.signUpButtonText}>SIGN IN</Text>
            </TouchableOpacity>

            <View style={styles.orLine}>
                <View style={styles.lineOne}></View>
                <Text style={{bottom:10}}>OR</Text>
                <View style={styles.lineTwo}></View>
            </View>

            <TouchableOpacity style={styles.signInWithGoogleButton}>
                <View style={styles.googleIconButton}>
                <Icon name="google" size={20} color="#fff"/>
                </View>
                <View style={styles.googleIconButtonPart2}>
                    <Text style={styles.signWithGoogleText}>SIGN IN WITH GOOGLE</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.SSO}>
            <MIcon style={{left:10}} name="vpn-key" size={23} color="#fff"/>
            <Text style={{color:'#fff',marginLeft:20,fontSize:15}}>USE SINGLE SIGN ON (SSO)</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {resetPassword()}} style={{top:115}}>
                <Text style={{color:'#0071cf', fontSize:16}}>Reset Password</Text>
            </TouchableOpacity>

            <View style={{top:145}}>
                <Text style={{color:'gray', fontSize:16}}>Recorded Future arms you with real-time threat</Text>
                <Text style={{color:'gray', fontSize:16}}>intelligence so you can proactively defend your</Text>
                <Text style={{color:'gray', fontSize:16}}>organization against cyber attacks.</Text>
                <View style={{flexDirection:'row'}}>
                <Text style={{color:'#0071cf', fontSize:15}}>Learn more</Text>
                <IonIcon style={{left:10}} name="ios-open-outline" size={20} color="#0071cf"/>
                </View>
            </View>

            {notFilled ? (
                Toast.show('Please fill all fields', Toast.LONG)
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

      signUpButton:{
          backgroundColor:'#80b8e7',
          width:130,
          height:40,
          left:110,
          justifyContent:'center',
          alignItems:'center',
          top:32,
          borderRadius:5

      },

      signUpButtonText:{
          color:'#fff',
          fontSize:15
      },

      orLine:{
          flexDirection:'row',
          top:65,
      },

      lineOne:{
        height:1,
        backgroundColor:'gray',
        width:170,
        right:20
      },

      lineTwo:{
        height:1,
        backgroundColor:'gray',
        width:170,
        left:20
      },

      signInWithGoogleButton:{
          flexDirection:'row',
          top:80,
          
      },

      googleIconButton:{
          width:40,
          height:40,
          backgroundColor:'#013088',
          borderTopLeftRadius:5,
          borderBottomLeftRadius:5,
          justifyContent:'center',
          alignItems:'center'
      },

      googleIconButtonPart2:{
        width:285,
        height:40,
        backgroundColor:'#0071cf',
        borderTopRightRadius:5,
        borderBottomRightRadius:5,
        justifyContent:'center',
      },

      signWithGoogleText:{
          color:'#fff',
          left:10,
          fontSize:15
      },

      SSO:{
        flexDirection:'row',
        width:320,
        height:40,
        backgroundColor:'#0071cf',
        borderRadius:5,
        alignItems:'center',
        top:100 
      }

})

export default SignInScreen;