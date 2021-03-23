import React, { useState, useEffect } from 'react';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import {decode, encode} from 'base-64';
import firebase from './src/utils/firebase';
import 'firebase/auth';
import Auth from './src/components/Auth';
import ListBirthday from './src/components/ListBirthday'

if(!global.btoa) global.btoa= encode;
if(!global.atoa) global.atoa= decode;


export default function App(){

  const [user, setUser] = useState(undefined);

  useEffect(()=>{
    firebase.auth().onAuthStateChanged((response)=>{
      setUser(response);
    });
  },[]);

  if (user === undefined) return null;

  return(
    <>
    <StatusBar barStyle ="light-content" ></StatusBar>
    <SafeAreaView style={styles.background}>
        {user ? <ListBirthday user={user}></ListBirthday> : <Auth />}
    </SafeAreaView>
    </>
  )
}



const styles = StyleSheet.create({
  background:{
    backgroundColor : '#15212b',
    height:'100%',
  }
})