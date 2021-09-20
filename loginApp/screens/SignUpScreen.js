import React,{useState, useEffect} from "react";
import {Text, View, Image, TouchableOpacity, Dimensions, Pressable, StyleSheet, Keyboard, TextInput, Touchable} from 'react-native';
import RecordedFutureLogo from '../assets/RecordedFutureLogo.png';
import url from '../baseUrl';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-simple-toast';
import IonIcon from 'react-native-vector-icons/Ionicons';

_retrieveData = async (navigation) => {

    const value = await AsyncStorage.getItem('loggedIn');
    const parse = JSON.parse(value)
    console.log(parse)
    if (parse != null) {
      navigation.navigate('Home');
    }else{
        return false
    }
  
};

const SignUpScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notFilled, setNotFilled] = useState(false);

    useEffect(() => {
       
        _retrieveData(navigation);
     },[])

    const signUp = () => {
        if(email == '' || name == '' || password == ''){
            setNotFilled(true);
        }else{
        const data = new FormData();
        data.append('email', email);
        data.append('name', name);
        data.append('password', password);
        Axios.post(url+`/signup`, data).then((response) => {
            if(response.data.isExist == true){
                alert('The email already exists please try another one.');
            }else{
               navigation.navigate('SignIn');
            }
        })
        }
    }

    const goToSignIn = () => {
        navigation.navigate('SignIn');
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
            style={styles.name}
            placeholder="Name"
            onChangeText={(e) => {setName(e)}}
            />

           <TextInput
            style={styles.password}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(e) => {setPassword(e)}}
            />

            <TouchableOpacity onPress={() => signUp()} style={styles.signUpButton}>
                <Text style={styles.signUpButtonText}>SIGN UP</Text>
            </TouchableOpacity>

            <View style={{top:40, justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
                <Text style={{ fontSize:16, color:'gray'}}>Already have an account?</Text>
                <TouchableOpacity onPress={() => {goToSignIn()}}>
                <Text style={{color:'#0071cf', fontSize:16, left:10}}>SIGN IN</Text>
                </TouchableOpacity>
            </View>

            <View style={{top:70}}>
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

      name:{
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 12,
        width:'85%',
        top:35,
        borderColor:'gray',
        fontSize:16
      },

      password:{
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 12,
        width:'85%',
        top:20,
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
          top:17,
          borderRadius:5

      },

      signUpButtonText:{
          color:'#fff'
      }
})

export default SignUpScreen;