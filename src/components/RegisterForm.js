import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput, Button, Alert} from 'react-native';
import { useState } from 'react';
import {validateEmail} from '../utils/validations';
import firebase from '../utils/firebase';

export default function RegisterForm(props){
    const {changeForm} = props;

    const [formData, setFormData] = useState(defaultValue())

    const [formError, setFormError] = useState({});

    const register = () =>{
        let errors = {};
        if (!formData.email || !formData.password || !formData.reapetPassword) {
            if(!formData.email) errors.email = true;
            if(!formData.password) errors.password = true;
            if(!formData.reapetPassword) errors.reapetPassword = true;
            Alert.alert('OOPS!','Todos los campos son obligatorios', [{text:'Entendido'}]);
        }else if(!validateEmail(formData.email)){
            errors.email = true;
            Alert.alert('MAIL INVALIDO!','Debe agregar un correo valido', [{text:'Entendido'}]);
        }else if(formData.password !== formData.reapetPassword){
            errors.password = true;
            errors.reapetPassword = true;
            Alert.alert('PASSWORD INCORRECTA!','Las contraseñas no coinciden', [{text:'Entendido'}]);
        }else if(formData.password.length < 6){
            errors.password = true;
            errors.reapetPassword = true;
            Alert.alert('PASSWORD MUY CORTA','La contraseña debe tener almenos 6 caracteres', [{text:'Entendido'}]);
        }else{
            firebase
            .auth().createUserWithEmailAndPassword(formData.email, formData.password)
            .then(()=>{
                console.log('Usuario creado')
            }).catch(()=>{
                setFormError({
                    email: true,
                    password: true,
                    reapetPassword: true
                })
            });
        }

        setFormError(errors);
    }
    return(
        
        <>
        <TextInput 
            placeholder="Correo Electronio"
            placeholderTextColor="#969696"
            style ={[styles.input, formError.email && styles.error]}
            onChange = {(e)=>{setFormData({...formData, email: e.nativeEvent.text})}}
        >
        </TextInput>

        <TextInput 
            placeholder="Contraseña"
            placeholderTextColor="#969696"
            style ={[styles.input, formError.password && styles.error]}
            secureTextEntry={true}
            onChange = {(e)=>{setFormData({...formData, password: e.nativeEvent.text})}}
        >
        </TextInput>

        <TextInput 
            placeholder="Repetir Contraseña"
            placeholderTextColor="#969696"
            style ={[styles.input, formError.reapetPassword && styles.error]}
            secureTextEntry={true}
            onChange = {(e)=>{setFormData({...formData, reapetPassword: e.nativeEvent.text})}}
        >
        </TextInput>

        <TouchableOpacity onPress={register}>
            <Text style={styles.btnText} >REGISTRARSE</Text>
        </TouchableOpacity>
        <View style={styles.login}>
            <TouchableOpacity onPress={changeForm}>
                <Text style={styles.btnText} >Inicio Sesión</Text>
            </TouchableOpacity>
        </View>
      

        </>
    )
}


const styles = StyleSheet.create({
    btnText :{
        color: '#fff',
        fontSize: 20,
    },
    input:{
        height:50,
        color:'#fff',
        width:'80%',
        marginBottom:25,
        backgroundColor: '#1e3040',
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#133040',
    },
    login:{
        flex: 1,
        justifyContent:'flex-end',
        marginBottom: 20,
    },
    error:{
        borderColor:'#940c0c'
    }
});

function defaultValue() {
    return{
            email:'',
            password:'',
            reapetPassword:''
        }
}