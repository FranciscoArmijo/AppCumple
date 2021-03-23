import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, Image } from 'react-native';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';


export default function Auth(){
    const [isLoguin, setIsLoguin] = useState(true);
    const changeForm=()=>{
        setIsLoguin(!isLoguin);
    }
    return(
        <View style={styles.view}>
            <Image style={styles.logo} source={require("../images/logo.png")} />
            { isLoguin ? <LoginForm changeForm={changeForm}/> : <RegisterForm changeForm={changeForm}/>}
        </View>
    );
};

const styles = StyleSheet.create({
    view:{
        flex: 1,
        alignItems: 'center',
    },
    logo:{
        width:"80%",
        height : 200,
        marginTop :50,
        marginBottom : 50
    },
});